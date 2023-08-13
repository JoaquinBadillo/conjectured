import "./post.css"

export default function BlogPostLayout({children, }: {children: React.ReactNode}) {
    return (
        <article className="py-8 mx-auto my-4 prose dark:prose-dark min-w-[300px] w-[3/5] md:max-w-[90%] max-w-[100%] px-4 dark:text-gray-50 min-h-[75vh]">
            {children}
        </article>
    )
  }
