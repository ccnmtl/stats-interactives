import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';
import Rheostat from 'rheostat';
import ReactTooltip from 'react-tooltip';

export const SampleRangeSlider = ({numberOfSamples,
    sampleMeansIdx, handleSampleMeansIdx, sampleSize, activeSampleMean,
    observationIdx, observationData, handleObservationIdx}) => {
    const handleFocus = (e) => {
        e.target.select();
    };
    const handleSampleMeans = (e) => {
        e.preventDefault();
        handleSampleMeansIdx(forceNumber(e.target.value));
    };
    const handleObsIdx = (e) => {
        e.preventDefault();
        handleObservationIdx(forceNumber(e.target.value));
    };
    return (
        <>
        <form className="sample-range-slider">
            <fieldset>
                <div className="form-group">
                    <div className="form-row">
                        <input
                            type="number"
                            id="sampleIdx"
                            className="form-control form-control-sm"
                            min="1"
                            max={sampleSize}
                            value={observationIdx ?
                                observationIdx : 1}
                            disabled={observationIdx ?
                                false : true}
                            onFocus={handleFocus}
                            onChange={handleObsIdx} />
                        &nbsp;of {sampleSize} observations in sample {
                            sampleMeansIdx ? sampleMeansIdx : 1}.
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="observation-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <ReactTooltip id="observation-tt"
                            event="focus"
                            eventOff="blur">
                            <span>Slide to see each observation in a sample on
                                top graph; the current observation is shown in
                                yellow.</span>
                        </ReactTooltip>
                    </div>
                </div>
                <div className="form-row slider-no-labels">
                    <div style={{ height: '50px', width: '100%'}}>
                        <Rheostat
                            min={1}
                            max={sampleSize}
                            values={[observationIdx ?
                                observationIdx : 1]}
                            snap={true}
                            disabled={observationIdx ?
                                false : true}
                            onValuesUpdated={(sliderState) => {
                                handleObservationIdx(
                                    sliderState.values[0]);
                            }} />
                    </div>
                </div>
                <div className="form-row">
                    Current Value: { observationData ?
                        observationData[0][2] : 0}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="form-row">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            id="sampleIdx"
                            min="1"
                            max={numberOfSamples}
                            value={sampleMeansIdx ?
                                sampleMeansIdx : 1}
                            disabled={sampleMeansIdx ?
                                false : true}
                            onFocus={handleFocus}
                            onChange={handleSampleMeans} />
                        &nbsp;of {numberOfSamples} samples.
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="sampleMean-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <ReactTooltip id="sampleMean-tt"
                            event="focus"
                            eventOff="blur">
                            <span>Slide to see a different sample on top
                                graph, as well as the distribution of sample
                                means up to the current sample (shown in
                                yellow) on bottom graph.</span>
                        </ReactTooltip>
                    </div>
                </div>
                <div className="form-row slider-no-labels">
                    <div style={{ height: '50px', width: '100%'}}>
                        <Rheostat
                            disabled={sampleMeansIdx ?
                                false : true}
                            min={1}
                            max={numberOfSamples}
                            values={[sampleMeansIdx ?
                                sampleMeansIdx : 1]}
                            snap={true}
                            onValuesUpdated={(sliderState) => {
                                handleSampleMeansIdx(
                                    sliderState.values[0]);
                            }} />
                    </div>
                </div>
                <div className="form-row">
                    Sample mean = x&#772;= {activeSampleMean}
                </div>
            </fieldset>
        </form>
        </>
    );
};

SampleRangeSlider.propTypes = {
    numberOfSamples: PropTypes.number,
    sampleMeansIdx: PropTypes.number,
    handleSampleMeansIdx: PropTypes.func,
    sampleSize: PropTypes.number,
    observationIdx: PropTypes.number,
    observationData: PropTypes.array,
    handleObservationIdx: PropTypes.func,
    activeSampleMean: PropTypes.number,
};
