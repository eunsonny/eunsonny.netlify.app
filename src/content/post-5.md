---
title: "writeHead method"
date: "2021-02-03"
draft: false
path: "/blog/writeHead-method"
tags: ["NodeJs", "WIL"]
---

아주 아주 간단하게 알아본다면,
Node.js는 'http' 개체라는 것에서 'http.Server' 개체를 만들어 서버를 구축한다. 또한 요청과 응답을 다루는 'request', 'response' 개체에서 송수신을 수행한다.
그 과정은 아래의 코드와 같은 형태이다.

```js
var http = require('http');

var server = http.createServer();
server.on('request', doRequest);
server.listen(process.env.PORT, process.env.IP);
console.log('Server running!');

// 요청 처리
function doRequest(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World\n');
  res.end();
}
```

### 1. http 개체 로드

```js
var http = require('http');
```

가장 먼저 해야 하는 것은 필요한 라이브러리들의 로드이다. 'require' 함수를 사용한다.  
인수에 가져올 개체 이름을 지정하면 해당 개체라 로드되어 반환되고 이것을 변수에 대입하여 사용한다.  
여기서는 'http'라는 개체를 http라는 변수에 대입하여 로드하고 있으며 이것은 말 그대로 HTTP의 각종 기능을 요약한 것이다. 여기에서 서버 개체를 만든다.

### 2. Server 개체 생성

```js
var server = http.createServer();
```

http 오브젝트의 'createServer' 메서드를 호출하여 http.Server 개체를 만든다. 이것이 Node.js의 '서버'가 되는 부분이다.  
이 개체를 준비하고 필요한 설정을 하여 서버로 실행한다.

### 요청 처리를 위한 함수

그렇다면 서버 단에서 클라이언트의 요청을 받았을 때 처리는 어떻게 설정하는 것일까?  
위의 예시 코드에서는 'doRequest'라는 함수를 정의해 두고, 이를 on 메서드에서 'request' 이벤트에 조합했다.  
즉 클라이언트의 요청(request)를 받았을 때 doRequest 함수가 실행되며, 여기에서 수행하는 작업들이 클라이언트의 요청을 처리하기 위한 것들이라고 할 수 있다.

이 함수는 아래와 같은 형태로 정의 되어 있다.  

```js
function 함수명 (req, res) {
  // 필요한 처리
}
```

인수로는 두 가지가 전달되는데 바로 다음과 같다.  

**Request**  
첫번째 인수는 'request' 객체가 전달된다. 이는 http.incomingMessage에서 클라이언트의 요청에 대한 기능을 정리하고 있다.  

**Response**  
두번째 인수는 'response' 객체가 전달된다. 이는 http.serverResponse에서 서버에서 클라이언트로 리턴되는 응답에 대한 기능을 정리하고 있다.  

이 request와 response를 사용하여 요청을 받았을 때의 처리를 만든다.

### 헤더 정보 내보내기

바로 여기에서 이 글을 쓰는 시발점이 되었던 키워드! writeHead 메서드!가 나온다.

```js
res.writeHead(200, {'Content-Type': 'text/plain'});
```

writeHead는 response 객체에 헤더 정보를 작성해서 내보낼 때 사용되는 메서드이다.  
첫번째 인자는 status code를 지정하고 두번째 인수에서 헤더 정보를 정의한다.  

여기에서는 `{'Content-Type': 'text/plain'}`을 담고 있다.  
이를 통해서 `Content-Type`이라는 헤더 정보에 `text/plain`의 값을 갖고 있는 것을 알 수 있다.  
이것은 응답으로 내보내는 컨텐츠의 종류를 나타내는 헤더 정보로, **'이 컨텐츠는 표준 텍스트이다.'**라는 것이 클라이언트에 전달된다.  

### 컨텐츠 내보내기

```js
res.write('Hello world\n');
```

HTTP에는 헤더 정보 다음에 바디 부분의 컨텐츠를 작성하는데, 이 때 사용되는 메서드가 `write`이다. 인수에 지정한 값이 바디 부분의 컨텐츠로 작성된다.  
이 `write` 메서드는 여러번 호출 될 수 있다. 이것을 호출하여 작성하더라도, 아직 컨텐츠는 종료되지 않으므로 계속해서 `write`을 추가 작성 할 수 있다.  

### 컨텐츠 출력 완료 (응답종료)

```js
res.end();
```

내용 내보내기가 완료되면 마지막으로 response의 `end`를 호출하여 컨텐츠 출력을 완료한다.  
여기에서는 단지 `end`를 호출하고 있을 뿐이지만, 인수로 내보낼 내용의 값을 지정할 수도 있다. 그러면 인수의 값을 쓴 후에 출력을 완료한다.  

이로 `end`로 인해 응답 처리는 종료되고, 그 요청의 처리가 완료된다. `writeHead`, `write`, `end` 3개의 메서드가 있으면 클라이언트 요청에 대한 응답(response) 내용을 모두 쓸 수 있다.  



