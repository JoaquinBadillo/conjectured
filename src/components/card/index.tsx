import Link from "next/link"
import { PostProps } from "@/lib/types"
import { TagList } from "../tags"
import Image from "next/image"

/*  TODO 
    Allow user to customize UI for compact or cozy cards
*/

// Default (cozy) card
export function Card(props: PostProps) {
    return (
        <div className="card">
            <Link href={ `/posts/${props.slug}` }>
                <Image 
                    src={props.image}
                    alt={`${props.title} image`} 
                    height={96}
                    width={384}
                    style={{overflow: "hidden"}}
                />
                <div className="card-content bg-gray-300 dark:bg-gray-900">
                    <h3 className="text-2xl py-1 transition-all duration-300 ease-linear">
                        { props.title }
                    </h3>
                    
                    { props.tags != undefined ? <TagList tags={props.tags} title={props.title} /> : <></> }

                    <p className="text-base break-words pt-2">
                        { props.description.length > 100 ? 
                            `${props.description.slice(0, 90)}...` :  
                            props.description }
                    </p>
                </div>
            </Link>
        </div>
    )
}

export const LoadingCard = () => {
    return (
        <div className="card bg-gray-100 dark:bg-gray-700">
            <div className="h-1/2 relative bottom-[-50%] left-0 bg-gray-300 dark:bg-gray-900">
            </div>
        </div>
    )
}

// Compact cards have no image and are smaller
export const CompactCard = (props: PostProps) => {
    return (
        <Link href={`/posts/${props.slug}`} className="m-4">
            <article className="w-[300px] h-[120px] flex flex-row justify-around rounded-md border-2 hover:border-blue-400 dark:border-gray-600 dark:hover:border-indigo-300 transition-all duration-300 ease-linear">
                <div>
                    <h3 className="text-xl py-1 transition-all duration-300 ease-linear">
                        {props.title}
                    </h3>
                    <p>
                        {props.description}
                    </p>
                </div>
            </article>
        </Link>
    )
}

export const ErrorCard = () => {
    return (
        <div className="card">
            <div className="card-content bg-gray-300 dark:bg-gray-900">
                <h3 className="text-3xl py-1 transition-all duration-300 ease-linear">
                    Error
                </h3>
                <p className="text-lg">
                    Could not get blog posts
                </p>
            </div>
        </div>
    );
};