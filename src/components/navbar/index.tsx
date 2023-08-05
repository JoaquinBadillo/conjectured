import Link from "next/link"
import { TagBar } from "./tagbar"

export const Navbar = () => {
    return (
        <nav className="text-center py-10">
            <Link href="/"><h1 className="title dark:invert text-5xl md:text-6xl">Conjectured</h1></Link>
            {
                /* TODO: Make Tagbar Responsive and fetch from DB 
                <TagBar tags={["#math", "#cs", "#programming"]} />
                */
            }  
        </nav>
    )
}