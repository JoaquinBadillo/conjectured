import { LoadingFeed } from "@components/index"
import Landing from "@/views/landing";
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback={ <LoadingFeed /> }>
      <Landing />
    </Suspense>
  )
}
