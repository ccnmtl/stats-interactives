import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';
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
            y_i: null,
            mean: null,
            epsilon: null,
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
        this.setState({
            taxRateIdx: idx,
            activeDataIdx: [taxRateRow, taxRateCol]
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
                        </div>
                        <div className="col-6">
                            <FrequencyGraphA
                                taxRateIdx={this.state.taxRateIdx}
                                activeDataIdx={this.state.activeDataIdx}
                                handleTaxRateIdx={this.handleTaxRateIdx}/>
                            <TaxRateGraphA
                                taxRateIdx={this.state.taxRateIdx}
                                activeDataIdx={this.state.activeDataIdx}
                                handleTaxRateIdx={this.handleTaxRateIdx}/>
                        </div>
                    </div>
                ) : (
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
                )}
            </div>
            <hr/>
            </>
        );
    }
}
