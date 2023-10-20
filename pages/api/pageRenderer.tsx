import { getAllArticles } from 'utils/notion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const posts = await getAllArticles(process.env.BLOG_DATABASE_ID);
    res.status(200).json(posts);
  }