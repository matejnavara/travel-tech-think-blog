import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Link } from "gatsby";

import Headings from "@components/Headings";

import mediaqueries from "@styles/media";

import { WIDE, NARROW, limitToTwoLines } from "../Sections.Styles";

export const Grid = styled.div<{ numberOfArticles: number }>`
  position: relative;
  display: grid;
  ${p => {
    if (p.numberOfArticles === 1) {
      return `
      grid-template-columns: 1fr;
      grid-template-rows: 1
    `;
    } else {
      return `
      grid-template-columns: ${WIDE} ${NARROW};
      grid-template-rows: 2;
      `;
    }
  }}
  column-gap: 30px;
  margin: 0 auto;
  max-width: ${p => (p.numberOfArticles === 1 ? "680px" : "100%")};

  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}
`;

export const Item = styled.div`
  position: relative;

  @media (max-width: 540px) {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background: ${p => p.theme.colors.card};
  }
`;

export const Title = styled(Headings.h3)`
  font-size: 22px;
  line-height: 1.4;
  margin-top: 10px;
  margin-bottom: ${p => (p.hasOverflow ? "45px" : "10px")};
  color: ${p => p.theme.colors.primary};
  font-family: ${p => p.theme.fonts.serif};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}
  ${mediaqueries.phablet`
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;
