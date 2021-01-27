import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"
import useStore from "../../useStore"
import { useObserver } from "mobx-react"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"

import { MDXProvider } from "gatsby-plugin-mdx";

const TagsWrap = styled.div`
  height: 78vh;
`
const Tags = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`
const TagsTitle = styled.h1`
  color: ${(props) => (props.darkmode ? "#ffffff" : "#282828")};
`
const StyledTag = styled(Link)`
  margin-bottom: 1.4rem;
  font-size: 1.5rem;
  color: #2d3748;
  color: ${(props) => (props.darkmode ? "#CBD5E0" : "#2D3748")};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${(props) => (props.darkmode ? "#CBD5E0" : "#2D3748")};
  }
`

const TagsPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const { dayNightStore } = useStore()

  return useObserver(() => (
    <Layout darkmode={dayNightStore.btnIsActive}>
      <Helmet title={title} />
      <TagsWrap>
        <TagsTitle darkmode={dayNightStore.btnIsActive}>Tags</TagsTitle>
        <Tags>
          {group.map((tag) => (
            <StyledTag
              key={tag.fieldValue}
              darkmode={dayNightStore.btnIsActive}
              to={`/tags/${kebabCase(tag.fieldValue)}`}
            >
              {tag.fieldValue} ({tag.totalCount})
            </StyledTag>
          ))}
        </Tags>
      </TagsWrap>
    </Layout>
  ))
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
