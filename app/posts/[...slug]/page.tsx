import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import Image from "next/image";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description:
      post.author + " - " + post.book + " - " + post.minutes + " min read",
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className="p-6">
      <Image
        width={800}
        height={50}
        src={`/${post.id}.jpeg`}
        alt="placeholder image"
        className="h-36 object-cover rounded-lg my-16"
      ></Image>
      <article className="prose dark:prose-invert">
        <h1 className="mb-2">{post.title}</h1>
        {post.book && (
          <p className=" mt-0 text-slate-700 dark:text-slate-200 italic">
            {post.book +
              " - " +
              post.author +
              " - " +
              post.minutes +
              " min read"}
          </p>
        )}
        <hr className="my-4" />
        <Mdx code={post.body.code} />
      </article>
    </div>
  );
}
