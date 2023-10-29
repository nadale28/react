const React = require('react');
const ReactDom = require('react-dom/client');

const NumberBaseBallHooks = require('./NumberBaseBallHooks');

ReactDom.createRoot(document.querySelector('#root')).render(<NumberBaseBallHooks/>);