import React from "react";
import styled from "styled-components";

interface EmojiProps {
  symbol: string;
  label?: string;
}

const Emoji: React.FC<EmojiProps> = ({ symbol, label }) => (
  <EmojiWrapper
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </EmojiWrapper>
);

const EmojiWrapper = styled.span`
  flex: 1;
`;

export default Emoji;
