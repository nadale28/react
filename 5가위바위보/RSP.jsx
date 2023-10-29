import React, {Component} from "react";


const rspCoords = {
    바위 : '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component{

    state = {
        result : '',
        score: 0,
        imgCoord: '0',
    }

    interval;

    // render 처음 실행될 때. 리렌더링 될 때는 실행되지 않는다.
    componentDidMount() {
        this.interval = setInterval(()=>{
            // 클로저 문제 조심. setInterval 바깥에서 참조하면 imgCoord에는 초기값인 바위만 계속 남아있다.
            const {imgCoord} = this.state;
            if(imgCoord === rspCoords.바위){
                this.setState({
                    imgCoord: rspCoords.가위,
                });
            }else if(imgCoord === rspCoords.가위){
                this.setState({
                    imgCoord: rspCoords.보,
                });
            }else if(imgCoord === rspCoords.보){
                this.setState({
                    imgCoord: rspCoords.바위,
                });
            }
        },1000);
    }

    // 리렌더링 후
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    // 컴포넌트가 제거되기 직전
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    };

    onClickBtn = (choice) => (e)=>{
        console.log('클릭')
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.state.imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            this.setState({
                result: '비겼습니다.',
            });
        }else if ([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return {
                    result: '이겼습니다.',
                    score: prevState.score + 1,
                };
            });
        }else {
            this.setState((prevState)=>{
                return {
                    result: '졌습니다.',
                    score: prevState.score + 1,
                };
            });
        }

        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    };

    render() {
        const {result, score, imgCoord} = this.state;
        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;