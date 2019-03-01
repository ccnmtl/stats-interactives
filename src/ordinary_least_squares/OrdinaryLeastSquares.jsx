import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';
import * as math from 'mathjs';
import { SMOKING_FREQ } from './data';
import { TaxRateSlider } from './TaxRateSlider';
import { TaxRateGraphA, TaxRateGraphB } from './TaxRateGraph';
import { FrequencyGraphA, FrequencyGraphB } from './FrequencyGraph';

export class OrdinaryLeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleTaxRateIdx = this.handleTaxRateIdx.bind(this);
        this.handleFlipGraphs = this.handleFlipGraphs.bind(this);

        this.initialState = {
            taxRateIdx: 1,
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
        let taxRateRow = Math.floor((idx - 1) / 25);
        let taxRateCol = (idx - 1) % 25;
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
    render() {
        return (
            <>
            <Nav/>
            <div className='container'>
                <h2>Ordinary Least Squares</h2>
                <div className="row">
                    <div className="col-12">
                        <TaxRateSlider
                            taxRateIdx={this.state.taxRateIdx}
                            handleTaxRateIdx={this.handleTaxRateIdx}
                            flipGraphs={this.state.flipGraphs}
                            handleFlipGraphs={this.handleFlipGraphs}/>
                    </div>
                </div>
                {this.state.flipGraphs === false ? (
                    <div className="row">
                        <div className="col-6">
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
                        <div className="col-6">
                            <TaxRateGraphA
                                taxRateIdx={this.state.taxRateIdx}
                                activeDataIdx={this.state.activeDataIdx}
                                handleTaxRateIdx={this.handleTaxRateIdx}/>
                            <FrequencyGraphA
                                taxRateIdx={this.state.taxRateIdx}
                                activeDataIdx={this.state.activeDataIdx}
                                handleTaxRateIdx={this.handleTaxRateIdx}/>
                        </div>
                    </div>
                ) : (
                    <>
                    <div className="row">
                        <div className="col-6">
                            <FrequencyGraphB
                                taxRateIdx={this.state.taxRateIdx}
                                activeDataIdx={this.state.activeDataIdx}
                                handleTaxRateIdx={this.handleTaxRateIdx}/>
                        </div>
                        <div className="col-6">
                            <TaxRateGraphB
                                taxRateIdx={this.state.taxRateIdx}
                                activeDataIdx={this.state.activeDataIdx}
                                handleTaxRateIdx={this.handleTaxRateIdx}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            Y<sub>i</sub>: {this.state.y_i}
                        </div>
                        <div className="col-4">
                            μ: {this.state.mean}
                        </div>
                        <div className="col-4">
                            ε: {this.state.epsilon}
                        </div>
                    </div>
                    </>
                )}
            </div>
            <hr/>
            </>
        );
    }
}
