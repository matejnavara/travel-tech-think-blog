import React from "react";
import styled from "styled-components";

import Emoji from "../../../../components/Emoji";

const Logo: React.FC<{}> = () => (
  <LogoContainer>
    <Emoji symbol="✈️" label="Travel" />
    <Emoji symbol="💻" label="Tech" />
    <Emoji symbol="💭" label="Thoughts" />
  </LogoContainer>
);

export default Logo;

const LogoContainer = styled.div`
  font-size: 50px;

  span {
    padding: 0 10px;
  }
`;
