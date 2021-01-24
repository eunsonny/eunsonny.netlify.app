import { Link } from "gatsby"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"
import useStore from "../../useStore"
import { useObserver } from "mobx-react"
import { css } from "@emotion/core"

const Content = styled.div`
  width: 100%;
`
const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => (props.darkmode ? "#FFFFFF" : "#282828")};
`
const ToggleWrap = styled.div`
  position: relative;
`
const ToggleSwitch = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 54px;
  height: 34px;
  &:checked + ${SwitchLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      margin-left: 25px;
      transition: 0.2s;
    }
  }
`
const SwitchLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 54px;
  height: 34px;
  border-radius: 25px;
  background-color: #bebebe;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    margin: 4px;
    background: #ffffff;
    background-image: url(${(props) => props.imgUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`
const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid
    ${(props) => (props.darkmode ? "#2D3748" : "#CFCEBD")};
`
const LeftLinkArea = styled.div``

const NavLink = styled(Link)`
  color: ${(props) => (props.darkmode ? "#7F8EA3" : "#54543A")};
  margin-right: 1rem;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
  position: relative;

  &:hover {
    text-decoration:underline;
    color: ${(props) => (props.darkmode ? "#7F8EA3" : "#54543A")};
  }
  /* ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  } */
`

const GitHubLink = styled.a`
  color: ${(props) => (props.darkmode ? "#7F8EA3" : "#54543A")};
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
  position: relative;

  &:hover {
    text-decoration:underline;
    color: ${(props) => (props.darkmode ? "#7F8EA3" : "#54543A")};
  }
  /* ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  } */
`
const HomeLink = styled(Link)`
  font-weight: 500;
  font-size: 28px;
  margin-left: 0;
  text-decoration: none;
  color: ${(props) => (props.darkmode ? "#FFFFFF" : "#282828")};
`
const SiteHeader = styled.header`
  background: transparent;
  background-color: ${(props) => (props.isActive ? "#1A202C" : "#ffffff")};
  display: flex;
  align-content: center;
  justify-content: center;
  max-width: 1024px;
  margin: 0 auto 4rem;
  padding: 1rem 1.0875rem 1rem;
  /* padding-top: 0; */
`

const Header = ({ siteTitle }) => {
  const { dayNightStore } = useStore()

  const setDarkMode = (e) => {
    dayNightStore.btnAct()
  }

  return useObserver(() => (
    <SiteHeader isActive={dayNightStore.btnIsActive}>
      <Content>
        <HeaderTop>
          <HomeLink darkmode={dayNightStore.btnIsActive} to="/">
            {siteTitle}
          </HomeLink>
          <ToggleWrap>
            <ToggleSwitch
              type="checkbox"
              id="switch"
              onChange={setDarkMode}
              checked={dayNightStore.btnIsActive}
            ></ToggleSwitch>
            <SwitchLabel
              htmlFor="switch"
              data-name="darkMode"
              darkmode={dayNightStore.btnIsActive}
              imgUrl={
                dayNightStore.btnIsActive ? "icons/night.png" : "icons/sun.png"
              }
            ></SwitchLabel>
          </ToggleWrap>
        </HeaderTop>
        <HeaderBottom darkmode={dayNightStore.btnIsActive}>
          <LeftLinkArea>
            <NavLink
              to="/blog"
              darkmode={dayNightStore.btnIsActive}
            >
              Blog
            </NavLink>
            <NavLink to="/about" darkmode={dayNightStore.btnIsActive}>
              About
            </NavLink>
          </LeftLinkArea>
          <GitHubLink
            href="https://github.com/eunsonny"
            darkmode={dayNightStore.btnIsActive}
          >
            GitHub
          </GitHubLink>
        </HeaderBottom>
      </Content>
    </SiteHeader>
  ))
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
