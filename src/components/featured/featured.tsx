import { Card } from '../card/card';
import { PostProps, PostLayoutProps } from '../types';


export const Featured = (props: PostLayoutProps) => {
    return (
        <section className='py-16'>
            <h2 className="text-4xl font-bold text-center dark:text-gray-50">Latest Posts</h2>
            <div className="featured-content">
                { props.posts.map((post: PostProps) => (
                    <Card 
                        key={post.title}
                        title={post.title}
                        post_date={post.post_date}
                        description={post.description} 
                        slug={post.slug} 
                        image={post.image}/>
                ))}
            </div>
        </section>
    )
}