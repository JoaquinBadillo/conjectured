import { LoadingFeed } from "@components/index"
import FilteredPosts from "@/views/filtered";
import { Suspense } from "react"

interface TagViewProps {
    params: {
        tagname: string;
    }
}

export default function Home({ params }: TagViewProps) { 
    return (
      <Suspense fallback={ <LoadingFeed /> }>
        <FilteredPosts tagname={params.tagname}/>
      </Suspense>
    )
}