import { getDB } from '@lib/utils';
import { Result, PostData, PostProps } from './types';

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