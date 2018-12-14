import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';

export const SampleRangeSlider = ({numberOfSamples,
    sampleMeansIdx, handleSampleMeansIdx, runSample}) => {
    const handleSampleMeans = (e) => {
        e.preventDefault();
        handleSampleMeansIdx(forceNumber(e.target.value));
    };
    return (
        <>
        <form className="sample-range-slider">
            <fieldset>
                <div className="form-row">
                    <div className="form-group col-xs-3">
                        <label htmlFor="sampleIdx">Sample Size: </label>
                        <input type="number"
                            id="sampleIdx"
                            min="1"
                            max={numberOfSamples}
                            value={sampleMeansIdx}
                            onChange={handleSampleMeans}/>
                        of {numberOfSamples}
                    </div>
                </div>
                <div className="form-group col-xs-9">
                    <input type="range"
                        id="sample-slider"
                        min="1"
                        max={numberOfSamples}
                        value={sampleMeansIdx}
                        onChange={handleSampleMeans} />
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
};
