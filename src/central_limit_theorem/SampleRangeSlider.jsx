import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';

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
                    <input type="range"
                        id="sample-slider"
                        min="1"
                        max={numberOfSamples}
                        value={sampleMeansIdx ? sampleMeansIdx : 1}
                        disabled={sampleMeansIdx ? false : true}
                        onChange={handleSampleMeans} />
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
                    <input type="range"
                        id="observation-slider"
                        min="1"
                        max={sampleSize}
                        value={observationIdx ? observationIdx : 1}
                        disabled={observationIdx ? false : true}
                        onChange={handleObsIdx} />
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
