import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { NumericField } from '../utility_components/NumericField';
import { Tooltip } from '../utility_components/Tooltip';

export const SampleRangeSlider = ({ numberOfSamples,
    sampleMeansIdx, handleSampleMeansIdx, sampleSize, activeSampleMean,
    observationIdx, observationData, handleObservationIdx }) => {
    return (
        <>
            <form className="sample-range-slider was-validated">
                <fieldset>
                    <div className="form-group">
                        <div className="form-row">
                            <NumericField
                                id={'observation-idx'}
                                className={'form-control form-control-sm'}
                                min={1}
                                max={sampleSize}
                                value={observationIdx ?
                                    observationIdx : 1}
                                disabled={observationIdx ?
                                    false : true}
                                onChange={handleObservationIdx} />
                            &nbsp;of {sampleSize} observations in sample {
                                sampleMeansIdx ? sampleMeansIdx : 1}.
                            <div className='invalid-feedback'>
                                The number entered is outside the
                                range of the dataset.
                            </div>
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>
                                    Slide to see each observation in a sample on
                                    top graph;<br />
                                    the current observation is shown in yellow.
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="form-row slider-no-labels">
                        <div style={{ height: '50px', width: '100%' }}>
                            <Slider
                                min={1}
                                max={sampleSize}
                                step={1}
                                value={observationIdx ?
                                    observationIdx : 1}
                                disabled={observationIdx ?
                                    false : true}
                                onChange={handleObservationIdx} />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="form-row">
                            <NumericField
                                className={'form-control form-control-sm'}
                                id={'sample-means-idx'}
                                min={1}
                                max={numberOfSamples}
                                value={sampleMeansIdx ?
                                    sampleMeansIdx : 1}
                                disabled={sampleMeansIdx ?
                                    false : true}
                                onChange={handleSampleMeansIdx} />
                            &nbsp;of {numberOfSamples} samples.
                            <div className='invalid-feedback'>
                                The number entered is outside the
                                range of the dataset.
                            </div>
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Slide to see a different sample on top
                                    graph, as well as the distribution of <br />
                                    sample means up to the current sample (shown
                                    in yellow) on bottom graph.</span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="form-row slider-no-labels">
                        <div style={{ height: '50px', width: '100%' }}>
                            <Slider
                                disabled={sampleMeansIdx ?
                                    false : true}
                                min={1}
                                max={numberOfSamples}
                                step={1}
                                value={sampleMeansIdx ?
                                    sampleMeansIdx : 1}
                                onChange={handleSampleMeansIdx} />
                        </div>
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
