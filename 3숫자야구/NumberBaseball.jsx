const React = require('react');
const {Component} = require("react");
const {useState, useRef} = React;
const Try = require('./Try')

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

class NumberBaseBall extends Component {

    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState((prevState)=>{
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, {try: this.state.value, result: '홈런!'}],
                }
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else {
            const answerArray = this.state.value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다.`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            }else{
                for (let i=0; i<4; i+=1){
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    }else if(this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState)=>{
                    return {
                        tries: [...prevState.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼`}]
                    }
                });
            }
        }
    }

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    // 반복문에서의 key
    //
    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                    <div>시도: {this.state.tries.length}</div>
                    <ul>
                        {this.state.tries.map((v,i)=>{
                            return (
                                <Try  key={i} tryInfo={v}/>
                            );
                        })}
                    </ul>
                    <button>입력2</button>
                </form>
            </>
        );
    }
}

module.exports = NumberBaseBall;