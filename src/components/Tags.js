import React, { Component } from "react"
import { Fragment } from "react";
import { Link } from "gatsby"
import styled from "@emotion/styled"

const Tags = ({ tags, darkmode }) => {

  const Tag = styled(Link)`
  display: inline;
  margin-right: 1px;
  color: ${(props) => (props.darkmode ? "#7F8EA3" : "#606060")};
  font-size: 0.95rem;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #606060;
  }
`

  return (
    <>
      {tags.map((tag, i) => (
        <Fragment key={i}>
          {!!i && ", "}
          <Tag
            darkmode={darkmode}
            to={`/tags/${tag}`}
          >
            {tag}
          </Tag>
        </Fragment>
      ))}
    </>
  )
}

export default Tags
