import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';
import { TaxRateSlider } from './TaxRateSlider';
import { TaxRateGraph } from './TaxRateGraph';
import { FrequencyGraph } from './FrequencyGraph';

export class OrdinaryLeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleTaxRateIdx = this.handleTaxRateIdx.bind(this);

        this.initialState = {
            taxRateIdx: 1,
            activeTaxRate: 3.0,
            y_i: null,
            mean: null,
            epsilon: null,
            activeDataIdx: [0, 0],
        };

        this.state = this.initialState;
    }
    handleTaxRateIdx(idx) {
        this.setState({
            taxRateIdx: idx,
            activeDataIdx: [Math.floor((idx - 1) / 25), (idx - 1) % 25]
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
                            handleTaxRateIdx={this.handleTaxRateIdx}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <FrequencyGraph
                            taxRateIdx={this.state.taxRateIdx}
                            activeDataIdx={this.state.activeDataIdx}/>
                    </div>
                    <div className="col-6">
                        <TaxRateGraph
                            taxRateIdx={this.state.taxRateIdx}
                            activeDataIdx={this.state.activeDataIdx}/>
                    </div>
                </div>
            </div>
            <hr/>
            </>
        );
    }
}
