export interface PostProps {
    title: string;
    post_date: Date;
    description: string;
    image: string;
    slug: string;
}

export interface PostLayoutProps {
    posts: PostProps[];
}