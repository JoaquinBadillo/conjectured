import { Feed } from '@/components/feed';
import { getPosts } from '@/lib/fetch_content';

export default async function Home() {
    const posts = await getPosts()
    .then((res) => {
      return res.ok ?? []
    })

  return (
      <Feed posts={posts} title="Blog Posts"/>
  )
}