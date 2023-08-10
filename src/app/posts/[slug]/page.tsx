import BlogPost, { LoadingPost } from "@/views/post";
import { Suspense } from "react";

interface BlogPostProps {
    params: {
        slug: string;
    }
}

export const revalidate = 3600;

export default function Page({ params }: BlogPostProps) {
  return (
    <Suspense fallback={ <LoadingPost /> }>
      <BlogPost slug={params.slug}/>
    </Suspense>
  )
}