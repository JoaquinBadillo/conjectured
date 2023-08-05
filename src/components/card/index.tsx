import { useState, useEffect } from "react"
import Link from "next/link"
import { PostProps } from "@/lib/types"
import { Tag } from "../tag"

/*  TODO 
    Allow user to customize UI for compact or cozy cards
*/

// Default (cozy) card
export function Card(props: PostProps) {
    return (
        <div className="card">
            <Link href={ `/posts/${props.slug}` }>
                <img 
                    src={props.image} 
                    alt={`${props.title} image`} 
                    className="w-full h-24 object-cover"
                />
                <div className="card-content bg-gray-300 dark:bg-gray-900">
                    <h3 className="text-2xl py-1 transition-all duration-300 ease-linear">
                        { props.title }
                    </h3>
                    <ul className="flex flex-row flex-wrap text-sm">
                        { props.tags.map((tag) => (
                            tag ? <Tag key={tag} tagname={tag} /> : <></>
                        )) }
                    </ul>
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
                    Could not get featured posts.
                </p>
            </div>
        </div>
    );
};