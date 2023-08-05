import { Feed, LoadingFeed } from "@components/index"
import { Suspense } from "react"
import { getPosts } from "@/lib/fetch_content"

export default async function Home() {
  const posts = await getPosts()
  .then((res) => {
      return res.ok ?? []
  })

  return (
    <Suspense fallback={ <LoadingFeed /> }>
      <Feed posts={posts}/>
    </Suspense>
  )
}
