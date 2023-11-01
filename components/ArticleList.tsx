import { Article } from 'utils/types';
import ArticleCard from './ArticleCard';

type Props = {
  articles: Article[];
};

export default function ArticleList({ articles }: Props) {
  const remainingArticles = articles.slice(1);
  return (
    <div className="grid gap-10 lg:gap-12 sm:grid-cols-2 dark:bg-zinc-900">
      <ArticleCard article={articles[0]} />
      {remainingArticles.map(article => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
}
