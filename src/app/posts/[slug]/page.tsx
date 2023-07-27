import { fetchPostData } from "@/lib/fetch_content"; 
import { markdownToHtml } from "@/lib/markdown_utils";
import { PostData } from "@/lib/types";

interface BlogPostProps {
    params: {
        slug: string;
    }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const fetch_results = await fetchPostData(params.slug);
  
  if (fetch_results.error !== null || fetch_results.data === null) {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Error</h1>
        <p className="text-lg">An error occurred while fetching the post.</p>
      </div>
    )
  }

  const { title, post_date, content } = fetch_results.data;
  const { data, error } = await markdownToHtml(content);
  
  if (error !== null) {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Error</h1>
        <p className="text-lg">An error occurred while fetching the post.</p>
      </div>
    )
  }

  return (
      <>
        <header className="container mx-auto py-4">
          <h1 className="text-3xl font-bold">{ title }</h1>
          <p className="text-lg">
            { `${post_date.getDate()}/${post_date.getMonth()}/${post_date.getFullYear()}` }
          </p>
          <hr/>
        </header>

        <div dangerouslySetInnerHTML={{ __html: data as string }} />
      </>
    );
}