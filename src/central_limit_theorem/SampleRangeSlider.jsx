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
        <form>
            <fieldset>
                <div>
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
