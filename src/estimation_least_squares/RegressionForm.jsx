import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import ReactTooltip from 'react-tooltip';
import { NumericField } from '../utility_components/NumericField';

export const RegressionForm = ({seed, handleSeed, handleGeneratePop,
    slope, intercept, handleSlope, handleIntercept }) => {
    const hndlSeed = (e) => {
        handleSeed(e.target.value);
    };
    const handleGenPop = (e) => {
        e.preventDefault();
        handleGeneratePop();
    };
    return (
        <>
        <form onSubmit={handleGenPop}
            className="needs-validation" noValidate >
            <fieldset>
                <div className="form-group">
                    <div className="form-row">
                        <label htmlFor="seed" className="float-right">
                            Seed:</label>
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="seed-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <ReactTooltip id="seed-tt" event="focus"
                            eventOff="blur">
                            <span>Enter a different value to see a
                                different simulation</span>
                        </ReactTooltip>
                    </div>
                    <div>
                        <input type="text"
                            id="seed"
                            className={
                                seed ? 'form-control is-valid' :
                                    'form-control' }
                            value={seed}
                            onChange={hndlSeed}
                            placeholder={
                                'Enter a seed to generate a population'}
                            autoFocus required/>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <input className="btn btn-primary btn-block"
                                disabled={seed ? false : true}
                                id="generate-population"
                                type="submit"
                                value="Generate Population"/>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        <form onSubmit={(e) => {e.preventDefault();}}>
            <fieldset>
                <div className={'form-group'}>
                    <div className={'form-row'}>
                        <label htmlFor={'slope'}>
                            Slope:
                        </label>
                        <NumericField
                            id={'slope'}
                            className={'form-control form-control-sm'}
                            min={0}
                            max={100}
                            value={slope}
                            onChange={handleSlope} />
                    </div>
                    <div className={'form-row'}>
                        <div style={{ height: '50px', width: '100%'}}>
                            <Rheostat
                                min={0}
                                max={100}
                                values={[slope]}
                                onValuesUpdated={(sliderState) => {
                                    handleSlope(
                                        sliderState.values[0]);
                                }} />
                        </div>
                    </div>
                    <div className={'form-row'}>
                        <label htmlFor={'intercept'}>
                            Intercept:
                        </label>
                        <NumericField
                            id={'intercept'}
                            className={'form-control form-control-sm'}
                            min={0}
                            max={100}
                            value={intercept}
                            onChange={handleIntercept} />
                    </div>
                    <div className={'form-row'}>
                        <div style={{ height: '50px', width: '100%'}}>
                            <Rheostat
                                min={0}
                                max={100}
                                values={[intercept]}
                                onValuesUpdated={(sliderState) => {
                                    handleIntercept(
                                        sliderState.values[0]);
                                }} />
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        </>
    );
};

RegressionForm.propTypes = {
    seed: PropTypes.string,
    handleSeed: PropTypes.func,
    handleGeneratePop: PropTypes.func,
    slope: PropTypes.number,
    intercept: PropTypes.number,
    handleSlope: PropTypes.func,
    handleIntercept: PropTypes.func,
};
