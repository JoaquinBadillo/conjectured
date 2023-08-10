import { Card, LoadingCard, ErrorCard } from '../card';
import { PostProps } from "@/lib/types"

export function Feed({ posts, title }: { posts: PostProps[], title: string }) {
    
    return (
        <section className='py-16 min-h-[75vh]'>
            <h2 className="text-4xl font-bold text-center dark:text-gray-50">{ title }</h2>
            <div className="feed">
                { posts ? posts.map((post: PostProps) => (
                    <Card 
                        key={post.title}
                        title={post.title}
                        post_date={post.post_date}
                        description={post.description}
                        tags={post.tags}
                        slug={post.slug} 
                        image={post.image}
                    />
                )): <ErrorCard />}
            </div>
        </section>
    )
}

export const LoadingFeed = () => {
    const arr = [0, 1, 2];

    return (
        <section className='py-16 min-h-[75vh]'>
            <h2 className="text-4xl font-bold text-center dark:text-gray-50">Loading...</h2>
            <div className="feed">
                { arr.map((_, i) => (
                    <LoadingCard key={i} />
                ))}
            </div>
        </section>
    )
}