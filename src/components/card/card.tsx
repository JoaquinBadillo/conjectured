import Link from "next/link"
import { PostProps } from "../types.ts"

export const Card = (props: PostProps) => {
    return (
        <div className="card">
            <Link href={ `/posts/${props.slug}` }>
                <img 
                    src={props.image} 
                    alt={`${props.title} image`} 
                    className="w-full h-24"
                />
                <div className="card-content bg-gray-300 dark:bg-gray-900">
                    <h3 className="text-3xl py-1 transition-all duration-300 ease-linear">
                        { props.title }
                    </h3>
                    <p className="text-lg">{ props.description }</p>
                </div>
            </Link>
        </div>
    );
};