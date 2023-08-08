import Link from "next/link"
import Buttons from "../buttons"

export const Navbar = () => {
    return (
        <>
        <nav className="flex w-full p-8 md:justify-between justify-center items-center content-center flex-wrap max-w-full">
            <Link href="/"><h1 className="title dark:invert text-5xl mx-10 sm:mx-20 md:mr-2">Conjectured</h1></Link>
            <Buttons />    
        </nav>
        <hr className="drop-shadow-xl shadow-white w-full" />
        </>
    )
}