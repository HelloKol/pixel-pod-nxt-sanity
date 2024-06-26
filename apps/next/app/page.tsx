export const revalidate = 30;
import Link from 'next/link';
import { format } from 'date-fns';
// Components
import { Container, Grid, ImageTag, Section } from '@/components';
// Utils/Lib
import { sanityClient, generateMetaTags } from '@/utils';
// Services/Types
import { HOME_QUERY } from '@/services/queries';
import { IHome } from '@/types';
import { ResolvingMetadata } from 'next';

export async function generateMetadata({}: {}, parent: ResolvingMetadata) {
  const home: IHome = await sanityClient.fetch(HOME_QUERY);
  const previousImages = (await parent)?.openGraph?.images ?? [];

  return generateMetaTags(home, previousImages);
}

async function fetchPage() {
  const home: IHome = await sanityClient.fetch(HOME_QUERY);
  return { home };
}

export default async function Page() {
  const page = await fetchPage();

  if (!page) return null;
  const { home } = page;
  const { featuredArticle, latestArticle } = home;
  const { title, minuteRead, coverImage, slug, excerpt, author, date } = featuredArticle;
  const formattedDate = format(date, 'do MMMM yyyy');

  const renderBlog = () =>
    latestArticle &&
    latestArticle.map((article) => {
      const { _id, title, date, coverImage, slug, author } = article;

      return (
        <Link
          key={_id}
          href={`/article/${slug}`}
          className="block group relative col-span-full sm:col-span-6 xl:col-span-6 bg-white text-white mb-6 rounded-larger overflow-hidden"
        >
          <div className="h-[600px]">
            <ImageTag
              src={coverImage.asset.url}
              layout="fill"
              objectFit="cover"
              blurDataURL={coverImage?.asset?.metadata?.lqip}
            />
          </div>

          <div className="absolute top-7 left-7">
            <p className="text-md py-1 px-4 w-fit backdrop-blur-md bg-black/50 mb-2 rounded-full text-center">
              {author.name}
            </p>
            <p className="text-md py-1 px-4 backdrop-blur-md bg-black/50 mb-2 rounded-full text-center">
              {format(date, 'd MMMM yyyy')}
            </p>
          </div>

          <div className="absolute top-7 right-7 bg-white p-4 rounded-full rotate-45 group-hover:translate-x-4 group-hover:-translate-y-4 transition ease-out">
            <svg
              className="group-hover:w-8 group-hover:h-8 w-10 h-10 text-darkBlack"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v13m0-13 4 4m-4-4-4 4"
              />
            </svg>
          </div>

          <h2 className="bg-white pt-[25px] pl-[75px] text-black absolute -bottom-14 rounded-larger -left-14 text-4xl h-[200px] w-[500px]">
            {title}
          </h2>
        </Link>
      );
    });

  return (
    <main>
      <Section className="pt-0 pb-0 md:pt-0 md:pb-0 mt-[128px]">
        <Container>
          <Grid>
            <div className="col-span-12 md:col-start-1 md:col-end-8 bg-darkBlack rounded-large text-white px-7 pt-7 pb-20 md:pb-7 md:min-h-[460px] relative">
              <div className="flex items-center gap-2 text-xl mt-2">
                <p className="text-sm capitalize font-semibold">Featured Article</p>
                <div className="h-[5px] w-[5px] bg-white rounded-full" />
                <p className="text-sm capitalize font-semibold">{minuteRead} mins read</p>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl capitalize mt-2 break-all">{title}</h1>

              <div className="flex items-center justify-between absolute left-7 bottom-7 right-7 text-darkRed">
                <p>{author.name}</p>
                <p>{formattedDate}</p>
              </div>
            </div>

            <div className="col-span-12 md:col-start-1 md:col-end-5 bg-darkBlack rounded-large p-7">
              <article className="font-light text-white text-xl">
                <p>{excerpt}</p>
              </article>
            </div>

            <Link
              href={`/article/${slug}`}
              className="block group col-span-12 md:col-start-5 md:col-end-8 rounded-large p-7 text-white bg-darkRed"
            >
              <div className="flex flex-col justify-between h-full">
                <div className="ml-auto bg-white p-4 rounded-full rotate-45 group-hover:translate-x-6 group-hover:-translate-y-6 transition ease-out">
                  <svg
                    className="group-hover:w-7 group-hover:h-7 w-10 h-10 text-darkBlack"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>

                <p className="text-3xl">Read Article</p>
              </div>
            </Link>

            <div className="md:row-start-1 md:row-end-3	col-span-12 md:col-start-8 md:col-end-13 h-[350px] md:h-full w-full rounded-large overflow-hidden">
              <ImageTag
                src={coverImage.asset.url}
                layout="fill"
                objectFit="cover"
                quality={100}
                blurDataURL={coverImage?.asset?.metadata?.lqip}
              />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid>{renderBlog()}</Grid>
        </Container>
      </Section>
    </main>
  );
}
