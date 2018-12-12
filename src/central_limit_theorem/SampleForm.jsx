import React from 'react';
import PropTypes from 'prop-types';

export const SampleForm = ({
    sampleSize, numberOfSamples, handleChange, runSample, sampleMeansIdx,
    enableSampleSlider, handleSampleMeansIdx}) => {

    const handleFormChange = (e) => {
        handleChange(e.target.id, e.target.value);
    };

    const handleRunSample = (e) => {
        e.preventDefault();
        runSample();
    };

    return (
        <>
        <form onClick={handleRunSample} >
            <fieldset>
                <legend>Step 2: Set the Sample Parameters</legend>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="sampleSize"
                            className="float-right">Sample Size: </label>
                    </div>
                    <div className="form-group col-md-8">
                        <input type="number"
                            id="sampleSize"
                            min="1"
                            max="1000"
                            value={sampleSize}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="numberOfSamples"
                            className="float-right">Number of samples:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <input type="number"
                            id="numberOfSamples"
                            min="1"
                            value={numberOfSamples}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                <div className="form-row float-right">
                    <input className="btn btn-primary"
                        id="run-sample"
                        type="submit"
                        value="Run Sample"/>
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
};
