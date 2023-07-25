import {
  Card,
  Group,
  Image,
  Text,
  Title,
  Badge,
  Divider,
  Button,
  ActionIcon,
  Grid,
  Flex,
  MantineTheme,
  Tooltip,
  Highlight,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useToggle } from '@mantine/hooks';
import {
  IconAwardFilled,
  IconBookmark,
  IconBookmarkFilled,
  IconCheck,
  IconExclamationMark,
  IconHeart,
  IconHeartFilled,
} from '@tabler/icons-react';
import { useEffect, type MouseEvent, type MouseEventHandler } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { useStyles } from './styles';
import { inconsolata, plusJakartaSans } from 'public/fonts/fonts';
import type { CardSite, Classes } from 'src/type';

type CardImageProps = {
  src: string;
  title: string;
};

type TagsProps = {
  classes: Classes;
  cx: (...args: any) => string;
  tags: string[];
};

type ButtonGroupProps = {
  theme: MantineTheme;
  classes: Classes;
  handleVisitButton: MouseEventHandler<HTMLButtonElement>;
  handleHeartButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleBookmarkButtonClick: MouseEventHandler<HTMLButtonElement>;
  isHeartButtonToggled: boolean;
  isBookmarkButtonToggled: boolean;
};
type HeartButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
} & Pick<ButtonGroupProps, 'theme' | 'classes' | 'isHeartButtonToggled'>;
type BookmarkButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
} & Pick<ButtonGroupProps, 'theme' | 'classes' | 'isBookmarkButtonToggled'>;

export default function CardSite({
  id,
  image,
  url,
  title,
  description,
  tags,
  editors_choice,
  query,
}: CardSite & { query: string }) {
  const { classes, cx, theme } = useStyles();
  const supabase = useSupabaseClient();
  const user = useUser();

  const linkProps = {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  const [isHeartButtonToggled, toggleHeartButton] = useToggle([false, true]);
  const [isBookmarkButtonToggled, toggleBookmarkButton] = useToggle([
    false,
    true,
  ]);

  //Check if the current card has been favorited or bookmarked (in database) then toggle its buttons
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const { data: favorites } = await supabase
          .from('favorites')
          .select('site_id')
          .eq('user_id', user!.id);
        const { data: bookmarks } = await supabase
          .from('bookmarks')
          .select('site_id')
          .eq('user_id', user!.id);

        const isFavorited = favorites?.some(
          (favorite) => favorite.site_id === id
        );
        const isBookmarked = bookmarks?.some(
          (bookmark) => bookmark.site_id === id
        );

        toggleHeartButton(isFavorited);
        toggleBookmarkButton(isBookmarked);
      };
      fetchData();
    }
  }, [id, supabase, toggleHeartButton, toggleBookmarkButton, user]);

  function handleVisitButton() {
    window.open(url, '_blank');
  }

  async function handleHeartButtonClick(event: MouseEvent) {
    event.preventDefault();

    if (user) {
      try {
        if (isHeartButtonToggled) {
          const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('site_id', id);
          console.log(error);

          toggleHeartButton();
          notifications.show({
            message: `Removed ${title} from Favorites`,
            color: 'red',
            icon: <IconCheck />,
          });
        } else {
          await supabase
            .from('favorites')
            .insert({ user_id: user.id, site_id: id });

          toggleHeartButton();
          notifications.show({
            message: `Added ${title} to Favorites`,
            color: 'green',
            icon: <IconCheck />,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      notifications.show({
        message: 'This feature requires login',
        color: 'yellow',
        icon: <IconExclamationMark />,
      });
    }
  }

  async function handleBookmarkButtonClick(event: MouseEvent) {
    event.preventDefault();

    if (user) {
      try {
        if (isBookmarkButtonToggled) {
          await supabase.from('bookmarks').delete().eq('site_id', id);

          toggleBookmarkButton();
          notifications.show({
            message: `Removed ${title} from Bookmarks`,
            color: 'red',
            icon: <IconCheck />,
          });
        } else {
          await supabase
            .from('bookmarks')
            .insert({ user_id: user.id, site_id: id });

          toggleBookmarkButton();
          notifications.show({
            message: `Added ${title} to Bookmarks`,
            color: 'green',
            icon: <IconCheck />,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      notifications.show({
        message: 'This feature requires login',
        color: 'yellow',
        icon: <IconExclamationMark />,
      });
    }
  }

  return (
    <>
      <Card
        // withBorder
        pt={0}
        className={classes.card}
        aria-label="card"
        {...linkProps}>
        <CardImage
          src={image}
          title={title}
        />

        <Group
          position="apart"
          align="start"
          noWrap>
          <Tooltip.Floating label={url}>
            <Title
              className={cx(classes.title, inconsolata.className)}
              lineClamp={2}>
              {title}
            </Title>
          </Tooltip.Floating>

          {editors_choice && (
            <Tooltip.Floating label="This site is recommended by editor">
              <IconAwardFilled
                size={32}
                style={{ color: theme.colors.yellow[3], marginTop: '1rem' }}
              />
            </Tooltip.Floating>
          )}
        </Group>

        <Text
          fz="sm"
          color="dimmed"
          lineClamp={4}
          className={plusJakartaSans.className}>
          <Highlight
            highlight={query}
            highlightColor="red"
            highlightStyles={() => ({
              padding: 2,
              borderRadius: 2,
            })}>
            {description}
          </Highlight>
        </Text>

        <Tags
          classes={classes}
          cx={cx}
          tags={tags}
        />

        <Divider my="sm" />

        <ButtonGroup
          theme={theme}
          classes={classes}
          handleVisitButton={handleVisitButton}
          isHeartButtonToggled={isHeartButtonToggled}
          handleHeartButtonClick={handleHeartButtonClick}
          isBookmarkButtonToggled={isBookmarkButtonToggled}
          handleBookmarkButtonClick={handleBookmarkButtonClick}
        />
      </Card>
    </>
  );
}

function CardImage({ src, title }: CardImageProps) {
  return (
    <Card.Section>
      <Image
        src={src}
        alt={title}
        height={250}
        fit="cover"
        withPlaceholder
        placeholder={
          <Image
            src="../assets/images/404.png"
            alt="placeholder"
            width={350}
          />
        }
        imageProps={{ loading: 'lazy' }}
      />
    </Card.Section>
  );
}

function Tags({ classes, cx, tags }: TagsProps) {
  return (
    <Group
      spacing="xs"
      className={classes.tagsWrapper}>
      {tags?.map((tag) => {
        return (
          <Badge
            key={tag}
            size="md"
            aria-label="tag"
            className={cx(classes.tags, inconsolata.className)}>
            #{tag}
          </Badge>
        );
      })}
    </Group>
  );
}

function ButtonGroup({
  theme,
  classes,
  handleVisitButton,
  handleHeartButtonClick,
  handleBookmarkButtonClick,
  isHeartButtonToggled,
  isBookmarkButtonToggled,
}: ButtonGroupProps) {
  return (
    <Grid
      grow
      justify="center"
      align="center"
      style={{ flexWrap: 'nowrap' }}>
      <Grid.Col span={9}>
        <Button
          fullWidth
          onClick={handleVisitButton}>
          Visit
        </Button>
      </Grid.Col>

      <Grid.Col span="auto">
        <Flex gap="sm">
          <HeartButton
            theme={theme}
            classes={classes}
            onClick={handleHeartButtonClick}
            isHeartButtonToggled={isHeartButtonToggled}
          />
          <BookmarkButton
            theme={theme}
            classes={classes}
            onClick={handleBookmarkButtonClick}
            isBookmarkButtonToggled={isBookmarkButtonToggled}
          />
        </Flex>
      </Grid.Col>
    </Grid>
  );
}

function HeartButton({
  theme,
  classes,
  onClick,
  isHeartButtonToggled,
}: HeartButtonProps) {
  return (
    <ActionIcon
      size="lg"
      name="heart"
      variant="transparent"
      onClick={onClick}
      aria-label="favorite"
      className={classes.heartIcon}>
      {isHeartButtonToggled ? (
        <IconHeartFilled
          size="1.625rem"
          style={{ color: theme.colors.pink[5] }}
        />
      ) : (
        <IconHeart
          size="1.625rem"
          color={theme.colors.pink[5]}
        />
      )}
    </ActionIcon>
  );
}

function BookmarkButton({
  theme,
  classes,
  onClick,
  isBookmarkButtonToggled,
}: BookmarkButtonProps) {
  {
    return (
      <ActionIcon
        size="lg"
        name="bookmark"
        variant="transparent"
        onClick={onClick}
        aria-label="bookmark"
        className={classes.bookmarkIcon}>
        {isBookmarkButtonToggled ? (
          <IconBookmarkFilled
            size="1.625rem"
            style={{ color: theme.colors.yellow[5] }}
          />
        ) : (
          <IconBookmark
            size="1.625rem"
            color={theme.colors.yellow[5]}
          />
        )}
      </ActionIcon>
    );
  }
}
