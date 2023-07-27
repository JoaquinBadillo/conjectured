import { getDB } from '@lib/database';
import { Response, PostData } from './types';

const { db } = getDB();

export async function fetchPostData(slug: string) {
    const res: Response<PostData> = {data: null, error: null};
    
    try {
        const result = await db.one(
            'SELECT title, post_date, content FROM posts WHERE slug = $1',
            [slug]
        );

        res.data = result;
    }

    catch(err: any) {
        res.error = err?.message ?? 'Unknown error';
    }

    return res;
}