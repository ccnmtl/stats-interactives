import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
            y_i: 1,
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
        let taxRateRow = Math.floor(idx / 25);
        let taxRateCol = idx % 25;
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
        let row = idx * 25;
        let col = this.state.taxRateIdx % 25;
        this.handleTaxRateIdx(row + col);
    }
    handleTaxSampleIdx(idx) {
        let row = Math.floor(this.state.taxRateIdx / 25) * 25;
        this.handleTaxRateIdx(row + idx);
    }
    render() {
        return (
            <>
            <Nav/>
            <div className='container'>
                <h2>Linear Regression Model</h2>
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
                <CSSTransitionGroup
                    transitionName="graph-transition"
                    transitionEnterTimeout={3000}
                    transitionLeaveTimeout={3000}>
                    {this.state.flipGraphs === false ? (
                        <div key={this.state.flipGraphs}
                            className="container state-a-container">
                            <div className="row">
                                <div className="col-6 state-a-info-container">
                                    <div>
                                        Lorem ipsum dolor sit amet, consetetur
                                        sadipscing elitr, sed diam nonumy
                                        eirmod tempor invidunt ut labore et
                                        dolore magna aliquyam erat, sed diam
                                        voluptua. At vero eos et accusam et
                                        justo duo dolores et ea rebum. Stet
                                        clita kasd gubergren, no sea takimata
                                        sanctus est Lorem ipsum dolor sit amet.
                                    </div>
                                    <div>
                                        <TaxRateSlider
                                            taxRateIdx={this.state.taxRateIdx}
                                            handleTaxRate={this.handleTaxRate}
                                            handleTaxSampleIdx={
                                                this.handleTaxSampleIdx} />
                                    </div>
                                    <div>
                                        <div className="col-12">
                                            Y<sub>i</sub>: {this.state.y_i}
                                        </div>
                                        <div className="col-12">
                                            μ: {this.state.mean}
                                        </div>
                                        <div className="col-12">
                                            ε: {this.state.epsilon}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 state-a-graph-container">
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
                                <div className="col-6">
                                    <FrequencyGraphB
                                        taxRateIdx={this.state.taxRateIdx}
                                        activeDataIdx={
                                            this.state.activeDataIdx}
                                        handleTaxRateIdx={
                                            this.handleTaxRateIdx}/>
                                </div>
                                <div className="col-6">
                                    <TaxRateGraphB
                                        taxRateIdx={this.state.taxRateIdx}
                                        activeDataIdx={
                                            this.state.activeDataIdx}
                                        handleTaxRateIdx={
                                            this.handleTaxRateIdx}/>
                                </div>
                            </div>
                            <div className="row state-b-info-container">
                                <div className="col-4">
                                    <TaxRateSlider
                                        taxRateIdx={this.state.taxRateIdx}
                                        handleTaxRate={this.handleTaxRate}
                                        handleTaxSampleIdx={
                                            this.handleTaxSampleIdx} />
                                </div>
                                <div className="col-4">
                                    <div className="col-12">
                                        Y<sub>i</sub>: {this.state.y_i}
                                    </div>
                                    <div className="col-12">
                                        μ: {this.state.mean}
                                    </div>
                                    <div className="col-12">
                                        ε: {this.state.epsilon}
                                    </div>
                                </div>
                                <div className="col-4">
                                    Lorem ipsum dolor sit amet, consetetur
                                    sadipscing elitr, sed diam nonumy
                                    eirmod tempor invidunt ut labore et
                                    dolore magna aliquyam erat, sed diam
                                    voluptua. At vero eos et accusam et
                                    justo duo dolores et ea rebum. Stet
                                    clita kasd gubergren, no sea takimata
                                    sanctus est Lorem ipsum dolor sit amet.
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
