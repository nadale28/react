const React = require('react');
const {useState, useRef} = React;

const GuGuDan = () => {

    const [first, setFirst] = useState(Math.ceil(Math.random()*9));
    const [second, setSecond] = useState(Math.ceil(Math.random()*9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second) {
            /*setResult((prevResult)=>{
                return '정답' + value
            });*/
            setResult('정답' + value);
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
            setValue('');
            inputRef.current.focus();
        }else{
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }
    console.log('렌더링')
    return (
        <div>
            <div>
                {first} 곱하기 {second} 는?
            </div>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="number" value={value} onChange={(e)=>{setValue(e.target.value)}}/>
                <button>입력</button>
            </form>
            <div>{result}</div>
        </div>
    );
}

module.exports = GuGuDan;