import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { getPost, postDate, posts, relatedPosts, type Post } from "@/content/journal";
import { products } from "@/content/products";
import { withSales } from "@/features/cart/sales";
import { blogPostingJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image && { url: post.image.share, alt: post.image.alt },
    publishedTime: post.date,
  });
}

/**
 * Unsold pieces for the end of a post: the post's own picks first, then others to fill any
 * that sold. Shows as many as the post picks, or four if it picks none.
 */
async function piecesFor(post: Post) {
  const available = (await withSales(products)).filter((p) => !p.sold);
  const picks = (post.featured ?? []).flatMap((slug) => available.filter((p) => p.slug === slug));
  const others = available.filter((p) => !picks.includes(p));
  return [...picks, ...others].slice(0, post.featured?.length || 4);
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { Body } = post;
  const pieces = await piecesFor(post);
  const related = relatedPosts(post);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-28 outline-none md:px-8 md:pt-36">
        <JsonLd data={blogPostingJsonLd(post)} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])}
        />
        <article>
          <div className="mx-auto max-w-[1000px]">
            <Link href="/blog" className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
              ← All posts
            </Link>
            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted">
              <time dateTime={post.date}>{postDate(post.date)}</time> · {post.minutes} min read
            </p>
          </div>
          {post.image && (
            <div className="relative mt-6 aspect-[760/320] overflow-hidden rounded-xl bg-sand/60">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="mx-auto max-w-[1000px]">
            <h1 className="mt-10 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">{post.title}</h1>
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink-soft">
              <Body />
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-24 border-t border-ink/15 pt-16 md:mt-32 md:pt-20">
            <SectionHead
              title={["More from the", { accent: "blog" }]}
              link={{ href: "/blog", label: "All posts" }}
            />
            <ul className="grid gap-10 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    {p.image && (
                      <div className="relative aspect-[4/3] overflow-hidden bg-sand/60">
                        <Image
                          src={p.image.src}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 400px, 100vw"
                          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        />
                      </div>
                    )}
                    <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted">
                      <time dateTime={p.date}>{postDate(p.date)}</time> · {p.minutes} min read
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-snug group-hover:text-bronze">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">{p.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {pieces.length > 0 && (
          <section className="mt-24 border-t border-ink/15 pt-16 md:mt-32 md:pt-20">
            <SectionHead
              title={["From the", { accent: "studio" }]}
              intro="Original paintings, postcards and magnets, hand-painted in Ottawa. Free pickup in Blackburn Hamlet, or shipped anywhere in Canada."
              link={{ href: "/products", label: "Shop all work" }}
            />
            <ProductGrid products={pieces} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
