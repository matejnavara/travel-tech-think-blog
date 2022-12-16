import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import Section from "@components/Section";
import Bio from "@components/Bio";
import Icons from "@icons";
import mediaqueries from "@styles/media";
import { IAuthor } from "@types";

import { GridLayoutContext } from "./Articles.List.Context";

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ArticlesHero: React.FC<IAuthor> = ({ authors }) => {
  const {
    filter,
    gridLayout = "tiles",
    hasSetGridLayout,
    setFilter,
    setGridLayout
  } = useContext(GridLayoutContext);

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  const tilesIsActive = hasSetGridLayout && gridLayout === "tiles";
  const featuredAuthor = authors.find(author => author.featured);

  const setTypeFilter = (author: string | null) => {
    // setType(author);
    setFilter(author);
  };

  if (!featuredAuthor) {
    throw new Error(`
      No featured Author found.
      Please ensure you have at least featured Author.
  `);
  }

  return (
    <Section relative id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.heading }} />
      </HeadingContainer>
      <Bio author={featuredAuthor} />
      <SubheadingContainer>
        <CategoryControlsContainer>
          <GridButton
            onClick={() => setTypeFilter(null)}
            active={!filter}
            data-a11y="false"
            title="Latest"
            aria-label="Latest"
          >
            Latest
          </GridButton>
          <GridButton
            onClick={() => setTypeFilter("travel")}
            active={filter === "travel"}
            data-a11y="false"
            title="Travel"
            aria-label="Travel"
          >
            Travel
          </GridButton>
          <GridButton
            onClick={() => setTypeFilter("tech")}
            active={filter === "tech"}
            data-a11y="false"
            title="Tech"
            aria-label="Tech"
          >
            Tech
          </GridButton>
          <GridButton
            onClick={() => setTypeFilter("think")}
            active={filter === "think"}
            data-a11y="false"
            title="Think"
            aria-label="Think"
          >
            Think
          </GridButton>
        </CategoryControlsContainer>
        <GridControlsContainer>
          <GridButton
            onClick={() => setGridLayout("tiles")}
            active={tilesIsActive}
            data-a11y="false"
            title="Show articles in Tile grid"
            aria-label="Show articles in Tile grid"
          >
            <Icons.Tiles />
          </GridButton>
          <GridButton
            onClick={() => setGridLayout("rows")}
            active={!tilesIsActive}
            data-a11y="false"
            title="Show articles in Row grid"
            aria-label="Show articles in Row grid"
          >
            <Icons.Rows />
          </GridButton>
        </GridControlsContainer>
      </SubheadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;

  ${mediaqueries.desktop`
    margin-bottom: 80px;
  `};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `};
`;

const CategoryControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GridControlsContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: none;
  `};
`;

const HeadingContainer = styled.div`
  margin: 110px 0 50px;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
    margin: 110px 0 30px;
  `}
`;

const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 52px;
  line-height: 1.15;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 38px
  `}

  ${mediaqueries.tablet`
    font-size: 32px;
  `}

  ${mediaqueries.phone`
    font-size: 28px;
  `}
`;

const GridButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  color: ${p => p.theme.colors.primary};
  background: ${p => (p.active ? p.theme.colors.hover : "transparent")};
  transition: background 0.25s;
  opacity: ${p => (p.active ? 1 : 0.5)};
  transition: opacity 0.2s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    opacity: 1;
    background: ${p => p.theme.colors.hover};
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -15%;
    top: -15%;
    width: 130%;
    height: 130%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg path {
    fill: ${p => p.theme.colors.primary};
  }
`;
