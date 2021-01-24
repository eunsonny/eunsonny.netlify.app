import React from "react"

import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useStore from "../../useStore";
import { useObserver } from "mobx-react";

const IndexPage = () => {
  const { dayNightStore } = useStore();

  return useObserver(() => (
  <Layout darkmode={dayNightStore.btnIsActive}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <LandingBio darkmode={dayNightStore.btnIsActive}/>
  </Layout>
  ))
}

export default IndexPage
