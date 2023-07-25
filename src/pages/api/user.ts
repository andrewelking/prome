import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createPagesServerClient({ req, res });
  const { data, error } = await supabaseServerClient.auth.getUser();  
  if (error) {
    return res.status(401).json(error);
  } else {
    return res.status(200).json(data);
  }
}
