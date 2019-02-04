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
                <legend>
                Set the parameters.
                </legend>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="seed" className="float-right">
                            Seed: </label>
                    </div>
                    <div className="form-group col-md-7">
                        <input type="text"
                            id="seed"
                            value={seed}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                { embed &&
                    <>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label htmlFor="populationSize"
                                className="float-right">
                                Population Size: </label>
                        </div>
                        <div className="form-group col-md-7">
                            <input type="number"
                                id="populationSize"
                                disabled={seed ? false : true}
                                value={populationSize}
                                onChange={handleFormChange}/>
                        </div>
                    </div>
                        </>}
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="distType"
                            className="float-right">
                            Distribution Type: </label>
                    </div>
                    <div className="form-group col-md-7">
                        <select id="distType"
                            onChange={handleFormChange}
                            disabled={seed ? false : true}
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
                            disabled={seed ? false : true}
                            id="mean"
                            min="-10"
                            max="10"
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
                            disabled={seed ? false : true}
                            id="stdDev"
                            min="-6"
                            max="6"
                            value={stdDev}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group offset-md-5 col-md-7">
                        <input className="btn btn-primary"
                            disabled={seed ? false : true}
                            id="generate-population"
                            type="submit"
                            value="Generate Population"/>
                    </div>
                </div>
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
    sampleSize: PropTypes.number,
    handleGeneratePopulation: PropTypes.func
};
