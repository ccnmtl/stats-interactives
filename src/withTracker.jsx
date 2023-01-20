/* eslint-disable */
/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, { Component } from 'react';
import ReactGA from "react-ga4";

const options = {
    gtagOptions: {anonymizeIp: true},
    testMode: process.env.NODE_ENV === 'test'
}
ReactGA.initialize('G-VX2F4J3PWZ', options);

export default function withTracker(WrappedComponent, options = {}) {
    const trackPage = (page) => {
        ReactGA.send({ hitType: "pageview", page: page, ...options });
    };

    const HOC = class extends Component {
        componentDidMount() {
            const page = this.props.location.pathname;
            trackPage(page);
        }


        componentDidUpdate(prevProps) {
            const currentPage =
                prevProps.location.pathname + prevProps.location.search;
            const nextPage =
                this.props.location.pathname + this.props.location.search;

        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
}
