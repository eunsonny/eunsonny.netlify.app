import React from "react";
import styled from "@emotion/styled";

const CopyButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  border-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 0 4px 4px 4px;
  padding: 4px 8px;
  background-color: #E2E8F022;
  color: white;
  cursor: pointer;
  font-family: inter, sans-serif;

  &:hover {
    background-color: #542C85;
  }
` 

const Button = (props) => {
  console.log(props)
  return (
    <CopyButton {...props}></CopyButton>
    // <button
    //   style={{
    //     position: "absolute",
    //     top: 0,
    //     right: 0,
    //     border: "none",
    //     boxShadow: "none",
    //     textDecoration: "none",
    //     margin: "4px",
    //     padding: "8px 10px",
    //     background: "#E2E8F022",
    //     color: "white",
    //     borderRadius: "8px",
    //     cursor: "pointer",
    //     color: "#E2E8F0",
    //     fontSize: "14px",
    //     fontFamily: "inter, sans-serif",
    //     lineHeight: "1",
    //   }}
    //   {...props}
    // />
  )
}

export default Button;
