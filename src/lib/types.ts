export type Result<T, E> = {
    ok?: T
    err?: Err<E>;
}

interface Err<E> {
    message: E;
}

export interface PostData {
    title: string;
    post_date: Date;
    content: string;
}

export interface Post {
    title: string;
    post_date: Date;
    description: string;
    image: string;
    content: string;
    slug: string;
}

export interface PostProps {
    title: string;
    post_date: Date;
    description: string;
    image: string;
    tags: string[];
    slug: string;
}

export interface TagProps {
    tagname: string;
}

export interface PostLayoutProps {
    posts: PostProps[];
}