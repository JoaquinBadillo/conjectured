import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'

import { Result } from './types';
import { getStorage } from './utils';

const { storageClient } = getStorage();

async function fetchMarkdown(file: string) {
    const res: Result<string, string> = {};

    const { data, error } = await storageClient.from('posts').download(`${file}.md`);
    
    if (data != undefined) {
        res.ok = await data.text();
    }

    else {
        res.err = {message: error?.message ?? 'Failed to get post contents'};
    }

    return res;
}

export async function markdownToHtml(file: string) {
    const res: Result<string, string> = {};
    
    const fetchData = await fetchMarkdown(file);

    if (fetchData.ok != undefined) {
        res.ok = (await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(fetchData.ok)).toString();
    }

    else {
        res.err = {message: res.err?.message ?? 'Failed to parse markdown'};
    }

    return res;
}