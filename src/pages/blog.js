import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import useStore from "../../useStore"
import { useObserver } from "mobx-react"
import Tags from "../components/Tags"

import { MDXRenderer } from "gatsby-plugin-mdx"

const Content = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`
const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: ${(props) => (props.darkmode ? "#FFFFFF" : "#282828")};
    margin: 0;
  }
`
const ViewAllTags = styled(Link)`
  color: #54543a;
  text-decoration: none;
  color: ${(props) => (props.darkmode ? "#7F8EA3" : "#54543A")};

  &:hover {
    text-decoration: underline;
    color: ${(props) => (props.darkmode ? "#7F8EA3" : "#54543A")};
  }
`

const ContentSection = styled.section`
  margin: 4rem auto 4rem;
`

const ArticleDate = styled.h5`
  font-weight: 400;
  display: inline;
  color: ${(props) => (props.darkmode ? "#7F8EA3" : "#606060")};
`

const MarkerHeader = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${(props) => (props.darkmode ? "#CBD5E0" : "#282828")};
  display: inline;
  border-radius: 1em 0 1em 0;
`

const ContentInfo = styled.div``

const Tag = styled(Link)`
  display: inline;
  margin-right: 10px;
  color: ${(props) => (props.darkmode ? "#7F8EA3" : "#606060")};
  font-size: 0.95rem;
  font-weight: 400;
  text-decoration: none;
  background-color: #efefef;
  border-radius: 10px;
  padding: 4px;

  &:hover {
    text-decoration: underline;
    color: #606060;
  }
`
const Intro = styled.p`
  margin: 0 0 1.7rem 0;
  color: ${(props) => (props.darkmode ? "#CBD5E0" : "#282828")};
  max-width: 900px;
`

const IndexPage = ({ data }) => {
  const { dayNightStore } = useStore()

  return useObserver(() => (
    <Layout darkmode={dayNightStore.btnIsActive}>
      <SEO title="Blog" />
      <Content>
        <TitleArea darkmode={dayNightStore.btnIsActive}>
          <h1>Blog</h1>
          <ViewAllTags darkmode={dayNightStore.btnIsActive} to="/tags">
            View All Tags
          </ViewAllTags>
        </TitleArea>
        <ContentSection>
          {data.allMdx.edges
            .filter(({ node }) => {
              const rawDate = node.frontmatter.rawDate
              const date = new Date(rawDate)
              return date < new Date()
            })
            .map(({ node }) => (
              <div key={node.id}>
                <Link
                  to={node.frontmatter.path}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <MarkerHeader
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
                    {node.frontmatter.title}
                  </MarkerHeader>
                </Link>
                <ContentInfo>
                  <ArticleDate darkmode={dayNightStore.btnIsActive}>
                    {node.frontmatter.date}
                  </ArticleDate>
                  {node.frontmatter.tags && (
                    <span
                      css={css`
                        color: #606060;
                      `}
                    >
                      {" "}
                      &ndash;{" "}
                    </span>
                  )}
                  {/* {node.frontmatter.tags &&
                    node.frontmatter.tags.map((tag, idx) => (
                      <Tag
                        darkmode={dayNightStore.btnIsActive}
                        to={`/tags/${tag}`}
                        key={idx}
                      >
                        {tag}
                      </Tag>
                    ))} */}
                <Tags darkmode={dayNightStore.btnIsActive} tags={node.frontmatter.tags}></Tags>
                </ContentInfo>
                <Intro darkmode={dayNightStore.btnIsActive}>
                  {node.excerpt}
                </Intro>
              </div>
            ))}
        </ContentSection>
      </Content>
    </Layout>
  ))
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            rawDate: date
            path
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
