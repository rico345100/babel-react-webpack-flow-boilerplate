/* @flow */
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './App.css';

interface AppProps {
    message: string;
}

class App extends Component<AppProps, {}> {
    static propTypes = {
        message: PropTypes.string,
    }
    render() {
        return (
            <div>
              <div className={styles.hello}>Helloworld</div>
            </div>
        );
    }
}

export default hot(module)(App);
