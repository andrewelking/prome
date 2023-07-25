import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Flex,
  Title,
  Avatar,
} from '@mantine/core';
import supabase from '../../lib/supabaseClient';
import type { Provider } from '@supabase/supabase-js';

async function signInWithProvider(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });
}

export default function AuthenticationForm() {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  return (
    <Flex
      h="100vh"
      gap="xs"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap">
      <Paper
        radius="sm"
        p="xl"
        withBorder>
        <Title order={1}>Welcome to Prome, {type} with</Title>

        <Group
          grow
          mb="md"
          mt="md">
          <Button
            onClick={() => signInWithProvider('google')}
            variant="default"
            leftIcon={
              <Avatar
                src="./assets/icons/google.png"
                size="sm"
              />
            }>
            Google
          </Button>
          <Button
            onClick={() => signInWithProvider('facebook')}
            variant="default"
            leftIcon={
              <Avatar
                src="./assets/icons/facebook.png"
                size="sm"
              />
            }>
            Facebook
          </Button>
          <Button
            onClick={() => signInWithProvider('github')}
            variant="default"
            leftIcon={
              <Avatar
                src="./assets/icons/github.png"
                size="sm"
              />
            }>
            GitHub
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group
            position="apart"
            mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              type="submit"
              radius="sm">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}
