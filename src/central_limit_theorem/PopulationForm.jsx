import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';
import Rheostat from 'rheostat';
import { PitComponent } from '../PitComponent';
import { DISTRIBUTION_TYPE } from './CentralLimitGraph';
import ReactTooltip from 'react-tooltip';

export const PopulationForm  = (
    {seed, populationSize, mean, stdDev, distType,
        sampleSize, handleChange, handleGeneratePopulation, showPopForm}) => {
    const handleFormChange = (e) => {
        let numericFields = ['populationSize', 'mean', 'stdDev'];
        if (numericFields.includes(e.target.id)) {
            handleChange(e.target.id, forceNumber(e.target.value));
        } else {
            handleChange(e.target.id, e.target.value);
        }
    };
    const handleGenPop = (e) => {
        e.preventDefault();
        handleGeneratePopulation();
    };
    return (
        <>
        <form onSubmit={handleGenPop} className="needs-validation" noValidate >
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
                            onChange={handleFormChange}
                            placeholder={
                                'Enter a seed to generate a population'}
                            autoFocus required/>
                    </div>
                </div>
                {(seed || showPopForm) &&
                    <>
                    <div className="form-group">
                        <div className="form-row ">
                            <label htmlFor="distType">
                                Choose a Distribution Type:</label>
                        </div>
                        <div className="form-row ">
                            <select id="distType"
                                className="form-control"
                                onChange={handleFormChange}
                                disabled={seed ? false : true}
                                value={distType}>
                                { DISTRIBUTION_TYPE.map(
                                    (e) => (<option key={e.value}
                                        value={e.value}>
                                        {e.display}</option>)) }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="mean"
                                className="float-right">
                                Select a Mean:</label>
                            <span className="help-tooltip"
                                tabIndex="0"
                                data-tip
                                data-for="mean-tt">
                                <sup>
                                    <i className="fas fa-question-circle"></i>
                                </sup>
                            </span>
                            <ReactTooltip id="mean-tt" event="focus"
                                eventOff="blur">
                                <span>The arithmetic average of the values
                                    in the population.</span>
                            </ReactTooltip>
                        </div>
                        <div className="form-row slider-labels">
                            <div id="mean"
                                style={{ height: '50px', width: '100%'}}>
                                <Rheostat
                                    disabled={seed ? false : true}
                                    min={-5}
                                    max={5}
                                    values={[mean]}
                                    snap
                                    pitComponent={PitComponent}
                                    pitPoints={
                                        [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]}
                                    snapPoints={
                                        [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]}
                                    onChange={(sliderState) => {
                                        handleChange('mean',
                                            sliderState.values[0]);
                                    }}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="stdDev"
                                className="float-right">
                                Select a Standard Deviation:</label>
                            <span className="help-tooltip"
                                tabIndex="0"
                                data-tip
                                data-for="stdDev-tt">
                                <sup>
                                    <i className="fas fa-question-circle"></i>
                                </sup>
                            </span>
                            <ReactTooltip id="stdDev-tt" event="focus"
                                eventOff="blur">
                                <span>The average of the square distances
                                    from the mean of the population.</span>
                            </ReactTooltip>
                        </div>
                        <div className="form-row slider-labels">
                            <div id="stdDev"
                                style={{ height: '50px', width: '100%'}}>
                                <Rheostat
                                    disabled={seed ? false : true}
                                    min={1}
                                    max={4}
                                    values={[stdDev]}
                                    snap
                                    pitComponent={PitComponent}
                                    pitPoints={[1, 2, 3, 4]}
                                    snapPoints={[1, 2, 3, 4]}
                                    onChange={(sliderState) => {
                                        handleChange('stdDev',
                                            sliderState.values[0]);
                                    }}/>
                            </div>
                        </div>
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
                    </>
                }
            </fieldset>
        </form>
        </>
    );
};

PopulationForm.propTypes = {
    seed: PropTypes.string,
    populationSize: PropTypes.number,
    mean: PropTypes.number,
    stdDev: PropTypes.number,
    distType: PropTypes.string,
    handleChange: PropTypes.func,
    showPopForm: PropTypes.bool,
    sampleSize: PropTypes.number,
    handleGeneratePopulation: PropTypes.func
};
