import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const postsFile = path.join(process.cwd(), 'src/app/api/posts/posts.json');

export async function GET() {
  try {
    const data = await fs.readFile(postsFile, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    // If file doesn't exist, return empty array
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const post = await req.json();
  let posts = [];
  try {
    const data = await fs.readFile(postsFile, 'utf-8');
    posts = JSON.parse(data);
  } catch (err) {
    posts = [];
  }
  posts.unshift(post);
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
  return NextResponse.json({ success: true });
}
