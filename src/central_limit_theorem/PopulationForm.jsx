import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { DISTRIBUTION_TYPE } from './CentralLimitGraph';
import { Tooltip } from '../utility_components/Tooltip';

export const PopulationForm = (
    { seed, populationSize, mean, stdDev, distType,
        sampleSize, handleChange, handleGeneratePopulation, showPopForm }) => {
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
            <form onSubmit={handleGenPop}
                className="needs-validation" noValidate >
                <fieldset>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="seed" className="float-right">
                                Seed:</label>
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Enter a different value to see a
                                    different simulation</span>
                            </Tooltip>
                        </div>
                        <div>
                            <input type="text"
                                id="seed"
                                className={
                                    seed ? 'form-control is-valid' :
                                        'form-control'}
                                value={seed}
                                onChange={handleFormChange}
                                placeholder={
                                    'Enter a seed to generate a population'}
                                autoFocus required />
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
                                        {DISTRIBUTION_TYPE.map(
                                            (e) => (<option key={e.value}
                                                value={e.value}>
                                                {e.display}</option>))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="mean"
                                        className="float-right">
                                        Select a Mean:</label>
                                    <Tooltip tooltip={
                                        <sup>
                                            <i className="fas fa-question-circle">
                                            </i>
                                        </sup>}>
                                        <span>The arithmetic average of the values
                                            in the population.</span>
                                    </Tooltip>
                                </div>
                                <div className="form-row slider-labels">
                                    <div id="mean"
                                        style={{ height: '50px', width: '100%' }}>
                                        <Slider
                                            disabled={!seed}
                                            min={-5}
                                            max={5}
                                            value={mean}
                                            marks={{
                                                '-5': -5, '-4': -4, '-3': -3, '-2': -2, '-1': -1,
                                                0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5
                                            }}
                                            step={1}
                                            onChange={(val) => {
                                                handleChange('mean', val);
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="stdDev"
                                        className="float-right">
                                        Select a Standard Deviation:</label>
                                    <Tooltip tooltip={
                                        <sup>
                                            <i className="fas fa-question-circle">
                                            </i>
                                        </sup>}>
                                        <span>
                                            The square root of the average square
                                            distance from the mean.
                                        </span>
                                    </Tooltip>
                                </div>
                                <div className="form-row slider-labels">
                                    <div id="stdDev"
                                        style={{ height: '50px', width: '100%' }}>
                                        <Slider
                                            disabled={!seed}
                                            min={1}
                                            max={4}
                                            value={stdDev}
                                            marks={{ 1: 1, 2: 2, 3: 3, 4: 4 }}
                                            step={1}
                                            onChange={(val) => {
                                                handleChange('stdDev', val);
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <input className="btn btn-primary btn-block"
                                        disabled={seed ? false : true}
                                        id="generate-population"
                                        type="submit"
                                        value="Generate Population" />
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
