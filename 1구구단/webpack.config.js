const path = require('path');

module.exports = {
    name: 'gugudan-setting',
    mode: 'development', //production
    devtool: 'eval', // 운영에서는 hidden-source-map
    resolve: {
        extensions: ['.js','.jsx']
    },
    entry: {
        app: ['./client']
    }, //입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: { // 지원할 브라우저만 명시. 익스플로러 10,11 같은건 버려야지, browserslist 사이트에서 확인
                            browsers: ['> 5% in KR'], //한국 5% 이상 쓰는 브라우저
                        },
                        debug: true, //설정한 브라우저들이 콘솔에 찍힌다.
                    }],
                    '@babel/preset-react',
                ]
            },
        }]
    },
    plugins: [],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, //출력
};