const React = require('react');
const {useState, useRef} = React;
const TryHooks = require('./TryHooks')

//겹치지 않는 숫자 네 개를 랜덤하게 뽑는 함수
function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i=0; i<4; i+=1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        array.push(chosen)
    }
    return array;
}

const NumberBaseBallHooks = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    //함수를 넣을 때는 이렇게... 이렇게 해야 처음 값이 설정되고 리랜더링 될때 쓸데없이 실행되지 않는다.
    const [answer, setAnswer] = useState(getNumbers);
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries)=>{
                return [...prevTries, {try: value, result: '홈런!'}]
            });
            alert('게임을 다시 시작합니다!');
            setAnswer(getNumbers());
            setValue('');
            setTries([]);
        } else {
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다.`)
                alert('게임을 다시 시작합니다!');
                setAnswer(getNumbers());
                setValue('');
                setTries([]);
            }else{
                for (let i=0; i<4; i+=1){
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    }else if(answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries)=>{
                    return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}]
                });
            }
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v,i)=>{
                        return (
                            <TryHooks key={i} tryInfo={v}/>
                        );
                    })}
                </ul>
                <button>입력</button>
            </form>
        </>
    );
}


module.exports = NumberBaseBallHooks;