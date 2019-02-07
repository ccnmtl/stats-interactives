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
                <div className="form-row">
                    <div className="form-group col-xs-3">
                        <input type="number"
                            id="sampleIdx"
                            min="1"
                            max={numberOfSamples}
                            value={sampleMeansIdx ? sampleMeansIdx : 1}
                            disabled={sampleMeansIdx ? false : true}
                            onChange={handleSampleMeans}/>
                        of {numberOfSamples} samples
                    </div>
                </div>
                <div className="form-group col-xs-9">
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
                <div className="form-row">
                    <div className="form-group col-xs-3">
                        <input type="number"
                            id="sampleIdx"
                            min="1"
                            max={sampleSize}
                            value={observationIdx ? observationIdx : 1}
                            disabled={observationIdx ? false : true}
                            onChange={handleObsIdx}/>
                        of {sampleSize} observations.
                        Current value: {
                            observationData ? observationData[0][0] : 0}
                    </div>
                </div>
                <div className="form-group col-xs-9">
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
