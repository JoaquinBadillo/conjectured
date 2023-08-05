import { TagProps } from '@lib/types';

export function Tag(props: TagProps) {
    return (
        <li className="m-[2px]"> 
            <span className="px-[4px] py-[2px] rounded-lg shadow-none text-gray-800 bg-gray-400 border-gray-400 border-2">
                { props.tagname }
            </span>
        </li>
    );
}