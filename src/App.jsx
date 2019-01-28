/*eslint max-len: ["error", { "ignoreStrings": true }]*/
import React from 'react';
import PropTypes from 'prop-types';
import { CentralLimitGraph } from './central_limit_theorem/CentralLimitGraph';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export const App = () => (
    <Router>
        <main role="main">
            <Route exact path="/" component={Home} />
            <Route path="/central-limit-theorem"
                component={CentralLimitGraph} />
        </main>
    </Router>
);

const PreviewData = [
    {
        'slug': '/central-limit-theorem',
        'title': 'Central Limit Theorem',
        'text': 'In probability theory, the central limit theorem (CLT) establishes that, in some situations, when independent random variables are added, their properly normalized sum tends toward a normal distribution (informally a "bell curve") even if the original variables themselves are not normally distributed.'
    },
    {
        'slug': '/ols-regression',
        'title': 'OLS Regression',
        'text': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    },
];

const PreviewBlock = (props) => (
    <div key={props.slug} className="col-md-4">
        <h2>
            <Link to={props.slug}>{ props.title }</Link>
        </h2>
        <p>{props.text}</p>
    </div>
);

const Preview = () => (
    PreviewData.map(PreviewBlock)
);

const Home = () => (
    <>
    <div className="jumbotron">
        <div className="container">
            <h1 className="display-2">
            Project <strong>InViStats</strong>
            </h1>
            <h2 className="display-5">
            Interactive Visualizations of Statistics
            </h2>
        </div>
    </div>
    <div className="container">
        <p className="lead">
            <strong>
            Project INVISTATS (INteractive VIsualizations of STATisticS)
            </strong>
            is an initiative that was specifically designed
            for Doru Cojoc&#39;s Quantitative Analysis I course at
            Columbia SIPA.
        </p>
        <p>These simulations were built to:</p>
        <ul>
            <li>
            serve a test of effectiveness at improving learning outcomes
            </li>
            <li>
            address these outcomes by turning them into web interactives,
            openly available
            </li>
            <li>
            provide students for their own study and experimentation
            </li>
            <li>
            be used here or elsewhere by embedding or linking to
            the media directly
            </li>
        </ul>
        <p>For more information, <a href="https://sipa.columbia.edu/faculty-research/faculty-directory/doru-c-cojoc">Contact Dr. Cojoc</a> directly.</p>
        <div className="row">
            <Preview />
        </div>
    </div>
    </>
);

PreviewBlock.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
};
export {PreviewBlock, Preview};
