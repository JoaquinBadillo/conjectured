import Link from 'next/link';
import { TagFeedProps, TagProps } from '@lib/types';

export function Tag(props: TagProps) {
    if (props.tagname == "Project") {
        return (
            <li className="mx-[2px]"> 
                <span className={"rounded-lg shadow-none text-gray-100 bg-blue-900 border-blue-900 border-2 " + props.className ?? ""}>
                    { props.tagname }
                </span>
            </li>
        );
    }

    return (
        <li className="mx-[2px]">
            {props.count ? <span className="relative top-0 left-[90%] w-5 h-5 text-center block rounded-full text-gray-200 dark:text-gray-400 animate-pulse bg-red-500 dark:bg-red-800">{props.count}</span> : <></>}
            <span className={"rounded-lg shadow-none text-gray-50 bg-gray-600 border-gray-600 dark:text-gray-800 dark:bg-gray-400 dark:border-gray-400 border-2 " + props.className ?? ""}>
                { props.tagname }
            </span>
        </li>
    );
}

export function TagList(props: {tags: string[], title: string}) {
    if (props.tags.length == 0 || props.tags[0] == null)
        return <></>;

    return (
        <ul className="flex flex-row flex-wrap text-sm gap-1">
            { props.tags.map((tag) => (
                <Tag key={`${tag}${props.title}`} tagname={tag} className='px-[4px] py-[2px]' />
            )) }
        </ul>
    )
}

export function TagFeed(props: TagFeedProps) {
    return (
        <ul className="flex flex-row flex-wrap py-1 mx-auto justify-center items-start gap-2 my-10">
            { props.tags.map((tag) => (
                <Link className="my-4 h-min" key={tag.tagname} href={`/tags/${tag.tagname.replace(/\s/g, '-')}`}>
                    <Tag 
                        className="p-3 hover:bg-blue-900 hover:border-blue-900 hover:text-gray-100 dark:hover:bg-blue-900 dark:hover:border-blue-900 dark:hover:text-gray-100" 
                        tagname={tag.tagname} 
                        count={tag.count}
                    />
                </Link>
            )) }
        </ul>
    )

}
