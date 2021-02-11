import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

const Container = styled.div`
  /* text-align: center; */
`
const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: row;
  height: 78vh;
`
const SubTitle = styled.p`
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`
const NameHeader = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0;
  color: ${(props) => (props.darkmode ? "#FFFFFF" : "#282828")};
`
const Description = styled.p`
  font-size: 1.4rem;
  line-height: 1.625;
  color: ${(props) => (props.darkmode ? "#CBD5E0" : "#282828")};
`
const HighLight = styled.span`
  border-radius: 1em 0 1em 0;
`

const LandingBio = ({ darkmode }) => (
  <StaticQuery
    query={graphql`
      query LandingSiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={(data) => (
      <OuterContainer>
        <Container>
          <NameHeader darkmode={darkmode}>
            {data.site.siteMetadata.title}
          </NameHeader>
          <br></br>
          {/* <Description>{data.site.siteMetadata.subtitle}</Description> */}
          {/* <SubTitle>Hi! everyone</SubTitle> */}
          {/* <span>Hi! everyone</span> */}
          <Description darkmode={darkmode}>
            {/* I'm Eunsun and  */}
            I'm a Front-end Developer - currently working hard to create a{" "}
            <HighLight
              darkmode={darkmode}
              css={
                darkmode
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
              positive stimulus in people's daily lives {" "}
            </HighLight>
             through computer language. This blog contains things I learn, feel,
            and want to share as I make those efforts.
          </Description>
        </Container>
      </OuterContainer>
    )}
  />
)

NameHeader.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

NameHeader.defaultProps = {
  siteTitle: ``,
  subtitle: ``,
}

export default LandingBio
