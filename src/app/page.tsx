import { Feed, Featured, PostProps } from "@components/index"

export default function Home() {
  const today = new Date();

  const featured_posts: Array<PostProps> = [
    {title:"Title1", post_date: today, description:"Description", slug:"test", image:"https://picsum.photos/500/200"},
    {title:"Title2", post_date: today, description:"Description", slug:"test", image:"https://picsum.photos/600/200"},
    {title:"Title3", post_date: today, description:"Description", slug:"test", image:"https://picsum.photos/600/300"},
  ];

  const feed_posts: Array<PostProps> = [
    {title:"Title1", post_date: today, description:"Description", slug:"test", image:"https://picsum.photos/400/200"},
    {title:"Title2", post_date: today, description:"Description", slug:"test", image:"https://picsum.photos/400/300"},
    {title:"Title3", post_date: today, description:"Description", slug:"test", image:"https://picsum.photos/400/400"},
  ];
  
  return (
    <>
      <Featured posts={featured_posts} />
      <Feed posts={feed_posts} />
    </>
  )
}
