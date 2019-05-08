/* @flow */
import 'core-js/stable';
import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';

const body = document.body;

if(!body) {
    throw new Error("Cannot found document.body.");
}

const entryEl = document.createElement('div');
entryEl.className = 'entry';

body.appendChild(entryEl);

ReactDOM.render(<App message="Helloworld" />, entryEl);

// Comment above line and uncomment below line will gives you in error in runtime also!
// type Prop will transform to inner propTypes automatically!
// ReactDOM.render(<App message={123} />, entryEl);