import { getDB } from '@lib/utils';
import { Result, PostData, PostProps, TagProps } from './types';
import { time } from 'console';

const { db } = getDB();

export async function fetchPostData(slug: string) {
    const res: Result<PostData, string> = {};
    
    try {
        const result: PostData = await db.one(
            'SELECT title, post_date, content FROM posts WHERE slug = $1',
            [slug]
        );

        res.ok = result;
    }

    catch(err: any) {
        res.err = err?.message ?? 'Could not get post data';
    }

    return res;
}

export async function getPosts() {
    const res: Result<PostProps[], string> = {};

    try {
        const result: PostProps[] = await db.any(
            `SELECT title, post_date, description, image, slug, array_agg(tagname) AS tags
             FROM posts
             LEFT JOIN post_tag ON posts.id = post_tag.post_id
             LEFT JOIN tags ON post_tag.tag_id = tags.id
             GROUP BY title, post_date, description, image, slug`
        );

        res.ok = result;
    }

    catch(err: any) {
        res.err = err?.message ?? 'Could not get latest posts';
    }

    return res
}

export async function getTaggedPosts(tag: string) {
    const res: Result<PostProps[], string> = {};

    try {
        const result: PostProps[] = await db.any(
            `SELECT title, post_date, description, image, slug
             FROM posts
             LEFT JOIN post_tag ON posts.id = post_tag.post_id
             LEFT JOIN tags ON post_tag.tag_id = tags.id
             WHERE tagname = $1`,
            [tag]
        );

        res.ok = result;
    }

    catch(err: any) {
        res.err = err?.message ?? 'Could not get tagged posts';
    }

    return res;
}

export async function getTags() {
    const res: Result<TagProps[], string> = {};

    try {
        const result: TagProps[] = await db.any(
            `SELECT tagname, COUNT(*) AS count 
             FROM post_tag
             INNER JOIN tags ON post_tag.tag_id = tags.id
             WHERE tagname != 'Project'
             GROUP BY tagname`
        );

        res.ok = result;
    }

    catch (err: any) {
        res.err = err?.message ?? 'Could not get tags';
    }

    return res;
}