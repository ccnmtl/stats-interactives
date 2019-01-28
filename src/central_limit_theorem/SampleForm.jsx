import React from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';

export const SampleForm = ({
    sampleSize, numberOfSamples, handleChange, runSample, sampleMeansIdx,
    handleSampleMeansIdx, showSampleBtn}) => {

    const handleFormChange = (e) => {
        handleChange(e.target.id, forceNumber(e.target.value));
    };

    const handleRunSample = (e) => {
        e.preventDefault();
        runSample();
    };

    return (
        <>
        <form onSubmit={handleRunSample} >
            <fieldset>
                <legend>Step 2:<br/>Set the sample parameters.</legend>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="sampleSize"
                            className="float-right">Sample Size: </label>
                    </div>
                    <div className="form-group col-md-7">
                        <input type="number"
                            id="sampleSize"
                            min="1"
                            max="1000"
                            value={sampleSize}
                            disabled={showSampleBtn ? true : false}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="numberOfSamples"
                            className="float-right">Num. of samples:</label>
                    </div>
                    <div className="form-group col-md-7">
                        <input type="number"
                            id="numberOfSamples"
                            min="1"
                            value={numberOfSamples}
                            disabled={showSampleBtn ? true : false}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group offset-md-5 col-md-7">
                        <input className="btn btn-primary"
                            disabled={showSampleBtn ? true : false}
                            id="run-sample"
                            type="submit"
                            value="Sample"/>
                    </div>
                </div>
            </fieldset>
        </form>
        </>
    );
};

SampleForm.propTypes = {
    sampleSize: PropTypes.number,
    numberOfSamples: PropTypes.number,
    handleChange: PropTypes.func,
    runSample: PropTypes.func,
    sampleMeansIdx: PropTypes.number,
    enableSampleSlider: PropTypes.bool,
    handleSampleMeansIdx: PropTypes.func,
    handleResetPopulation: PropTypes.func,
    showSampleBtn: PropTypes.bool,
};
