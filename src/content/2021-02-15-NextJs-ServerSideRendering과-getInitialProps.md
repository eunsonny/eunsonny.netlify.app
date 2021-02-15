---
title: "NextJS: ServerSideRendering과 getInitialProps"
date: "2021-02-15"
draft: false
path: "/blog/NextJS-ServerSideRendering과-getInitialProps"
tags: ["NextJS", "getInitialProps", "SSR"]
description: 
---

NextJS를 이용해 프로젝트도 진행해보고 실무에서도 Next를 사용하고 있지만 개인적으로는 Next를 제대로 사용해보진 못한것 같다. 여기서 **'제대로'** 사용하고 있지 못한다는 의미는 핵심 기능인 SSR을 내가 적극적으로 사용해 보지 못했기 때문이다. 따라서 이번 기회를 통해 
>**NextJS의 구동방식**(_특히 SSR을 어떻게 가능하게 하는지에 대해_ )에 대해  
자세히 알아보고 더 효과적으로 활용할 수 있도록 할 것이다.

<br/><br/>

## SSR(Server Side Rendering)과 getInitialProps

웹 페이지는 각 페이지마다 사전에 불러와야 할 데이터들이 있다. Data Fectching이라고도 하는 이 로직은 CSR(Client Side Rendering)에서는 react 로직에 따라 componentDidMount or useEffect로 컴포넌트가 마운트 되고 나서 하는 경우가 많다. 완성된 view를 만들기 위해서는 redux나 mobx, 또는 cotnext API 등을 사용한 store에서 해당 state를 받아와야 하고, 해당 state를 업데이트하기 위해 rendering 이후 componentDidMount 또는 useEffect를 통해서 re-rendering 작업 이후 초기 값을 setting해 준 것이다. 

하지만 SSR은 re-rendering이 아니라, 서버에서 이 과정을 미리 처리하여 완성된 html을 한 번에 rendering하는 것이 목적이다. 이 것을 가능하게 해주는 것이 getIntitialProps이다. 
(사실 Data Fetching에만 getInitialProps를 사용할 수 있는 것은 아니다.)

Next 9.3 버전에서는 getInitialProps 를 대신에 getStaticProps, getStaticPaths, getServerSideProps 를 사용하게 된다고 한다. 각각의 용법은 다르지만, 서버에서 페이지의 연산을 미리 한다는 점은 동일하므로 따로 언급하지는 않겠다.
<br/><br/>

### getInitialProps의 사용법

목적에 따라서 사용법이 다르다. 해당 페이지에만 미리 데이터를 불러오는 로직을 넣을 것인지, 혹은 전체 페이지에 대해 동일한 Data Fetching을 할 것인지를 정해야 한다. 이는 기획에 따라 달라지는 부분이다. 공통된 Data Fetching이 필요하다면 _app.js에 getInitialProps를 붙이면 된다. 페이지마다 다른 Data가 필요하다면 페이지마다 getInitialProps를 붙이면 된다. 먼저 각 페이지마다 getInitialProps를 붙이는 방법은 다음과 같다.

<<<< 코드 >>>>

### getInitialProps 사용시 주의할 점
* getInitialProps 내부 로직은 서버에서 실행된다. 따라서 Client에서만 가능한 로직은 피해야 한다. (Window, document 등) (이건 이해가 잘 안됨)
* 한 페이지를 로드할 때, 하나의 getInitialProps 로직만 실행된다. 예를 들어 _app.js에 getInitialProps를 달아서 사용한다면 그 하부 페이지의 getInitialProps는 실행되지 않는다. 다만, 다음과 같이 커스터마이징을 하면, 최종 결과를 pageProps에 담을 수 있다.


### Context object
Getinitialprops는 기본적으로 context(cox)라는 객체를 인자로 받는다. 
context(ctx)의 기본 구조는 다음과 같다. 
* pathname - 현재 pathname /user?type=normal page 접속 시에는 /user
* query - 현재 query를 object형태로 출력 /user?type=normal page 접속 시에는 {type: 'normal'}
* asPath - 전체 path /user?type=normal page 접속 시에는 /user?type=normal
* req - HTTP request object (server only)
* res - HTTP response object (server only)
* err - Error object if any error is encountered during the rendering


여기서 간과하지 말아야 할 점은 getinitialprops는 서버사이드에서 만! 실행되는 것이 아니라는 점이다. 
getInitialProps는 서버(Nodejs환경)와 클라이언트(Browser)에서 모두 호출되지만, 동시에 호출되지는 않는다. 다시말해, route로 접근할 때 새로고침이나 직접 URL을 입력하는 방식의 Server Side Rendering으로 접근하면 서버에서, Next.js에서 제공하는 Link 컴포넌트를 통해 접근한다면 클라이언트에서 호출된다.

이러한 특징 때문에 getInitialProps는 page directory 안에 선언한 컴포넌트에서 호출해야한다. 해당 컴포넌트들의 자식 컴포넌트에서는 사용할 수 없다.

### ServerSide Cycle
1. Next Server가 GET 요청을 받는다.
2. 요청에 맞는 Page를 찾는다.
3. _app.js의 getInitialProps가 있다면 실행한다.
4. Page Component의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
5. _document.js의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
6. 모든 props들을 구성하고, _app.js > page Component 순서로 rendering.
7. 모든 Content를 구성하고 _document.js를 실행하여 html 형태로 출력한다.
8. 
위의 과정으로 server logic이 실행이 된다. 이 순서가 가끔 헷갈려서 서버 상에 로직이 생각과 다르게 진행되는 경우가 많다. 브라우저 console에도 안찍히는 로직이므로, 디버깅이 어렵다는 단점도 있다.

클라이언트 사이드 일때!!!