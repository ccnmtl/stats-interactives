import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Nav } from '../Nav.jsx';
import * as math from 'mathjs';
var jStat = require('jStat').jStat;
import { SMOKING_FREQ } from './data';
import { TaxRateSlider } from './TaxRateSlider';
import { TaxRateGraphA, TaxRateGraphB } from './TaxRateGraph';
import { FrequencyGraphA, FrequencyGraphB } from './FrequencyGraph';

export class LinearRegressionModel extends Component {
    constructor(props) {
        super(props);

        this.handleTaxRateIdx = this.handleTaxRateIdx.bind(this);
        this.handleFlipGraphs = this.handleFlipGraphs.bind(this);

        // inline initial mean and epsilon value
        let mean = 23.38;
        let epsilon = 4.23;

        this.initialState = {
            taxRateIdx: 0,
            activeTaxRate: 3.0,
            y_i: SMOKING_FREQ[0][0][0],
            mean: mean,
            epsilon: epsilon,
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
        let mean = jStat.mean(SMOKING_FREQ[taxRateRow].reduce((acc, val) => {
            acc.push(val[0]);
            return acc;
        }, []));

        let epsilon = Math.abs(math.round(
            mean - SMOKING_FREQ[taxRateRow][taxRateCol][0], 2));

        // round off mean after used to calc epsilon
        mean = math.round(mean, 2);

        this.setState({
            taxRateIdx: idx,
            activeDataIdx: [taxRateRow, taxRateCol],
            y_i: SMOKING_FREQ[taxRateRow][taxRateCol][0],
            mean: mean,
            epsilon: epsilon,
        });
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
                                            handleTaxRateIdx={
                                                this.handleTaxRateIdx}
                                            y_i={this.state.y_i}
                                            mean={this.state.mean}
                                            epsilon={this.state.epsilon}
                                            isStateA={true}/>
                                    </div>
                                </div>
                                <div className="col-5 state-a-graph-container">
                                    <div className={
                                        'graph-A-container tax-rate-graph'}>
                                        <TaxRateGraphA
                                            taxRateIdx={this.state.taxRateIdx}
                                            activeDataIdx={
                                                this.state.activeDataIdx}
                                            handleTaxRateIdx={
                                                this.handleTaxRateIdx}/>
                                    </div>
                                    <div className={
                                        'graph-A-container frequency-graph'}>
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
                                <div className={'col-4 state-b-info-container'}>
                                    <TaxRateSlider
                                        taxRateIdx={this.state.taxRateIdx}
                                        handleTaxRateIdx={
                                            this.handleTaxRateIdx}
                                        y_i={this.state.y_i}
                                        mean={this.state.mean}
                                        epsilon={this.state.epsilon}
                                        isStateA={false}/>
                                </div>
                                <div className={
                                    'col-3 graph-B-container frequency-graph'} >
                                    <FrequencyGraphB
                                        taxRateIdx={this.state.taxRateIdx}
                                        activeDataIdx={
                                            this.state.activeDataIdx}
                                        handleTaxRateIdx={
                                            this.handleTaxRateIdx}/>
                                </div>
                                <div className={
                                    'col-5 graph-B-container tax-rate-graph'}>
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
