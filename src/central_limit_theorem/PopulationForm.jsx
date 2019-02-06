import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';
import { LabeledSlider } from '../LabeledSlider';
import { DISTRIBUTION_TYPE } from './CentralLimitGraph';
import ReactHintFactory from 'react-hint';
const ReactHint = ReactHintFactory(React);

export const PopulationForm  = (
    {seed, populationSize, mean, stdDev, distType,
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
        <ReactHint autoPosition events />
        <form onSubmit={handleGenPop}>
            <fieldset>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="seed" className="float-right">
                            Seed:<button className="help-tooltip"
                                data-rh="This is a seed">
                                <sup>
                                    <i className="fas fa-question-circle"></i>
                                </sup>
                            </button>
                        </label>
                    </div>
                    <div className="form-group col-md-7">
                        <input type="text"
                            id="seed"
                            value={seed}
                            onChange={handleFormChange}/>
                    </div>
                </div>
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
                    <div className="form-group col-md-2">
                        <label htmlFor="mean"
                            className="float-right">
                            Mean:<button className="help-tooltip"
                                data-rh="Represents the arithmetic average of
                                         the values in the population.">
                                <sup>
                                    <i className="fas fa-question-circle"></i>
                                </sup>
                            </button>
                        </label>
                    </div>
                    <div className="form-group col-md-10">
                        <LabeledSlider
                            disabled={seed ? false : true}
                            min={-10}
                            max={10}
                            values={[mean]}
                            snap
                            pitPoints={[-10, -9, -8, -7, -6, -5, -4, -3, -2,
                                -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            snapPoints={[-10, -9, -8, -7, -6, -5, -4, -3, -2,
                                -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            onChange={(sliderState) => {
                                handleChange('mean', sliderState.values[0]);
                            }}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label htmlFor="stdDev"
                            className="float-right">
                            Standard Deviation:<button className="help-tooltip"
                                data-rh="Represents the average of the square
                                distances from the mean of the population.">
                                <sup>
                                    <i className="fas fa-question-circle"></i>
                                </sup>
                            </button>
                        </label>
                    </div>
                    <div className="form-group col-md-10">
                        <LabeledSlider
                            disabled={seed ? false : true}
                            min={1}
                            max={6}
                            values={[stdDev]}
                            snap
                            pitPoints={[-1, 2, 3, 4, 5, 6]}
                            snapPoints={[1, 2, 3, 4, 5, 6]}
                            onChange={(sliderState) => {
                                handleChange('stdDev', sliderState.values[0]);
                            }}/>
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
    handleChange: PropTypes.func,
    showPopBtn: PropTypes.bool,
    sampleSize: PropTypes.number,
    handleGeneratePopulation: PropTypes.func
};
