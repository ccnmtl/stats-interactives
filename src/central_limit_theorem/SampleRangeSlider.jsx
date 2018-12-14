import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';

export const SampleRangeSlider = ({enableSampleSlider, numberOfSamples,
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
                        disabled={ enableSampleSlider ? false : true}
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
    enableSampleSlider: PropTypes.bool,
    numberOfSamples: PropTypes.number,
    sampleMeansIdx: PropTypes.number,
    handleSampleMeansIdx: PropTypes.func,
};
