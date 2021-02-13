---
title: "React Router History: push와 replace의 차이점"
date: "2021-02-07"
draft: false
path: "/blog/router-replace"
tags: ["router", "replace", "push"]
---

### Push

보통 React router를 이용해서 다른 페이지로 넘어가고자 할 때 `history push`를 사용한다. 

```jsx
import React from 'react';

function Home({ history }) {
  return (
    <div>
      <button onClick={() => history.push('/about')}>about으로 이동 </button>
    </div>
  )
};

export default Home;
```
<br/>

공식문서에서 Push에 대한 설명은 다음과 같다

> Pushes a new entry onto the history stack

history stack에 새로운 엔트리를 쌓는다고 말하고 있다. 즉 `history push` 를 이용해서 `Home > about > login > about` 을 이동한다면  
이동순서 그대로 `Home > about > login > about` 이 history stack에 쌓이게 된다. 그래서 유저가 마지막인 about페이지에서 뒤로가기 버튼을 누르면 login 페이지로 되돌아 가게 되고 
그 다음에는 다시 about 페이지 그 다음엔 Home으로 돌아가게 될 것이다. 
<br/><br/><br/>

### Replace

그러나 Replace는 조금 다르다. 공식문서의 설명을 보자.

> Replaces the current entry on the history stack

 새로운 엔트리를 쌓는 것이 아니라 **현재의 history stack을 변경**한다고 말하고 있다.  
 사실 글로 읽어서는 잘 감이 오지 않는다. 예시를 통해 이해해 보면 `Home > about > login > about`으로 이동한다고 할 때 `login`에서 `replace('/about')`로 이동한다면 `Home > about > about`이 쌓인다.
<br/><br/><br/>

 ### 그렇다면 Replace는 언제 사용하는 것이 좋을까?
 
 > 잘못된 URL이나 올바르지 못한 접근을 시도 했을 때 강제로 redirect 할 때 사용하는 것이 좋다.

나의 경우에는 이미 계약서에 서명을 전송한 유저가 뒤로 가기 버튼을 통해 다시 서명작성 페이지로 넘어가는 것을 막기 위해서 replace를 사용했다. 로그인 한 유저가 다시 /login으로 접근하려고 하는 경우에도 비슷하다. replace를 사용해야 잘못된 접근이 히스토리에 남지 않기 때문이다.
<br/><br/><br/>

### 정리
* history는 스택으로 쌓인다.
* Push는 history stack에 제일 위에 쌓는 것이고, Replace는 제일 위의 원소를 지금 넣을 원소로 바꾼다.
* Replace는 잘못된 URL이나 올바르지 못한 접근을 시도했을 때 강제로 redirect 할 때 사용 하는 것이 좋다.
 