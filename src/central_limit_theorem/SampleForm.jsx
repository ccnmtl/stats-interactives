import React from 'react';
import PropTypes from 'prop-types';
import { LabeledSlider } from '../LabeledSlider';
import ReactHintFactory from 'react-hint';
const ReactHint = ReactHintFactory(React);

export const SampleForm = ({
    sampleSize, numberOfSamples, handleChange, runSample, sampleMeansIdx,
    handleSampleMeansIdx, showSampleBtn}) => {

    const handleRunSample = (e) => {
        e.preventDefault();
        runSample();
    };

    return (
        <>
        <ReactHint autoPosition events />
        <form onSubmit={handleRunSample} >
            <fieldset>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="sampleSize"
                            className="float-right">
                            Sample Size:<button className="help-tooltip"
                                data-rh="Represents the number of observations
                                         in a given sample.">
                                <sup>
                                    <i className="fas fa-question-circle"></i>
                                </sup>
                            </button>
                        </label>
                    </div>
                    <div className="form-group col-md-10">
                        <LabeledSlider
                            disabled={showSampleBtn ? true : false}
                            min={50}
                            max={1000}
                            values={[sampleSize]}
                            snap
                            pitPoints={[50, 100, 500, 1000]}
                            snapPoints={[50, 100, 500, 1000]}
                            onChange={(sliderState) => {
                                handleChange('sampleSize',
                                    sliderState.values[0]);
                            }}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="numberOfSamples"
                            className="float-right">
                            Number of Samples:<button className="help-tooltip"
                                data-rh="The number of individual samples,
                                    each of size n, drawn in the simulation.">
                                <sup>
                                    <i className="fas fa-question-circle"></i>
                                </sup>
                            </button>
                        </label>
                    </div>
                    <div className="form-group col-md-10">
                        <LabeledSlider
                            disabled={showSampleBtn ? true : false}
                            min={1}
                            max={1000}
                            values={[numberOfSamples]}
                            snap
                            pitPoints={[1, 50, 100, 500, 1000]}
                            snapPoints={[1, 50, 100, 500, 1000]}
                            onChange={(sliderState) => {
                                handleChange('numberOfSamples',
                                    sliderState.values[0]);
                            }}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group offset-md-5 col-md-7">
                        <input className="btn btn-primary"
                            disabled={showSampleBtn ? true : false}
                            id="run-sample"
                            type="submit"
                            value="Sample"/>
                    </div>
                </div>
            </fieldset>
        </form>
        </>
    );
};

SampleForm.propTypes = {
    sampleSize: PropTypes.number,
    numberOfSamples: PropTypes.number,
    handleChange: PropTypes.func,
    runSample: PropTypes.func,
    sampleMeansIdx: PropTypes.number,
    enableSampleSlider: PropTypes.bool,
    handleSampleMeansIdx: PropTypes.func,
    handleResetPopulation: PropTypes.func,
    showSampleBtn: PropTypes.bool,
};
