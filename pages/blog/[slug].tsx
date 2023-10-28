import { Fragment } from 'react';
import Link from 'next/link';
import { getAllArticles, getArticlePage, getArticlePageData } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import Image from 'next/image';
import { renderBlocks } from 'components/notionBlocks/renderBlocks';
import getLocalizedDate from 'utils/getLocalizedDate';
import Container from 'components/Container';
import slugify from 'slugify';
import ArticleList from 'components/ArticleList';
import siteData from 'data/siteData';
import { addDashToSpace } from 'utils/toSlug';

const ArticlePage = ({
  content,
  title,
  coverImage,
  publishedDate,
  summary,
  moreArticles
}) => {
  const publishedOn = getLocalizedDate(publishedDate);

  // const slug = slugify(title).toLowerCase();
  const slug = addDashToSpace(title)

  // const ogImage = `https://www.phung.io/api/og-image?title=${encodeURIComponent(
  //   title
  // )}&date=${encodeURIComponent(publishedOn)}`;

  const ogImage = `${siteData.websiteUrl}/api/og-image?title=${encodeURIComponent(
    title
  )}&date=${encodeURIComponent(publishedOn)}`;

  return (
    <>
      <Layout
        title={title}
        description={summary}
        imageUrl={ogImage}
        date={new Date(publishedDate).toISOString()}
        ogUrl={`/blog/${slug}`}
      >
        <div>
          <div className="px-6 py-16 pb-48 mx-auto -mb-48 text-center md:pb-80 md:-mb-80 max-w-4xl">
            <div className="max-w-3xl mx-auto">
              <div className="font-extrabold tracking-tight text-w-4xl text-xl">
                {title}
              </div>
              <div className="flex items-center justify-center mb-2 space-x-2 text-sm text-gray-500 dark:text-white">
                <div className="">{publishedOn}</div>
              </div>
              <div className="max-w-4xl mx-auto mt-3 md:text-xl leading-8 text-gray-500 dark:text-gray-300 sm:mt-4">
                {summary}
              </div>
            </div>
          </div>

          <div className="max-w-4xl px-6 mx-auto mt-6 md:px-8">
            <img className="object-cover w-full mx-auto aspect-video" src={coverImage} />
          </div>
          <div className="max-w-4xl px-6 mx-auto mb-24 space-y-8 md:px-8">
            {content.map(block => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
          <div className="py-12 border-t">
            <Container>
              <div className="flex items-center justify-between my-8">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">Latest articles</div>
                <Link href="/">
                  <span className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                    More articles ➜
                  </span>
                </Link>
              </div>
              <ArticleList articles={moreArticles} />
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  data.forEach(result => {
    console.log(result.properties.title)
    if (result.object === 'page') {
      paths.push({
        params: {
          slug:  addDashToSpace(result.properties.title.title[0].plain_text) || "404"
        }
      });
    }
  });

  // console.log(paths)
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);
  // console.log(data)
  const page = getArticlePage(data, slug);
  // console.log(page)
  const result = await getArticlePageData(page, slug, process.env.BLOG_DATABASE_ID);

  return {
    props: result,
    revalidate: 30
  };
};

export default ArticlePage;
