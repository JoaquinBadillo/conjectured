import TagView from "@/views/tags";
import { Suspense } from "react";


export default function Home() {
    return (
        <Suspense fallback={ <div className="flex justify-center items-center dark:text-white text-4xl min-h-[70vh]">Loading...</div> }>
            <TagView />
        </Suspense>
    )
  }