import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';
import { DISTRIBUTION_TYPE } from './CentralLimitGraph';

export const PopulationForm  = (
    {seed, populationSize, mean, stdDev, distType, embed,
        sampleSize, handleChange, handleGeneratePopulation, showPopBtn}) => {
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
        <form onSubmit={handleGenPop}>
            <fieldset>
                <legend>Step 1: Population Parameters</legend>
                { !embed &&
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label htmlFor="seed" className="float-right">
                                Seed: </label>
                        </div>
                        <div className="form-group col-md-7">
                            <input type="text"
                                id="seed"
                                value={seed}
                                disabled={showPopBtn ? false : true}
                                onChange={handleFormChange}/>
                        </div>
                    </div> }
                { !embed &&
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label htmlFor="populationSize"
                                className="float-right">
                                Population Size: </label>
                        </div>
                        <div className="form-group col-md-7">
                            <input type="number"
                                disabled={showPopBtn ? false : true}
                                id="populationSize"
                                value={populationSize}
                                onChange={handleFormChange}/>
                        </div>
                    </div> }
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="distType"
                            className="float-right">
                            Distribution Type: </label>
                    </div>
                    <div className="form-group col-md-7">
                        <select id="distType"
                            disabled={showPopBtn ? false : true}
                            onChange={handleFormChange}
                            value={distType}>
                            { DISTRIBUTION_TYPE.map(
                                (e) => (<option key={e.value} value={e.value}>
                                    {e.display}</option>)) }
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="mean"
                            className="float-right">Mean:</label>
                    </div>
                    <div className="form-group col-md-7">
                        <input type="number"
                            id="mean"
                            min="-10"
                            max="10"
                            disabled={showPopBtn ? false : true}
                            value={mean}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="stdDev"
                            className="float-right">StdDev: </label>
                    </div>
                    <div className="form-group col-md-7">
                        <input type="number"
                            id="stdDev"
                            min="-6"
                            max="6"
                            disabled={showPopBtn ? false : true}
                            value={stdDev}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                { showPopBtn &&
                <div className="form-row">
                    <div className="form-group offset-md-5 col-md-7">
                        <input className="btn btn-primary"
                            id="generate-population"
                            type="submit"
                            value="Generate Population"/>
                    </div>
                </div>}
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
    embed: PropTypes.bool,
    handleChange: PropTypes.func,
    showPopBtn: PropTypes.bool,
};
