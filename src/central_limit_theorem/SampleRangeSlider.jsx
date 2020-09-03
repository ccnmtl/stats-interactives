import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { NumericField } from '../utility_components/NumericField';
import { Tooltip } from '../utility_components/Tooltip';

export const SampleRangeSlider = ({numberOfSamples,
    sampleMeansIdx, handleSampleMeansIdx, sampleSize, activeSampleMean,
    observationIdx, observationData, handleObservationIdx}) => {
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
                                    top graph;<br/>
                                    the current observation is shown in yellow.
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="form-row slider-no-labels">
                        <div style={{ height: '50px', width: '100%'}}>
                            <Rheostat
                                min={1}
                                max={sampleSize}
                                values={[observationIdx ?
                                    observationIdx : 1]}
                                disabled={observationIdx ?
                                    false : true}
                                onValuesUpdated={(sliderState) => {
                                    handleObservationIdx(
                                        sliderState.values[0]);
                                }} />
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
                                    graph, as well as the distribution of <br/>
                                    sample means up to the current sample (shown
                                    in yellow) on bottom graph.</span>
                            </Tooltip>
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
                                onValuesUpdated={(sliderState) => {
                                    handleSampleMeansIdx(
                                        sliderState.values[0]);
                                }} />
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
