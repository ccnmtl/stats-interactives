import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import ReactTooltip from 'react-tooltip';
import { NumericField } from '../utility_components/NumericField';

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
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="observation-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <div className='invalid-feedback'>
                            The number entered is outside the
                            range of the dataset.
                        </div>
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
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="sampleMean-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <div className='invalid-feedback'>
                            The number entered is outside the
                            range of the dataset.
                        </div>
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
