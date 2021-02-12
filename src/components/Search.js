import React, { useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact"
import Tags from "../components/Tags";

import useStore from "../../useStore"
import { useObserver } from "mobx-react"

const MarkerHeader = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${(props) => (props.darkmode ? "#CBD5E0" : "#282828")};
  display: inline;
  border-radius: 1em 0 1em 0;
`
const SearchInputWrap = styled.div`
  padding: 3.5rem 0 0 0;
`
const SearchInput = styled.input`
  border: none;
  border-bottom: 1px solid grey;

  &:focus {
    outline: none;
    border-bottom: 1px solid grey;
  }
`

const SearchArticleWrap = styled.div`
  /* border: 1px solid red; */
  width: 860px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  padding: 10px;
  position: absolute;
  background-color: white;
  height: fit-content;
  max-height: 20vh;
  overflow-y: scroll;
`

const SearchedArticle = styled.div`
  padding: 4px 0 10px 0;
`

const ContentInfo = styled.div`
  line-height: 20px;
`
const ArticleDate = styled.h5`
  font-weight: 400;
  display: inline;
  color: ${(props) => (props.darkmode ? "#7F8EA3" : "#606060")};
`

const Search = ({ data }) => {
  const { dayNightStore } = useStore()
  const emptyQuery = ""

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = (event) => {
    const query = event.target.value
    // const { data } = props
    const posts = data.allMdx.edges || []

    const filteredData = posts.filter((post) => {
      const { description, title, tags } = post.node.frontmatter
      return (
        (description &&
          description.toLowerCase().includes(query.toLowerCase())) ||
        (title && title.toLowerCase().includes(query.toLowerCase())) ||
        (tags && tags.join("").toLowerCase().includes(query))
      )
    })

    setState({
      query,
      filteredData,
    })
  }

  const renderSearchResults = () => {
    const { query, filteredData } = state
    const hasSearchResults = filteredData && query !== emptyQuery
    const posts = hasSearchResults ? filteredData : []
    return (
      <SearchArticleWrap>
        {
          posts &&
          posts.map(({ node }) => {
            const { excerpt } = node
            const { slug } = node.fields
            const { title, date, description, path, tags } = node.frontmatter
            return (
              <SearchedArticle key={slug}>
                <Link
                  to={path}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <MarkerHeader
                    darkmode={dayNightStore.btnIsActive}
                    // css={
                    //   dayNightStore.btnIsActive
                    //     ? css`
                    //         background-image: linear-gradient(
                    //           -100deg,
                    //           rgba(71, 235, 179, 0.15),
                    //           rgba(71, 235, 179, 0.8) 100%,
                    //           rgba(71, 235, 179, 0.25)
                    //         );
                    //       `
                    //     : css`
                    //         background-image: linear-gradient(
                    //           -100deg,
                    //           rgba(255, 250, 150, 0.15),
                    //           rgba(255, 250, 150, 0.8) 100%,
                    //           rgba(255, 250, 150, 0.25)
                    //         );
                    //       `
                    // }
                  >
                    {title}
                  </MarkerHeader>
                </Link>
                <ContentInfo>
                  <ArticleDate darkmode={dayNightStore.btnIsActive}>
                    {date}
                  </ArticleDate>
                  {tags && (
                    <span
                      css={css`
                        color: #606060;
                      `}
                    >
                      {" "}
                      &ndash;{" "}
                    </span>
                  )}
                <Tags darkmode={dayNightStore.btnIsActive} tags={tags}></Tags>
                </ContentInfo>
              </SearchedArticle>
            )
          })
        }
      </SearchArticleWrap>
      // posts &&
      // posts.map(({ node }) => {
      //   const { excerpt } = node
      //   const { slug } = node.fields
      //   const { title, date, description, path } = node.frontmatter
      //   return (
      //     <SearchedArticle key={slug}>
      //       <Link
      //         to={path}
      //         css={css`
      //           text-decoration: none;
      //           color: inherit;
      //         `}
      //       >
      //         <MarkerHeader
      //           darkmode={dayNightStore.btnIsActive}
      //           css={
      //             dayNightStore.btnIsActive
      //               ? css`
      //                   background-image: linear-gradient(
      //                     -100deg,
      //                     rgba(71, 235, 179, 0.15),
      //                     rgba(71, 235, 179, 0.8) 100%,
      //                     rgba(71, 235, 179, 0.25)
      //                   );
      //                 `
      //               : css`
      //                   background-image: linear-gradient(
      //                     -100deg,
      //                     rgba(255, 250, 150, 0.15),
      //                     rgba(255, 250, 150, 0.8) 100%,
      //                     rgba(255, 250, 150, 0.25)
      //                   );
      //                 `
      //           }
      //         >
      //           {title}
      //         </MarkerHeader>
      //       </Link>
      //     </SearchedArticle>
      //   )
      // })
    )
  }

  return useObserver(() => (
    <SearchInputWrap>
      {/* <MDBCol md="12">
        <MDBFormInline className="md-form">
          <MDBIcon icon="search" /> */}
      <SearchInput
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={handleInputChange}
      />
      {/* </MDBFormInline>
      </MDBCol> */}
      {state.query && <div>{renderSearchResults()}</div>}
    </SearchInputWrap>
  ))
}

export default (props) => (
  <StaticQuery
    query={graphql`
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
                description
              }
              fields {
                slug
              }
              excerpt(truncate: true)
            }
          }
        }
      }
    `}
    render={(data) => <Search data={data} {...props} />}
  />
)
