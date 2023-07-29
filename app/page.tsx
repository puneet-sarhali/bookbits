import { allPosts } from "@/.contentlayer/generated";
import ComingSoon from "@/components/coming-soon";
import Link from "next/link";
import localFont from "next/font/local";
import Image from "next/image";

const cabinet = localFont({
  src: "../public/CabinetGrotesk-Variable.ttf",
});

export default function Home() {
  return (
    <div className="dark:prose-invert">
      <div className="my-28 mx-4">
        <h1 className={`${cabinet.className} text-5xl font-bold mb-4`}>
          Curated Short Reads
        </h1>
        <p className="text-xl text-neutral-700 dark:text-neutral-400 ">
          Standalone chapters and essays from non-fiction, perfect for curious
          minds who love to learn without the commitment of a full book.
        </p>
      </div>
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <div className="flex rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors p-4">
              <Image
                width={75}
                height={50}
                src={`/${post.id}.jpeg`}
                alt="placeholder image"
                className="h-28 w-20 object-cover rounded-lg mr-8 border dark:border-neutral-800 border-neutral-200"
              ></Image>
              <div>
                <h2 className="text-neutral-900 dark:text-neutral-50 font-medium">
                  {post.title}
                </h2>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  {post.book}
                </p>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  {post.author}
                </p>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  {post.minutes + " "}
                  min read
                </p>
              </div>
            </div>
          </Link>
        </article>
      ))}
      <ComingSoon />
    </div>
  );
}
