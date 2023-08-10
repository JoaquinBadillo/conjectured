import FilteredPosts from "@/views/filtered"
import { LoadingFeed } from "@/components"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback={ <LoadingFeed /> }>
      <FilteredPosts tagname="Project" />
    </Suspense>
  )
}
