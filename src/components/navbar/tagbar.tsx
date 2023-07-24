import { Switch } from "../switch/switch";

interface TagBarProps {
    tags: Array<string>;
}

export const TagBar = (props: TagBarProps) => {
    return (
        <ul className="flex flex-row flex-wrap justify-around font-bold text-lg">
            { props.tags.map((tag: string, index: number) => (
                <li key={index} className="tag">
                    <a href={"#"}>{ tag }</a>
                </li>
            ))}
            <li className="tag">
                <button id="tag-toggle" className="tag" type="button">
                    ...
                </button>
            </li>
            <li className="tag flex justify-center items-center">
                <Switch />
            </li>
        </ul>
    );
}