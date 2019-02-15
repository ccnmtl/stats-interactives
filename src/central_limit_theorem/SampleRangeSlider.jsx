import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';
import { Slider } from '../LabeledSlider';

export default class SampleRangeSlider extends React.Component {
    handleFocus(e) {
        e.target.select();
    }
    render() {
        const handleSampleMeans = (e) => {
            e.preventDefault();
            this.props.handleSampleMeansIdx(forceNumber(e.target.value));
        };
        const handleObsIdx = (e) => {
            e.preventDefault();
            this.props.handleObservationIdx(forceNumber(e.target.value));
        };
        return (
            <>
                <form className="sample-range-slider">
                    <fieldset>
                        <div className="form-group">
                            <div className="form-row">
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    id="sampleIdx"
                                    min="1"
                                    max={this.props.numberOfSamples}
                                    value={this.props.sampleMeansIdx ?
                                        this.props.sampleMeansIdx : 1}
                                    disabled={this.props.sampleMeansIdx ?
                                        false : true}
                                    onFocus={this.handleFocus}
                                    onChange={handleSampleMeans} />
            &nbsp;of {this.props.numberOfSamples} samples
                            </div>
                        </div>
                        <div className="form-row slider-no-labels">
                            <Slider
                                disabled={this.props.sampleMeansIdx ?
                                    false : true}
                                min={1}
                                max={this.props.numberOfSamples}
                                values={[this.props.sampleMeansIdx ?
                                    this.props.sampleMeansIdx : 1]}
                                snap={true}
                                onValuesUpdated={(sliderState) => {
                                    this.props.handleSampleMeansIdx(
                                        sliderState.values[0]);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <div className="form-row">
                                <input
                                    type="number"
                                    id="sampleIdx"
                                    className="form-control form-control-sm"
                                    min="1"
                                    max={this.props.sampleSize}
                                    value={this.props.observationIdx ?
                                        this.props.observationIdx : 1}
                                    disabled={this.props.observationIdx ?
                                        false : true}
                                    onFocus={this.handleFocus}
                                    onChange={handleObsIdx} />
            &nbsp;of {this.props.sampleSize} observations. Current Value {
                                    this.props.observationData ?
                                        this.props.observationData[0][2] : 0}
                            </div>
                        </div>
                        <div className="form-row slider-no-labels">
                            <Slider
                                min={1}
                                max={this.props.sampleSize}
                                values={[this.props.sampleMeansIdx ?
                                    this.props.sampleMeansIdx : 1]}
                                snap={true}
                                disabled={this.props.observationIdx ?
                                    false : true}
                                onValuesUpdated={(sliderState) => {
                                    this.props.handleObservationIdx(
                                        sliderState.values[0]);
                                }} />
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

SampleRangeSlider.propTypes = {
    numberOfSamples: PropTypes.number,
    sampleMeansIdx: PropTypes.number,
    handleSampleMeansIdx: PropTypes.func,
    sampleSize: PropTypes.number,
    observationIdx: PropTypes.number,
    observationData: PropTypes.array,
    handleObservationIdx: PropTypes.func
};
