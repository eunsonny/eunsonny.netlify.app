import React from "react";
import styled from "@emotion/styled";

const TitleContainer = styled.div`
  background-color: #feee91;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.span`
  margin: 0px;
  color: black;
  font-size: 14px;
  font-family: inter, sans-serif;
  font-weight: bold;
  line-height: 16px;
`;

const LanguageTag = styled.div`
  padding: 5px;
  color: white;
  border-radius: 4px;
`;

const Title = (props) => {
  const { text, children, className } = props;
  return (
    <TitleContainer className={className}>
      <Text
        sx={{
          fontSize: [2, 3],
          fontFamily: `heading`,
          lineHeight: `heading`,
        }}
      >
        {text}
      </Text>
      {/* <LanguageTag
        sx={{
          bg: `highlight`,
        }}
      >
        {children}
      </LanguageTag> */}
    </TitleContainer>
  );
};

export default Title;