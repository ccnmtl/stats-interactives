import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';
import { Slider } from '../LabeledSlider';

export const SampleRangeSlider = ({numberOfSamples, sampleMeansIdx,
    handleSampleMeansIdx, sampleSize, observationIdx, observationData,
    handleObservationIdx}) => {
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
                        <input type="number"
                            className="form-control form-control-sm"
                            id="sampleIdx"
                            min="1"
                            max={numberOfSamples}
                            value={sampleMeansIdx ? sampleMeansIdx : 1}
                            disabled={sampleMeansIdx ? false : true}
                            onChange={handleSampleMeans}/>
                        &nbsp;of {numberOfSamples} samples
                    </div>
                </div>
                <div className="form-row slider-no-labels">
                    <Slider
                        disabled={sampleMeansIdx ? false : true}
                        min={1}
                        max={numberOfSamples}
                        values={[sampleMeansIdx ? sampleMeansIdx : 1]}
                        snap
                        onChange={(sliderState) => {
                            handleSampleMeansIdx(sliderState.values[0]);
                        }}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="form-row">
                        <input type="number"
                            id="sampleIdx"
                            className="form-control form-control-sm"
                            min="1"
                            max={sampleSize}
                            value={observationIdx ? observationIdx : 1}
                            disabled={observationIdx ? false : true}
                            onChange={handleObsIdx}/>
                        &nbsp;of {sampleSize} observations.
                        Current Value {
                            observationData ? observationData[0][2] : 0}
                    </div>
                </div>
                <div className="form-row slider-no-labels">
                    <Slider
                        min={1}
                        max={sampleSize}
                        values={[sampleMeansIdx ? sampleMeansIdx : 1]}
                        snap
                        disabled={observationIdx ? false : true}
                        onChange={(sliderState) => {
                            handleObservationIdx(sliderState.values[0]);
                        }}/>
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
};
