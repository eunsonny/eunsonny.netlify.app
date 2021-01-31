import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useStore from "../../useStore"
import { useObserver } from "mobx-react"
import { css } from "@emotion/core"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Content = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  padding: 1.45rem 1.0875rem;
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
    padding: 10px;
    background-color: #fffbed; 
    border-left: 5px solid #ffe996;
    /* border-left: 5px solid #f99; */
    /* background-color: #ffeeed; */
  }
`

export default ({ data }) => {
  const post = data.mdx
  const { dayNightStore } = useStore()

  return useObserver(() => (
    <Layout darkmode={dayNightStore.btnIsActive}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
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
          {post.frontmatter.date} {/* - {post.fields.readingTime.text} */}
        </HeaderDate>
        <MarkdownContent
          darkmode={dayNightStore.btnIsActive}
          // dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <MarkdownContent>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MarkdownContent>
      </Content>
    </Layout>
  ))
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        title
      }
    }
  }
`
