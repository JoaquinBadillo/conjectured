import { Feed, LoadingFeed } from "@components/index"
import { Suspense } from "react"
import { getTaggedPosts } from "@/lib/fetch_content"

export default async function Home() {
  const posts = await getTaggedPosts('Project')
  .then((res) => {
      return res.ok ?? []
  })

  return (
    <Suspense fallback={ <LoadingFeed /> }>
      <Feed posts={posts} title="Project Posts"/>
    </Suspense>
  )
}
