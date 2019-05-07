import React, { Component } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Nav } from '../Nav.jsx';
import * as math from 'mathjs';
import { SMOKING_FREQ } from './data';
import { StateAContainer, StateBContainer } from './GraphStateContainers';

export class LinearRegressionModel extends Component {
    constructor(props) {
        super(props);

        this.handleTaxRateIdx = this.handleTaxRateIdx.bind(this);
        this.handleFlipGraphs = this.handleFlipGraphs.bind(this);
        this.handleFreeToggleLock = this.handleFreeToggleLock.bind(this);

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
            toggleLock: false,
        };

        this.state = this.initialState;
    }
    handleFlipGraphs() {
        ReactGA.event({
            category: 'LinearRegressionModel',
            action: 'Flip Graphs',
        });
        this.setState((prevState) => ({
            flipGraphs: !prevState.flipGraphs,
            toggleLock: true,
        }));
    }
    handleFreeToggleLock() {
        this.setState({
            toggleLock: false,
        });
    }
    handleTaxRateIdx(idx) {
        ReactGA.event({
            category: 'LinearRegressionModel',
            action: 'Change Form Value',
            label: 'Tax Rate Index',
            value: idx,
        });
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

        let epsilon = math.round(
            mean - SMOKING_FREQ[taxRateRow][taxRateCol][0], 2);

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
            <main className='container'>
                <div className={'row'}>
                    <div className={'col-10'}>
                        <h1>Linear Regression Model</h1>
                    </div>
                    <div className={'col-2'}>
                        <div className={'d-flex ' +
                            'linear-regression-toggle'}>
                            <VerticalButton
                                flipGraphs={this.state.flipGraphs}
                                handleFlipGraphs={this.handleFlipGraphs}
                                toggleLock={this.state.toggleLock}
                            />
                            <HorizontalButton
                                flipGraphs={this.state.flipGraphs}
                                handleFlipGraphs={this.handleFlipGraphs}
                                toggleLock={this.state.toggleLock}
                            />
                        </div>
                    </div>
                </div>
                <TransitionGroup>
                    {this.state.flipGraphs === false ? (
                        <CSSTransition
                            key={this.state.flipGraphs}
                            onExited={this.handleFreeToggleLock}
                            classNames="graph-transition"
                            timeout={3000}>
                            <StateAContainer
                                taxRateIdx={this.state.taxRateIdx}
                                handleTaxRateIdx={this.handleTaxRateIdx}
                                y_i={this.state.y_i}
                                mean={this.state.mean}
                                epsilon={this.state.epsilon}
                                activeDataIdx={this.state.activeDataIdx}
                            />
                        </CSSTransition>
                    ) : (
                        <CSSTransition
                            key={this.state.flipGraphs}
                            onExited={this.handleFreeToggleLock}
                            classNames="graph-transition"
                            timeout={3000}>
                            <StateBContainer
                                taxRateIdx={this.state.taxRateIdx}
                                handleTaxRateIdx={this.handleTaxRateIdx}
                                y_i={this.state.y_i}
                                mean={this.state.mean}
                                epsilon={this.state.epsilon}
                                activeDataIdx={this.state.activeDataIdx}
                            />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </main>
            <hr/>
            </>
        );
    }
}

const VerticalButton = ({flipGraphs, handleFlipGraphs, toggleLock}) => {
    return (
        <button
            className={
                flipGraphs ?
                    'btn btn-success btn-sm' :
                    'btn btn-success btn-sm active'}
            disabled={toggleLock || !flipGraphs}
            onClick={handleFlipGraphs}>
            Vertical
        </button>
    );
};

VerticalButton.propTypes = {
    flipGraphs: PropTypes.bool,
    handleFlipGraphs: PropTypes.func,
    toggleLock: PropTypes.bool,
};

const HorizontalButton = ({flipGraphs, handleFlipGraphs, toggleLock}) => {
    return (
        <button
            className={flipGraphs ?
                'btn btn-success btn-sm active' :
                'btn btn-success btn-sm'}
            disabled={toggleLock || flipGraphs}
            onClick={handleFlipGraphs}>
                Horizontal
        </button>
    );
};

HorizontalButton.propTypes = {
    flipGraphs: PropTypes.bool,
    handleFlipGraphs: PropTypes.func,
    toggleLock: PropTypes.bool,
};

