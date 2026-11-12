import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;
export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({ where: { isPublished: true }, select: { slug: true } }).catch(() => []);
  return posts.map(post => ({ slug: post.slug }));
}
const getPost = unstable_cache((slug: string) => prisma.blogPost.findFirst({ where: { slug, isPublished: true } }), ["zen-steps-journal-post"], { revalidate: 3600, tags: ["journal"] });
export async function generateMetadata({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params; const post = await getPost(slug);
  return { title: post ? `${post.title} — Zen Steps` : "Field notes — Zen Steps", description: post?.excerpt };
}
export default async function JournalArticle({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params; const post = await getPost(slug).catch(() => null);
  if (!post) notFound();
  return <main className="journal-article"><Link href="/journal">← All field notes</Link><p className="eyebrow">{post.category} · {post.author}</p><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p>{post.coverImage&&<img className="article-cover" src={post.coverImage} alt=""/>}<article>{post.content.split(/\n\s*\n/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article><Link className="text-link" href="/journal">Read another note <span>↗</span></Link><style>{`.journal-article{padding:45px 10vw}.journal-article>a:first-child{font-size:11px}.journal-article .eyebrow{color:var(--accent);margin-top:55px}.journal-article h1{max-width:900px;font:clamp(50px,7vw,88px)/.95 var(--display);font-weight:400;letter-spacing:-2px;margin:0}.journal-article .article-excerpt{font-size:17px;line-height:1.7;color:var(--muted);max-width:680px;margin:25px 0}.article-cover{width:100%;max-height:520px;object-fit:cover;margin:25px 0}.journal-article article{max-width:680px;margin:35px auto 50px;font-size:15px;line-height:1.9}.journal-article article p{margin:0 0 1.3em}.journal-article .text-link{display:flex;width:max-content}@media(max-width:700px){.journal-article{padding:30px 7%}}`}</style></main>;
}
