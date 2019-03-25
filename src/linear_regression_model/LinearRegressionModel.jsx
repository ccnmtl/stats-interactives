import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import MathJax from 'react-mathjax2';
import { Nav } from '../Nav.jsx';
import * as math from 'mathjs';
import { SMOKING_FREQ } from './data';
import { TaxRateSlider } from './TaxRateSlider';
import { TaxRateGraphA, TaxRateGraphB } from './TaxRateGraph';
import { FrequencyGraphA, FrequencyGraphB } from './FrequencyGraph';

export class LinearRegressionModel extends Component {
    constructor(props) {
        super(props);

        this.handleTaxRateIdx = this.handleTaxRateIdx.bind(this);
        this.handleTaxRate = this.handleTaxRate.bind(this);
        this.handleTaxSampleIdx = this.handleTaxSampleIdx.bind(this);
        this.handleFlipGraphs = this.handleFlipGraphs.bind(this);

        this.initialState = {
            taxRateIdx: 0,
            activeTaxRate: 3.0,
            y_i: SMOKING_FREQ[0][0][0],
            mean: 20,
            epsilon: 5,
            activeDataIdx: [0, 0],
            flipGraphs: false,
        };

        this.state = this.initialState;
    }
    handleFlipGraphs() {
        this.setState((prevState) => ({
            flipGraphs: !prevState.flipGraphs,
        }));
    }
    handleTaxRateIdx(idx) {
        let taxRateRow = Math.floor(idx / 20);
        let taxRateCol = idx % 20;
        let mean = 0;
        switch (taxRateRow) {
        case 0:
            mean = 20;
            break;
        case 1:
            mean = 15;
            break;
        case 2:
            mean = 10;
            break;
        case 3:
            mean = 5;
            break;
        }

        let epsilon = Math.abs(math.round(
            mean - SMOKING_FREQ[taxRateRow][taxRateCol][0]), 2);
        this.setState({
            taxRateIdx: idx,
            activeDataIdx: [taxRateRow, taxRateCol],
            y_i: SMOKING_FREQ[taxRateRow][taxRateCol][0],
            mean: mean,
            epsilon: epsilon,
        });
    }
    handleTaxRate(idx) {
        let row = idx * 20;
        let col = this.state.taxRateIdx % 20;
        this.handleTaxRateIdx(row + col);
    }
    handleTaxSampleIdx(idx) {
        let row = Math.floor(this.state.taxRateIdx / 20) * 20;
        this.handleTaxRateIdx(row + idx);
    }
    render() {
        return (
            <>
            <Nav/>
            <div className='container'>
                <div className={'row'}>
                    <div className={'col-10'}>
                        <h2>Linear Regression Model</h2>
                    </div>
                    <div className={'col-2'}>
                        <div className={'d-flex justify-content-end ' +
                            'linear-regression-toggle'}>
                            <a className={!this.state.flipGraphs ?
                                'btn btn-outline-primary btn-sm' :
                                'btn btn-primary btn-sm active'}
                            role={'button'}
                            disabled={this.state.flipGraphs}
                            onClick={this.handleFlipGraphs}>
                                Vertical
                            </a>
                            <a className={this.state.flipGraphs ?
                                'btn btn-outline-primary btn-sm' :
                                'btn btn-primary btn-sm active'}
                            role={'button'}
                            onClick={this.handleFlipGraphs}>
                                Horizontal
                            </a>
                        </div>
                    </div>
                </div>
                <CSSTransitionGroup
                    transitionName="graph-transition"
                    transitionEnterTimeout={3000}
                    transitionLeaveTimeout={3000}>
                    {this.state.flipGraphs === false ? (
                        <div key={this.state.flipGraphs}
                            className="container state-a-container">
                            <div className="row">
                                <div className="col-7 state-a-info-container">
                                    <div>
                                        <TaxRateSlider
                                            taxRateIdx={this.state.taxRateIdx}
                                            handleTaxRate={this.handleTaxRate}
                                            handleTaxSampleIdx={
                                                this.handleTaxSampleIdx}
                                            y_i={this.state.y_i}
                                            mean={this.state.mean}
                                            epsilon={this.state.epsilon}/>
                                    </div>
                                    <div>
                                        <p>This scatter plot illustrates the
                                            basic assumptions of the OLS
                                            regression. On average, people
                                            smoke different number of
                                            cigarettes at different levels of
                                            cigarette tax. We assume the
                                            average number of cigs smoked is
                                            given by the formula below. People
                                            might smoke more or less than the
                                            average number of cigarettes due
                                            to other factors.
                                        </p>
                                        <p>Click through different tax rates
                                            to see the distribution of number
                                            of cigarettes for a particular tax
                                            rate. For each tax level you can
                                            click through different smokers to
                                            see how many cigarettes they
                                            consumed.
                                        </p>
                                        <p>Notice we reverse the axes for this
                                            scatter plot so that the
                                            explanatory variable is on the
                                            y-axis and the response variable
                                            is on the x-axis. We did this so
                                            that you can better visualize the
                                            histogram of the number of
                                            cigarettes. (More familiar, easier
                                            to read, etc even though it is not
                                            the convention) Use the toggle
                                            above to switch the axis to the
                                            conventional framework -- where
                                            the explanatory variable is on the
                                            x-axis and the response variable
                                            is on the y-axis.
                                        </p>
                                        <div>
                                            <MathJax.Context input={'ascii'}>
                                                <div>
                                                    <MathJax.Node>
                                                        {'mu_Y = 29 - 2 * x'}
                                                    </MathJax.Node>
                                                </div>
                                            </MathJax.Context>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5 state-a-graph-container">
                                    <div className={'graph-A-container'}>
                                        <TaxRateGraphA
                                            taxRateIdx={this.state.taxRateIdx}
                                            activeDataIdx={
                                                this.state.activeDataIdx}
                                            handleTaxRateIdx={
                                                this.handleTaxRateIdx}/>
                                    </div>
                                    <div className={'graph-A-container'}>
                                        <FrequencyGraphA
                                            taxRateIdx={this.state.taxRateIdx}
                                            activeDataIdx={
                                                this.state.activeDataIdx}
                                            handleTaxRateIdx={
                                                this.handleTaxRateIdx}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={this.state.flipGraphs}
                            className="container state-b-container">
                            <div className="row state-b-graph-container">
                                <div className={'col-4'}>
                                    <TaxRateSlider
                                        taxRateIdx={this.state.taxRateIdx}
                                        handleTaxRate={this.handleTaxRate}
                                        handleTaxSampleIdx={
                                            this.handleTaxSampleIdx}
                                        y_i={this.state.y_i}
                                        mean={this.state.mean}
                                        epsilon={this.state.epsilon}/>
                                    <p>The scatter plot is now shown in
                                        the conventional way with the
                                        explanatory variable on the x-axis
                                        and the response variable on the
                                        y-axis. Notice that it represents
                                        the same relationship between
                                        cigarettes and cigarette tax as
                                        before. The tilted histograms to
                                        the left show the same distribution
                                        of the number of cigarettes smoked
                                        on average for each level of
                                        taxation.
                                    </p>
                                </div>
                                <div className="col-3 graph-B-container">
                                    <FrequencyGraphB
                                        taxRateIdx={this.state.taxRateIdx}
                                        activeDataIdx={
                                            this.state.activeDataIdx}
                                        handleTaxRateIdx={
                                            this.handleTaxRateIdx}/>
                                </div>
                                <div className="col-5 graph-B-container">
                                    <TaxRateGraphB
                                        taxRateIdx={this.state.taxRateIdx}
                                        activeDataIdx={
                                            this.state.activeDataIdx}
                                        handleTaxRateIdx={
                                            this.handleTaxRateIdx}/>
                                </div>
                            </div>
                        </div>
                    )}
                </CSSTransitionGroup>
            </div>
            <hr/>
            </>
        );
    }
}
