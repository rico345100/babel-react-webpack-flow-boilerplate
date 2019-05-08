/* @flow */
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

interface AppProps {
    message: string;
}

class App extends Component<AppProps, {}> {
    static propTypes = {
        message: PropTypes.string,
    }
    render() {
        return (
            <div>Message: {this.props.message}</div>
        );
    }
}

export default hot(module)(App);
