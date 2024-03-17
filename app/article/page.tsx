import Image from "next/image";
import { Grid, Section, Container, ImageTag } from "@/components";
import Link from "next/link";
import { sanityClient } from "@/utils";
import groq from "groq";
import { GetStaticPropsResult, Metadata } from "next/types";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "React App..",
  description: "Web site created with Next.js.",
};

async function fetchPage() {
  const articleIndex: any = await sanityClient.fetch(
    groq`*[_type == "postIndex" && !(_id in path('drafts.**'))][0] {
      title,
      body
    }
    `
  );

  const article: any = await sanityClient.fetch(
    groq`*[_type == "post" && !(_id in path('drafts.**'))] {
            ...,
            author -> {
              ...
            },
            coverImage {
              _type,
              asset -> {
                _id,
                url
              }
            },
          }
        `
  );

  return { articleIndex, article };
}

export default async function Page() {
  const page = await fetchPage();

  if (!page) return null;
  const { articleIndex, article } = page;
  const { title, body } = articleIndex;

  const renderBlog = () => {
    return (
      article &&
      article.map((item: any) => {
        const { _id, title, excerpt, date, coverImage, slug, author } = item;

        return (
          <Link
            key={_id}
            href={`/article/${slug.current}`}
            className="col-span-full sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 mb-6"
          >
            <div className="h-80">
              <ImageTag src={coverImage.asset.url} />
            </div>

            <h2 className="text-3xl uppercase">{title}</h2>

            <article className="text-xl mt-2">
              <p>{excerpt}</p>
            </article>

            <div className="mt-14 flex justify-between items-center relative pb-6">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z"
                    clip-rule="evenodd"
                  />
                </svg>
                {author.name}
              </div>

              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>{format(date, "d MMMM yyyy")}</p>
              </div>
            </div>
          </Link>
        );
      })
    );
  };

  return (
    <main>
      <Section>
        <Container>
          <Grid>
            <h1 className="col-span-full text-7xl xl:text-9xl text-center mb-24">
              {title}
            </h1>
            {renderBlog()}
          </Grid>
        </Container>
      </Section>
    </main>
  );
}
