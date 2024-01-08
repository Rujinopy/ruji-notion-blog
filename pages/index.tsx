import { getAllArticles, convertToArticleList } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import Container from 'components/Container';
import ArticleList from 'components/ArticleList';
import { filterArticles } from 'utils/filterArticles';
import Category from 'components/Category';
import { useState, useEffect, useRef } from 'react';

export default function Index({ articles, categories }: any) {
  const [selectedTag, setSelectedTag] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTag);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10; // Number of articles per page

  //check if the page is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const maxPage = Math.ceil(filteredArticles.length / articlesPerPage);

  // Function to get the current page's articles
  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when a new tag is selected.
  }, [selectedTag]);

  return (
    <Layout>
      <Container>
        <div className="py-4">

          <div className={`w-full my-4 h-[30vh] md:h-[30vh] mb-8 flex flex-col items-center 
          justify-center transform 
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
          
           duration-500 delay-200 ease-in-out`}>
            <h1 className='text-center text-5xl transition-all font-anuphan'>Ruji Blog</h1>
            <h1 className={`text-center text-3xl font-anuphan transition-all mt-2 hover:mt-8`}>สวัสดีจ้า</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 dark:bg-neutral-900 pb-8">
            {categories.map(tag => (
              <Category
                tag={tag}
                key={tag}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
            ))}
          </div>
          <div className="mb-8 text-3xl font-bold text-gray-900 dark:text-white dark:bg-neutral-900">
            {!selectedTag ? 'Latest articles' : `${selectedTag} articles`}
          </div>
          <ArticleList articles={getCurrentPageArticles()} />
          {maxPage > 1 && (
        <div className="flex justify-center my-4">
          {Array.from({ length: maxPage }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-2 p-2 cursor-pointer ${
                currentPage === index + 1 ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
        </div>
      </Container>

    </Layout>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllArticles(process.env.BLOG_DATABASE_ID);
  const { articles, categories } = convertToArticleList(posts);
  return {
    props: {
      articles,
      categories
    },
    revalidate: 30
  };
};
