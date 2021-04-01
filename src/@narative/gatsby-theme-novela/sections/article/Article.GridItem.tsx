import React from "react";

import Image from "@components/Image";
import { IArticle } from "@types";

import {
  ArticleLink,
  ImageContainer,
  Excerpt,
  MetaData
} from "../Sections.Styles";
import { articleInFuture } from "../Sections.Helpers";
import { Item, Title } from "./Article.Styles";

interface GridItemProps {
  article: IArticle;
  narrow?: boolean;
}

const GridItem: React.FC<GridItemProps> = ({ article, narrow }) => {
  if (!article) return null;

  const futureArticle = articleInFuture(article.date);
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;

  return (
    <ArticleLink
      to={!futureArticle && article.slug}
      data-a11y="false"
      narrow={narrow ? "true" : "false"}
      data-future={futureArticle}
    >
      <Item>
        <ImageContainer futureArticle={futureArticle}>
          <Image src={imageSource} />
        </ImageContainer>
        <Title dark hasOverflow={hasOverflow}>
          {article.title}
        </Title>
        {!futureArticle ? (
          <div>
            <Excerpt hasOverflow={hasOverflow}>{article.excerpt}</Excerpt>
            <MetaData>
              {article.date} · {article.timeToRead} min read
            </MetaData>{" "}
          </div>
        ) : (
          <Excerpt hasOverflow={hasOverflow}>Coming Soon...</Excerpt>
        )}
      </Item>
    </ArticleLink>
  );
};

export default GridItem;
