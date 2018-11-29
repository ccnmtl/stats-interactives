/*eslint max-len: ["error", { "ignoreStrings": true }]*/
import React from 'react';
import PropTypes from 'prop-types';
import { CentralLimitGraph } from './CentralLimitGraph';
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
        'text': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
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
        
            <h1 className="display-3">
                Theorem7
            </h1>
            
            <p className="lead">
                Seven Interactive Simulations of Statistics Theorems for Deeper Understanding
            </p>

            <p>
                Specifically designed for Doru Cojoc&#39;s Quantitative
                Analysis I course at SIPA, these simulations are intended as a
                test of effectiveness at improving learning outcomes. This
                project seeks to address this by turning them into web
                interactives, openly available. These interactives will be
                provided to students for their own study and experimentation,
                which can be used here or embedded/linked elsewhere.
            </p>
            
            <p>
                <a className="btn btn-primary btn-lg" href="https://sipa.columbia.edu/faculty-research/faculty-directory/doru-c-cojoc" role="button">Contact Dr. Cojoc</a>
            </p>
            
        </div>
        
    </div>
    
    <div className="container">
    
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
