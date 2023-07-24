export default function BlogPostLayout({children, }: {children: React.ReactNode}) {
    return (
        <article className="mx-auto prose dark:prose-dark w-3/5 min-w-[400px] max-w-full px-4 dark:text-gray-50">
            {children}
        </article>
    )
  }