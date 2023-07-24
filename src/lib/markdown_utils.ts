import { StorageClient } from '@supabase/storage-js';
import { remark } from 'remark';
import html from 'remark-html';
import { Response } from './types';

interface BlogPostContent {
    title: string;
    date: string;
}

async function fetchMarkdown(file: string) {
    const res: Response<string> = {data: null, error: null};
    
    const storageClient = new StorageClient(process.env.STORAGE_URL as string, {
        apikey: process.env.SERVICE_KEY as string,
        Authorization: `Bearer ${process.env.SERVICE_KEY}`,
      })

    const { data, error } = await storageClient.from('posts').download(`${file}.md`);
    
    if (error) {
      res.error = error.message;
    }

    else {
        res.data = await data?.text();
    }

    return res;
}

export async function markdownToHtml(file: string) {
    const res: Response<string> = {data: null, error: null};
    
    const { data, error } = await fetchMarkdown(file);

    if (error !== null) {
        res.error = error;
    }

    else if (data !== null) {
        res.data = (await remark().use(html).process(data)).toString();
    }

    return res;
}