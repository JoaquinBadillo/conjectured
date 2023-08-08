import { TagProps } from '@lib/types';

export function Tag(props: TagProps) {
    if (props.tagname == "Project") {
        return (
            <li className="m-[2px]"> 
                <span className="px-[4px] py-[2px] rounded-lg shadow-none text-gray-100 bg-blue-900 border-blue-900 border-2">
                    { props.tagname }
                </span>
            </li>
        );
    }

    return (
        <li className="m-[2px]"> 
            <span className="px-[4px] py-[2px] my-[3px] rounded-lg shadow-none text-gray-800 bg-gray-400 border-gray-400 border-2">
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
                <Tag key={`${tag}${props.title}`} tagname={tag} />
            )) }
        </ul>
    )
}