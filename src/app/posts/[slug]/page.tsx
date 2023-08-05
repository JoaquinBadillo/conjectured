import { fetchPostData } from "@/lib/fetch_content"; 
import { markdownToHtml } from "@/lib/markdown_utils";

interface BlogPostProps {
    params: {
        slug: string;
    }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const fetch_results = await fetchPostData(params.slug);
  
  if (fetch_results.err != undefined || fetch_results.ok == undefined) {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Error</h1>
        <p className="text-lg">Oops! An error occurred while getting the resource.</p>
      </div>
    )
  }

  const { title, post_date, content } = fetch_results.ok;
  const parsed = await markdownToHtml(content);

  if (parsed.ok != undefined) {
    return (
        <div>
          <header className="container py-4">
            <h1 className="text-3xl font-bold">{ title }</h1>
            <p className="text-lg">
              { `${post_date.getDate()}/${post_date.getMonth() + 1}/${post_date.getFullYear()}` }
            </p>
            <hr/>
          </header>

          <div dangerouslySetInnerHTML={{ __html: parsed.ok }} />
        </div>
      );
  }

  else {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Error</h1>
        <p className="text-lg">Impossible! Perhaps the archives are incomplete.</p>
        <p className="text-lg text-red-700 dark:text-red-500 font-bold">
          { parsed.err?.message ?? "An error occurred while getting the post."}
        </p>
      </div>
    )
  }
}