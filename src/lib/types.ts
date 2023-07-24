export interface Response<T> {
    data: T | null;
    error: string | null;
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