import React, { useContext, useEffect } from "react";
import { IArticle } from "@types";

import { GridLayoutContext } from "./Articles.List.Context";
import { ArticlesListContainer, List } from "./Articles.Styles";
import ListItem from "./Articles.ListItem";
import { articleInFuture } from "../Sections.Helpers";

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [SHORT], [LONG]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails
}) => {
  if (!articles) return null;

  const hasOnlyOneArticle = articles.length === 1;
  const {
    filter,
    gridLayout = "tiles",
    hasSetGridLayout,
    getGridLayout
  } = useContext(GridLayoutContext);

  const { validArticles, futureArticles } = articles
    .filter(article => !filter || article.author.toLowerCase() == filter)
    .reduce(
      (result, value) => {
        if (articleInFuture(value.date)) {
          result.futureArticles.push(value);
        } else {
          result.validArticles.push(value);
        }
        return result;
      },
      { validArticles: [], futureArticles: [] }
    );

  /**
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */
  const articlePairs = [...validArticles, ...futureArticles].reduce(
    (result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    },
    []
  );

  useEffect(() => getGridLayout(), []);

  return (
    <ArticlesListContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      {articlePairs.map((ap, index) => {
        const isEven = index % 2 !== 0;
        const isOdd = index % 2 !== 1;

        return (
          <List
            key={index}
            gridLayout={gridLayout}
            hasOnlyOneArticle={hasOnlyOneArticle}
            reverse={isEven}
          >
            <ListItem article={ap[0]} narrow={isEven} />
            <ListItem article={ap[1]} narrow={isOdd} />
          </List>
        );
      })}
    </ArticlesListContainer>
  );
};

export default ArticlesList;
