import Link from "next/link"
import { PostProps, PostLayoutProps } from "../types"

export function Feed(props: PostLayoutProps) {
    return (
        <section className='py-4 text-center'>
            <h2 className="text-4xl font-bold text-center dark:text-gray-50">More Posts</h2>
            <div className="flex flex-row flex-wrap w-full justify-center items-center py-8 dark:text-gray-50">
                { props.posts.map((post: PostProps) => (
                    <Link key={post.title} href={`/posts/${post.slug}`} className="m-4">
                        <article className="w-[300px] h-[120px] flex flex-row justify-around rounded-md border-2 hover:border-blue-400 dark:border-gray-600 dark:hover:border-indigo-300 transition-all duration-300 ease-linear">
                            <div>
                                <h3 className="text-xl py-1 transition-all duration-300 ease-linear">
                                    {post.title}
                                </h3>
                                <p>
                                    {post.description}
                                </p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}