import React from "react"
import styled from "@emotion/styled"

const SiteFooter = styled.div`
  background: transparent;
  background-color: ${(props) => props.darkmode ? "#1A202C" : "#FFFFFF"};
  max-width: 1024px;
  margin-top: 8rem;
  padding: 1rem 1.0875rem 1rem;
  border-top: 1px solid ${(props) => (props.darkmode ? '#2D3748' : '#CFCEBD')};
  color: ${(props) => (props.darkmode ? '#7F8EA3' : '#54543A')};
`

const Footer = ({ darkmode }) => (
  <SiteFooter darkmode={darkmode}>
    <p>
      © {new Date().getFullYear()}, Built with Gatsby
      {` `}
    </p>
  </SiteFooter>
)

export default Footer
