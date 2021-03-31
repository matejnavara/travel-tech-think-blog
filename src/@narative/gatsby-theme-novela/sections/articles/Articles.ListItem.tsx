import React, { useContext } from "react";
import moment from "moment";

import Image, { ImagePlaceholder } from "@components/Image";
import { IArticle } from "@types";

import { GridLayoutContext } from "./Articles.List.Context";
import {
  ArticleLink,
  Item,
  ImageContainer,
  Title,
  Excerpt,
  MetaData
} from "./Articles.List.Styles";

interface ArticlesListItemProps {
  article: IArticle;
  narrow?: boolean;
}

const articleInFuture = date => {
  const articleDate = moment(date, "MMMM Do, YYYY");
  return moment().isBefore(articleDate);
};

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow }) => {
  if (!article) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const futureArticle = articleInFuture(article.date);
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  return (
    <ArticleLink
      to={!futureArticle && article.slug}
      data-a11y="false"
      data-future={futureArticle}
    >
      <Item gridLayout={gridLayout}>
        <ImageContainer
          narrow={narrow}
          futureArticle={futureArticle}
          gridLayout={gridLayout}
        >
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
        </ImageContainer>
        <div>
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          {!futureArticle ? (
            <div>
              <Excerpt
                narrow={narrow}
                hasOverflow={hasOverflow}
                gridLayout={gridLayout}
              >
                {article.excerpt}
              </Excerpt>
              <MetaData>
                {article.date} · {article.timeToRead} min read
              </MetaData>
            </div>
          ) : (
            <Excerpt
              narrow={narrow}
              hasOverflow={hasOverflow}
              gridLayout={gridLayout}
            >
              Coming Soon...
            </Excerpt>
          )}
        </div>
      </Item>
    </ArticleLink>
  );
};

export default ListItem;
