import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { PitComponent } from '../PitComponent';
import ReactTooltip from 'react-tooltip';

export const SampleForm = ({
    sampleSize, numberOfSamples, handleChange, runSample, showSampleForm}) => {

    const handleRunSample = (e) => {
        e.preventDefault();
        runSample();
    };

    return (
        <form onSubmit={handleRunSample} >
            {showSampleForm &&
            <fieldset>
                <div className="form-group">
                    <div className="form-row">
                        <label htmlFor="sampleSize"
                            className="float-right">
                            Select a Sample Size:</label>
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="sampleSize-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <ReactTooltip id="sampleSize-tt" event="focus"
                            eventOff="blur">
                            <span>Represents the number of observations
                                in a given sample.</span>
                        </ReactTooltip>
                    </div>
                    <div className="form-row slider-labels">
                        <div id="sampleSize"
                            style={{ height: '50px', width: '100%'}}>
                            <Rheostat
                                min={1}
                                max={100}
                                values={[sampleSize]}
                                snap
                                pitComponent={PitComponent}
                                pitPoints={[1, 5, 25, 50, 100]}
                                snapPoints={[1, 5, 25, 50, 100]}
                                onChange={(sliderState) => {
                                    handleChange('sampleSize',
                                        sliderState.values[0]);
                                }}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <label htmlFor="numberOfSamples"
                            className="float-right">
                            Select the Number of Samples:</label>
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="numberOfSamples-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <ReactTooltip id="numberOfSamples-tt" event="focus"
                            eventOff="blur">
                            <span>The number of individual samples,
                                each of size n, drawn in the simulation.
                            </span>
                        </ReactTooltip>
                    </div>
                    <div className="form-row slider-labels">
                        <div id="numberOfSamples"
                            style={{ height: '50px', width: '100%'}}>
                            <Rheostat
                                min={1}
                                max={1000}
                                values={[numberOfSamples]}
                                snap
                                pitComponent={PitComponent}
                                pitPoints={[50, 100, 500, 1000]}
                                snapPoints={[50, 100, 500, 1000]}
                                onChange={(sliderState) => {
                                    handleChange('numberOfSamples',
                                        sliderState.values[0]);
                                }}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <input className="btn btn-primary btn-block"
                            id="run-sample"
                            type="submit"
                            value="Sample"/>
                    </div>
                </div>
            </fieldset>
            }
        </form>
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
    showSampleForm: PropTypes.bool,
};
