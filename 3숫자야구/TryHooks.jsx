const React = require('react');


const TryHooks = ({tryInfo}) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
}

module.exports = TryHooks;