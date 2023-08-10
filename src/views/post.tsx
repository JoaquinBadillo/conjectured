import { fetchPostData } from "@/lib/fetch_content"; 
import { markdownToHtml } from "@/lib/markdown_utils";

export function LoadingPost() {
    return (
        <div>
          <header className="container py-4 min-w-9/12 text-4xl">
            Loading ...
          </header>
          <hr />
        </div>
      );
}

export default async function BlogPost({ slug }: { slug: string }) {
    const fetch_results = await fetchPostData(slug);
  
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

          <section dangerouslySetInnerHTML={{ __html: parsed.ok }} />
        </div>
      );
  }

  else {
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-3xl font-bold dark:text-white">Error</h1>
        <p className="text-lg dark:text-white">Impossible! Perhaps the archives are incomplete.</p>
        <p className="text-lg text-red-700 dark:text-red-500 font-bold">
          { parsed.err?.message ?? "An error occurred while getting the post."}
        </p>
      </div>
    )
  }
}