
** 인증서 설정 **
npm config set cafile D:\dev\jdk1.8.0_111\bin\somansa.cer

** webpack, babel 설정 **

npm init
npm i react react-dom
npm i -D webpack webpack-cli @babel/core @babel/preset-env @babel/preset-react babel-loader react-refresh @pmmmwh/react-refresh-webpack-plugin webpack-dev-server

웹팩
npm i -D webpack webpack-cli

바벨
npm i -D @babel/core
우리가 사용하는 브라우저 문법에 맞게 바꿔준다.
npm i -D @babel/preset-env
react가 jsx를 지원하도록
npm i -D @babel/preset-react
babel과 webpack을 연결해준다
npm i -D babel-loader

** webpack 핫 리로딩 **
코드 수정할 때마다 webpack 빌드할 수는 없으니...
npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin
npm i -D webpack-dev-server

** webpack 설정 **
webpack.config.js

** package.json 설정 **
명령어 추가
"dev": "webpack serve --env development"

ㅇ 컴포넌트 첫글자는 대문자로.

ㅇ return ()에 들어가는 엘리먼트는 부모-자식 관계여야 한다.

ㅇ 반복문으로 만드는 태그에는 key를 붙여줘야한다. 고유한 값으로.
근데 그냥 map으로 생성되는 index를 key로 잡으면?
고유한 값이니 될것이라고 생각하지만
이건 순서가 바뀌거나 하면 달라질 수 있는 값이다.
key로 요소를 삭제할지 수정할지 판단하기 때문에 이렇게 하면 성능이 떨어지게 된다.

반복문에 쓰이는 엘리먼트들을 컴포넌트로 분리할 수 있다.
여기서 값을 넘겨주는 경우가 생길텐데
이 때 넘겨주는 값을 props라 한다.

근데 부모에서 자식으로 또 그의 자식 또 그의 자식 이렇게 props가 전달되는 경우도 있다.
이 경우 너무 복잡해지는데
이런걸 해결하려고 생긴게 컨텍스트,리덕스 같은거다.

ㅇ 클래스 안에서 화살표 함수만 쓰는 이유
함수로 만들면 this.state 같이 this를 쓸 수 없다.
꼭 그렇게 쓰고 싶다면 constructor 안에 this.onSubmitForm.bind(this);
이런식으로 this를 전달해줘야 한다.

ㅇ state에서의 arrays
const array1 = [];
array1 === array1 은 당연히 같다.
근데 array1.push(1);
이렇게 한 후는? 그래도 역시 같다.
그러니 const array2 = [...array1];
이렇게 배열복사를 해서 새로 만들어줘야 다른 배열로 react가 인식한다.

ㅇ Lazy init
함수를 넣을 때는 이렇게... 이렇게 해야 처음 값이 설정되고 리랜더링 될때 쓸데없이 실행되지 않는다.
getNumbers() 로 해도 정상작동하긴 하지만, 쓸데없이 실행되는게 문제이다.
const [answer, setAnswer] = useState(getNumbers);

ㅇ 개발툴 사용
확장프로그램에서 Components 설정버튼 중 highlight updates when components render에 체크해주면
렌더링이 발생할때 highlight 표시가 된다.

ㅇ shouldComponentUpdate
state값이 그대로 인데도... setState를 호출하는 순간
무조건 리랜더링이 된다.
이를 제어하기 위해 쓰는 함수

ㅇ pureComponent
shouldComponentUpdate를 알아서 해줌
class Test extends PureComponent

ㅇ 객체사용
state에 객체를 넣으면 바뀌었는지 아닌지 알아차리기 어렵다.
최대한 간단하게!
[] 배열만 쓰던가. [{}] 이렇게 복잡한거 x

ㅇ 부모컴포넌트의 리렌더링
부모가 리랜더링 되면 자식도 그렇게 된다.
pureComponent는 props가 변경되었는지도 감지해준다.

ㅇ 함수 컴포넌트
함수 컴포넌트는 어떻게?
const Try = memo( ({tryInfo}) => {
});
// memo를 적용시키면 컴포넌트명이 이상하게 바뀌어서 아래 같이 처리.
Try.displayName='Try';

ㅇ props 변경
props는 자식에서 변경하면 안된다. 부모에서 변경해야한다.
근데 꼭 바꿔야 하는 경우?
자식의 state로 만들고 바꿔준다.
const [result, setResult] = useState(tryInfo.result);
왜? 자식이 부모 props를 바꾸면 부모가 바뀌어버린다.
자식이 부모를 바꿀수 있게 만들면 추적이 어렵고 꼬여버린다...

ㅇ componentDidMount
render 처음 실행될 때. 리렌더링 될 때는 실행되지 않는다.

ㅇ componentWillUnmount
컴포넌트가 제거되기 직전

ㅇ componentDidUpdate
리렌더링 후

// 라이프사이클
// 클래스의 경우 -> construct -> render -> ref -> componentDidMount -> componentDidUpdate -> componentWillUnmount

ㅇ 고차함수
onClick = {()=>onClickBtn(1)}
onClickBtn = (num) => (e) =>
이런식으로 만들면 아래와 같이 사용 가능하다.
onClick = {onClickBtn(1)}

ㅇ memo 반복되는 요소 최적화

ㅇ useMemo
값을 기억
리렌더링이 되어도 값이 변하지 않아야 할 때

ㅇ useCallback
함수를 기억
리렌더링이 되어도 함수를 새로 생성하기 싫을때
근데 useCallback에서 winNumbers같은 스테이트 값을 불러오면 항상 같은 값을 보여준다.
값이 기억되어버림...
그래서 마지막 [winNumbers] 이런식으로 변경감지를 해줘야 한다.
자식한테 함수를 전달해줄때! 이때는 쓰는게 좋다. 부모때문에 쓸데없이 리렌더링 안되도록

ㅇ useReducer
왜 사용할까?
useState로 처리하기에 너무 복잡해지는 경우 사용하는 것 같다.


npm i react-router react-router-dom

import {BrowserRouter, HashRouter} from 'react-router-dom';

<BrowserRouter>
    <Route path="/number-baseball" component={NumberBaseball}></Route>
    <Route path="/rock-scissors-paper" component={RSP}></Route>
</BrowserRouter>

눈속임으로 만들어낸 링크기 때문에... a태그 같은거로 하면 에러가 난다.
<Link href="/number-baseball"></>

props전달할때는 render={(props)=>GameMatcher {...props}/>}

이제 버전 router 6로 버전업되었다.
<Routes>
    <Route></Route>
</Routes>

동적 path
path="/game/:name"
 꺼내오기 : this.props.match.params.name

ㅇ redux
npm -i redux

react-redux의 Provider로 감싸주기
<Provider store={store}></Provider>

const user = useSelector((state)=>state.user.data);
const dispatch = useDispatch();

dispatch(logIn({
    id: 'inhwan',
    password: 'zzzz'
}));

redux-devtools 설치...
확장프로그램에 설치하고
npm으로 프로젝트에도 설치해줘야함

npm i -d redux-devtools-extension

compose부분을 composeWithDevTools로 대체하면 사용간으

ㅇ process.env.NODE_ENV === 'production'
이게 개발환경인지 운영환경인지 구분할때 쓰는거라는데
유용할 것 같다.

ㅇ immer
return {
    ...prevState,
    data: null
}
불변성을 지키기 위해 너무 번거롭다.

const produce = require('immer');

return produce(prevState, (draft) => {
    switch(action.type) {
        case 'LOG_IN_REQUEST':
            draft.data = null;
            break;
    }
});


ㅇ redux-toolkit
Thunk, immer 이런거 안써도 된다고 한다.
saga도 필요없다고 하네














