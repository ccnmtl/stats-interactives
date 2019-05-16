/*eslint max-len: ["error", { "ignoreStrings": true }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav } from './Nav';
import { CentralLimitGraph } from './central_limit_theorem/CentralLimitGraph';
import { LinearRegressionModel } from
    './linear_regression_model/LinearRegressionModel';
import { LeastSquares } from './estimation_least_squares/LeastSquares';
import { CLTLeastSquares } from './clt_least_squares/CLTLeastSquares';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NotFound } from './NotFound';
import 'rheostat/initialize';
import withTracker from './withTracker';
import * as Sentry from '@sentry/browser';

/* eslint-disable-next-line */
if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://f6a08bec6e9e46198dfd70f8776bdb59@sentry.io/1399822',
    });
}

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        Sentry.withScope((scope) => {
            Object.keys(info).forEach((key) => {
                scope.setExtra(key, info[key]);
            });
            Sentry.captureException(error);
        });
    }
    componentDidMount() {
        document.getElementById('footer').style.display = 'block';
    }
    render() {
        if (this.state.hasError) {
            return (
                <Router>
                    <Nav />
                    <main className='container'>
                        <p>It looks like something went wrong. Refresh
                            the page to start over.</p>
                    </main>
                </Router>
            );
        } else {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/" component={withTracker(Home)} />
                        <Route path="/central-limit-theorem"
                            component={withTracker(CentralLimitGraph)} />
                        <Route path="/linear-regression-model"
                            component={
                                withTracker(LinearRegressionModel)} />
                        <Route path="/least-squares-estimation-assessment"
                            component={withTracker(LeastSquares)} />
                        <Route path="/least-squares-estimation"
                            component={withTracker(LeastSquares)} />
                        <Route path="/sampling-distribution-regression"
                            component={withTracker(CLTLeastSquares)} />
                        <Route component={withTracker(NotFound)} />
                    </Switch>
                </Router>
            );
        }
    }
}

const PreviewData = [
    {
        'slug': '/central-limit-theorem',
        'title': 'The Central Limit Theorem',
        'text': 'The Central Limit Theorem establishes that, under some conditions, the mean of a sample drawn from a population follows a normal sampling distribution, even when the distribution of the population itself is not normally distributed.'
    },
    {
        'slug': '/linear-regression-model',
        'title': 'Linear Regression Model',
        'text': 'A linear regression model assumes that the mean of the response variable is affected by the explanatory variables and that individual observations vary around the mean due to other factors.',
    },
    {
        'slug': '/least-squares-estimation',
        'title': 'Least Squares Estimation',
        'text': 'Regressions are used to predict the average values in a data set. The difference between the actual value of an observation and the average value predicted by the regression is called a residual. An ordinary least squares regression minimizes the sum of squares of residuals.',
    },
    {
        'slug': '/sampling-distribution-regression',
        'title': 'Sampling Distribution of Regression Coefficients',
        'text': 'Regression coefficients, like other sample statistics, are random variables with sampling distributions. Under certain conditions, they are unbiased estimators for the parameters of the regression model. Their standard deviation is directly proportional to the standard deviation of the disturbances.',
    },
];

const PreviewBlock = (props) => (
    <div key={props.slug} className="card col-md-3">
        <div className="card-body">
            <h2 className="card-title">
                <Link to={props.slug}>{ props.title }</Link>
            </h2>
            <p className="card-text">{props.text}</p>
        </div>
    </div>
);

const Preview = () => (
    PreviewData.map(PreviewBlock)
);

const Home = () => (
    <>
    <div className="jumbotron">
        <div className="container">
            <h1 className="display-2 hp-title">
                <span className="stats">Stats</span>
                Interactives
                <span className="beta"> Beta</span>
            </h1>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <h2 className="display-5">
                    <strong>StatsInteractives</strong> is an initiative
                        specifically designed for Dr. Doru Cojoc&#39;s
                        Quantitative Analysis I course at Columbia SIPA.
                </h2>
            </div>
            <div className="col-md-6">
                <p>The four simulations within this prototype were built to:</p>
                <ul>
                    <li>
                            serve a test of effectiveness at improving
                            learning outcomes
                    </li>
                    <li>
                            address these outcomes by turning them into web
                            interactives, openly available
                    </li>
                    <li>
                            provide students for their own study and
                            experimentation
                    </li>
                    <li>
                            be used here or elsewhere by embedding or linking to
                            the media directly
                    </li>
                </ul>
            </div>
        </div>        <div className="row">
            <Preview />
        </div>
    </div>
    <hr/>
    </>
);

PreviewBlock.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
};
export {PreviewBlock, Preview};
