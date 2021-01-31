import React from "react"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import useStore from "../../useStore"
import { useObserver } from "mobx-react"

import Layout from "../components/layout"

import { MDXRenderer } from "gatsby-plugin-mdx";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const { dayNightStore } = useStore()

  const Content = styled.div`
    margin: 0 auto;
    max-width: 1024px;
    height: 78vh;
  `
  const TitleArea = styled.div`
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin: 0;
      font-size: 2.7rem;
      color: ${(props) => (props.darkmode ? "#ffffff" : "#282828")};
    }
  `
  const ViewAllTags = styled(Link)`
    color: ${(props) => (props.darkmode ? "#7F8EA3" : "#54543A")};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: ${(props) => (props.darkmode ? "#7F8EA3" : "#54543A")};
    }
  `
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with '${tag}'`

  const ContentTitle = styled.div`
    display: flex;
    flex-direction: column;
  `
  const MarkerHeader = styled.h3`
    font-size: 1.3rem;
    font-weight: 500;
    color: ${(props) => (props.darkmode ? "#CBD5E0" : "#2d3748")};
    display: inline;
    border-radius: 1em 0 1em 0;
  `
  const ArticleDate = styled.h5`
    font-weight: 400;
    display: inline;
    color: ${(props) => (props.darkmode ? "#7F8EA3" : "#606060")};
  `
  return useObserver(() => (
    <Layout darkmode={dayNightStore.btnIsActive}>
      <Content>
        <TitleArea darkmode={dayNightStore.btnIsActive}>
          <h1>{tagHeader}</h1>
          <ViewAllTags to="/tags" darkmode={dayNightStore.btnIsActive}>
            View All Tags
          </ViewAllTags>
        </TitleArea>
        {edges
          // .filter(({ node }) => {
          //   const rawDate = node.frontmatter.rawDate
          //   const date = new Date(rawDate)
          //   return date < new Date()
          // })
          .map(({ node }) => (
            <ContentTitle>
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
              <ArticleDate darkmode={dayNightStore.btnIsActive}>
                {node.frontmatter.date}
              </ArticleDate>
            </ContentTitle>
          ))}
      </Content>
    </Layout>
  ))
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            rawData: date
            path
          }
        }
      }
    }
  }
`
