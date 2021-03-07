import React from "react";
import styled from "styled-components";

import Emoji from "../../../../components/Emoji";

const LogoContainer = styled.div`
  font-size: 50px;

  span {
    padding: 0 10px;
  }
`;

export default function Logo() {
  return (
    <LogoContainer>
      <Emoji symbol="✈️" label="Travel" />
      <Emoji symbol="💻" label="Tech" />
      <Emoji symbol="💭" label="Thoughts" />
    </LogoContainer>
  );
}
