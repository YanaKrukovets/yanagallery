import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { getPost, postDate, posts, type Post } from "@/content/journal";
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

/** Four unsold pieces for the end of a post: the post's own picks first, then any others. */
async function piecesFor(post: Post) {
  const available = (await withSales(products)).filter((p) => !p.sold);
  const picks = (post.featured ?? []).flatMap((slug) => available.filter((p) => p.slug === slug));
  const others = available.filter((p) => !picks.includes(p));
  return [...picks, ...others].slice(0, 4);
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { Body } = post;
  const pieces = await piecesFor(post);

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
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
            ← All posts
          </Link>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted">
            <time dateTime={post.date}>{postDate(post.date)}</time> · {post.minutes} min read
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">{post.title}</h1>
          {post.image && (
            <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-sand/60">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink-soft">
            <Body />
          </div>
        </article>

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
