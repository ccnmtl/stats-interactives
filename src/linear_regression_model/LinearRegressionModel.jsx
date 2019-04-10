import React, { Component } from 'react';
/* eslint-disable */
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
        this.handleFlipGraphs = this.handleFlipGraphs.bind(this);

        // inline initial mean and epsilon value
        let mean = 23;
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
        let mean = 29 - 2 * ((taxCol) => {
            switch (taxCol) {
            case 0:
                return 3;
            case 1:
                return 5;
            case 2:
                return 7;
            case 3:
                return 7.5;
            }
        })(taxRateRow);

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
                                'btn btn-light btn-sm' :
                                'btn btn-light btn-sm active'}
                            role={'button'}
                            disabled={this.state.flipGraphs}
                            onClick={this.handleFlipGraphs}>
                                Vertical
                            </a>
                            <a className={this.state.flipGraphs ?
                                'btn btn-light btn-sm' :
                                'btn btn-light btn-sm active'}
                            role={'button'}
                            onClick={this.handleFlipGraphs}>
                                Horizontal
                            </a>
                        </div>
                    </div>
                </div>
                <TransitionGroup>
                    {this.state.flipGraphs === false ? (
                        <CSSTransition
                            key={this.state.flipGraphs}
                            classNames="graph-transition"
                            timeout={3000}>
                            <div className="container state-a-container">
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
                        </CSSTransition>
                    ) : (
                    <CSSTransition
                        key={this.state.flipGraphs}
                        classNames="graph-transition"
                        timeout={3000}>
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
                    </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
            <hr/>
            </>
        );
    }
}
