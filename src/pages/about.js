import React from "react";
import useStore from "../../useStore"
import { useObserver } from "mobx-react"
import styled from "@emotion/styled"

import Layout from "../components/layout"

const AboutPage = () => {
  const { dayNightStore } = useStore();

  const AboutTitle = styled.h1`
    color: ${(props) => props.darkmode ? '#ffffff' : '#282828'};
  `

  const AboutContent = styled.p`
    color: ${(props) => (props.darkmode ? "#CBD5E0" : "#282828")};
  `

  return useObserver(() => (
    <Layout darkmode={dayNightStore.btnIsActive}>
      <AboutTitle darkmode={dayNightStore.btnIsActive}>About</AboutTitle>
      <AboutContent darkmode={dayNightStore.btnIsActive}>안녕하세요</AboutContent>
    </Layout>
  ))
}

export default AboutPage