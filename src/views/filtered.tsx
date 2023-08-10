import { Feed } from "@/components";
import { getTaggedPosts } from "@/lib/fetch_content";

export default async function FilteredPosts({ tagname }: { tagname: string }) {
    const tag = tagname.replace(/-/g, ' ');
    const posts = await getTaggedPosts(tag)
    .then((res) => {
        return res.ok ?? []
    }) 

    return (
        <Feed posts={posts} title={`${tag} Posts`}/>
    )
}