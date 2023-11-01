import { Client, LogLevel } from '@notionhq/client';
import slugify from 'slugify';
import { addDashToSpace } from './toSlug';

const notion = new Client({
  auth: process.env.NOTION_SECRET
});

export const getAllArticles = async databaseId => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'status',
          select: {
            equals: '✅ Published'
          }
        }
      ]
    },
    sorts: [
      {
        property: 'published',
        direction: 'descending'
      }
    ]
  });

  return response.results;
};

const mapArticleProperties = article => {
  const { id, properties } = article;

  return {
    id: id,
    title: properties?.title.title[0].plain_text || '',
    categories:
      properties?.categories?.multi_select.map((category: any) => category.name) || [],
    author: {
      name: properties.Author.created_by.id,
      imageUrl: "https://scontent.fkkc2-1.fna.fbcdn.net/v/t31.18172-1/17761207_1272009869544033_1007768887743833283_o.jpg?stp=c60.0.240.240a_dst-jpg_p240x240&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=A4c6UFLONMgAX-FtQIa&_nc_ht=scontent.fkkc2-1.fna&oh=00_AfD2xg3celt4gdHBeDmGUfMiyW_wyrnhmgry7j_ZASTbBw&oe=653CD848"
    },
    coverImage:
      properties?.coverImage?.files[0]?.file?.url ||
      properties?.coverImage?.files[0]?.external?.url ||
      '/image-background.png',
    publishedDate: properties.published?.date?.start,
    summary: properties?.summary.rich_text[0]?.plain_text ?? ''
  };
};

export const convertToArticleList = (tableData: any) => {
  let categories: string[] = [];
  
  const articles = tableData.map((article: any) => {
    const { properties } = article;
    properties?.categories?.multi_select?.forEach((category: any) => {
      const { name } = category;
      if (!categories.includes(name) && name) {
        categories.push(name);
      }
    });

    return mapArticleProperties(article);
  });

  return { articles, categories };
};

export const getMoreArticlesToSuggest = async (databaseId, currentArticleTitle) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: '✅ Published'
          }
        },
        {
          property: 'title',
          text: {
            does_not_equal: currentArticleTitle
          }
        }
      ]
    }
  });

  const moreArticles = response.results.map((article: any) =>
    mapArticleProperties(article)
  );

  return shuffleArray(moreArticles).slice(0, 2);
};

export const getArticlePage = (data, slug) => {
  // console.log(slug);
  
  const response = data.find(result => {
    if (result.object === 'page') {
      // console.log(addDashToSpace(result.properties.title.title[0].plain_text));
      const resultSlug = addDashToSpace(result.properties.title.title[0].plain_text)
      
      return resultSlug === slug;
      // const resultSlug = slugify(
      //   result.properties.title.title[0].plain_text
      // ).toLowerCase();
      // return resultSlug === slug;
    }
    return false;
  });

  return response;
};

export function shuffleArray(array: Array<any>) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export const getArticlePageData = async (page: any, slug: any, databaseId) => {
  let content = [];
  let title = '';

  title = page.properties.title.title[0].plain_text;

  const moreArticles: any = await getMoreArticlesToSuggest(databaseId, title);

  let blocks = await notion.blocks.children.list({
    block_id: page.id
  });

  content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor
    });

    content = [...content, ...blocks.results];
  }

  return {
    ...mapArticleProperties(page),
    content,
    slug,
    moreArticles
  };
};
