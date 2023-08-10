import React from "react";

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
    tags?: string[];
    slug: string;
}

export interface TagProps {
    tagname: string;
    count?: number;
    className?: string;
}

export interface TagFeedProps {
    tags: TagProps[];
}

export interface PostLayoutProps {
    posts: PostProps[];
}

export interface ButtonProps {
    icon: React.ReactNode;
    text: string;
    label: string;
    href: string;
}