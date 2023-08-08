import Link from "next/link"
import { ButtonProps } from "@/lib/types"

import ProjectIcon from "./icons/projects"
import TagIcon from "./icons/tags"

function Button(props: ButtonProps) {
    return (
        <Link href={props.href} className="inline-flex items-center gap-5 group hover:scale-125">
            {props.icon}
            <span className="text-black-900 dark:text-white group-hover:text-blue-500">{props.text}</span>
        </Link>
    )
}

function ProjectButton() {
    return (
        <Button href="/projects" icon={<ProjectIcon />} label="Rocket Icon" text="Projects" />
    )
}

function TagsButton() {
    return (
        <Button href="/tags" icon={<TagIcon />} label="Tag Icon" text="Tags" />
    )
}

export default function ButtonBar() {
    return (
        <div className="flex my-4 items-center gap-10 md:gap-20">
            <ProjectButton />
            <TagsButton /> 
        </div>
    )
}