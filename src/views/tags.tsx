import { getTags } from "@/lib/fetch_content";
import { TagFeed } from "@/components/tags";

export default async function TagView() {
    const res = await getTags();

    if (res.err != undefined || res.ok == undefined) {
        return (
            <div className="container mx-auto py-4 min-h-[70vh]">
                <h1 className="text-3xl font-bold dark:text-white">Error</h1>
                <p className="text-lg dark:text-white">Impossible! Perhaps the archives are incomplete.</p>
                <p className="text-lg text-red-700 dark:text-red-500 font-bold">
                    { res?.err?.message ?? "Failed to get tags."}
                </p>
            </div>
        );
    }

    const tags = res.ok;

    return (
        <section className='py-16 min-h-[75vh]'>
            <h2 className="text-4xl font-bold text-center dark:text-gray-50">Tags</h2>
            <TagFeed tags={tags} />
        </section>
    )
}