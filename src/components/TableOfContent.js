import React, { Fragment } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { useActiveHash } from "../hooks/useActiveHash"

const ContentsNav = styled.nav`
  margin: 300px 0 0 20px;
  border-left: 2px solid rgb(233, 236, 239);
  width: 240px;
  height: fit-content;
  position: sticky;
  top: 112px;
  bottom: 1px;
  right: 1px;
  left: 1px;
  display: inline-block;

  @media only screen and (max-width: 1300px) {
    display: none;
  }
`

const TableOfContentsUl = styled.ul`
  list-style-type: none;
  margin: 0 0 10px 0.5rem;
  padding: 0;
  padding-inline-start: 0.5rem;
  margin-block-start: 0.3rem;
  margin-block-end: 0.3rem;
`
const ContentLi = styled.li`
  line-height: 1.5;
  font-size: 14px;
  margin: 4px 0;
`

const ContentLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${(props) => props.isActive ? "rgb(33, 37, 41)" : "rgb(134, 142, 150)"};
  line-height: 1.5;
  transition: all 0.125s ease-in 0s;
  transform : ${(props) => props.isActive ? "scale(1.05)" : null};

  &:hover {
    display: block;
    transition: all 0.125s ease-in 0s;
    color: rgb(33, 37, 41);
    transform: scale(1.05);
  }
`

const getHeadingIds = (toc, traverseFullDepth = true, recursionDepth = 1) => {
  const idList = []
  const hashToId = (str) => str.slice(1)

  if (toc) {
    for (const item of toc) {
      if (item.url) {
        idList.push(hashToId(item.url))
      }
      if (item.items && traverseFullDepth && recursionDepth) {
        idList.push(...getHeadingIds(item.items, true, recursionDepth + 1))
      }
    }
  }
  return idList
}

const TableOfContent = ({ items }) => {
  const activeHash = useActiveHash(getHeadingIds(items, true))

  const createItems = (items, activeHash) => {
    return (
      items &&
      items.map((item, index) => {
        const isActive = item.url === `#${activeHash}`
        return (
          <ContentLi key={index}>
             {item.url && (
              <ContentLink to={item.url} isActive={isActive}>
                {item.title}
              </ContentLink>
            )}
            {item.items && (
              <TableOfContentsUl>
                {createItems(item.items, activeHash)}
              </TableOfContentsUl>
            )}
          </ContentLi>
        )
      })
    )
  }

  const renderTOC = () => {
    if (items) {
      return (
        <ContentsNav>
          <TableOfContentsUl>
            {createItems(items, activeHash)}
          </TableOfContentsUl>
        </ContentsNav>
      )
    }
  }

  return <Fragment>{renderTOC()}</Fragment>
}

export default TableOfContent
