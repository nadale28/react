const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name: 'lotto',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js','.jsx']
    },
    entry: {
        app: ['./client']
    }, //입력

    module: {
        rules: [{
            test: /\.jsx?$/,
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
                ],
                plugins: [
                    'react-refresh/babel'
                ]
            },
        }]
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    }, //출력
    devServer: {
        devMiddleware:{publicPath: '/dist/'},
        static: {directory: path.resolve(__dirname)}, // 정적파일 index.html 이 위치한 경로
        hot: true,
    },
};