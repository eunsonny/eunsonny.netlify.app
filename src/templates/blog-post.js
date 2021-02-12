import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useStore from "../../useStore"
import { useObserver } from "mobx-react"
import { css } from "@emotion/core"
import { MDXRenderer } from "gatsby-plugin-mdx"

// import TableOfContents from "../components/TableOfContents";
import TableOfContent from "../components/TableOfContent";

const BlogPostWrap = styled.div`
  display: flex;
  position: relative;
  margin-right: 20px;

  @media only screen and (min-width: 1300px) {
    width: 1250px;
  }
`
const BlogPostContentWrap = styled.div`
  min-height: 78vh;
  position: relative;

  @media only screen and (min-width: 1300px) {
    width: 900px;
  }
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  padding: 1.45rem 1.0875rem;
  position: relative;
`

const MarkedHeader = styled.h1`
  display: inline;
  border-radius: 1em 0 1em 0;
  color: ${(props) => (props.darkmode ? "#CBD5E0" : "#2d3748")};
`

const HeaderDate = styled.h4`
  margin-top: 10px;
  color: ${(props) => (props.darkmode ? "#7F8EA3" : "#606060")};
  font-weight: 500;
`

// STYLE THE TAGS INSIDE THE MARKDOWN HERE
const MarkdownContent = styled.div`
  color: ${(props) => (props.darkmode ? "#CBD5E0" : "#282828")};
  padding: 50px 0px;
  max-width: 820px;

  p {
    color: ${(props) => (props.darkmode ? "#CBD5E0" : "#282828")};
    line-height: 1.7;
  }

  a {
    text-decoration: none;
    position: relative;

    background-image: linear-gradient(
      rgba(255, 250, 150, 0.8),
      rgba(255, 250, 150, 0.8)
    );
    background-repeat: no-repeat;
    background-size: 100% 0.2em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 100% 88%;
    }
  }

  a > code:hover {
    text-decoration: underline;
  }

  blockquote {
    padding: 20px;
    background-color: #fffbed;
    border-left: 5px solid #ffe996;

    p {
      color: #282828;
    }
  }
`

export default ({ data }) => {
  const [isWindowWide, setIsWindowWide] = useState(true);
  const post = data.mdx;
  const { dayNightStore } = useStore();

  useEffect (() => {
    setWindowSize();
    window.addEventListener("resize", setWindowSize);
  });

  const setWindowSize = () => {
    window.innerWidth < 1200 ? setIsWindowWide(false) : setIsWindowWide(true);
  }

  console.log(window.innerWidth)
  return useObserver(() => (
    <Layout darkmode={dayNightStore.btnIsActive}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <BlogPostWrap>
        <BlogPostContentWrap>
          <Content>
            <MarkedHeader
              darkmode={dayNightStore.btnIsActive}
              css={
                dayNightStore.btnIsActive
                  ? css`
                      background-image: linear-gradient(
                        -100deg,
                        rgba(71, 235, 179, 0.15),
                        rgba(71, 235, 179, 0.8) 100%,
                        rgba(71, 235, 179, 0.25)
                      );
                    `
                  : css`
                      background-image: linear-gradient(
                        -100deg,
                        rgba(255, 250, 150, 0.15),
                        rgba(255, 250, 150, 0.8) 100%,
                        rgba(255, 250, 150, 0.25)
                      );
                    `
              }
            >
              {post.frontmatter.title}
            </MarkedHeader>
            <HeaderDate darkmode={dayNightStore.btnIsActive}>
              {post.frontmatter.date}
            </HeaderDate>
            {/* <MarkdownContent
          darkmode={dayNightStore.btnIsActive}
          // dangerouslySetInnerHTML={{ __html: post.html }}
        /> */}
            <MarkdownContent darkmode={dayNightStore.btnIsActive}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MarkdownContent>
          </Content>
        </BlogPostContentWrap>
        {/* <TableOfContents items={post.tableOfContents.items}></TableOfContents> */}
        {/* {isWindowWide ? <TableOfContent items={post.tableOfContents.items}></TableOfContent> : null} */}
        <TableOfContent items={post.tableOfContents.items}></TableOfContent>
      </BlogPostWrap>
    </Layout>
  ))
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      excerpt(pruneLength: 160)
      tableOfContents
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        description
        path
        title
      }
    }
  }
`
