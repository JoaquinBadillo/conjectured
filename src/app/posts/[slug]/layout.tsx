export default function BlogPostLayout({children, }: {children: React.ReactNode}) {
    return (
        <article className="py-4 mx-auto prose dark:prose-dark min-w-[300px] w-[3/5] max-w-[90%] px-4 dark:text-gray-50 min-h-[75vh]">
            {children}
        </article>
    )
  }