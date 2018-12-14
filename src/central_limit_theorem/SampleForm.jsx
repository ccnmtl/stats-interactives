import React from 'react';
import PropTypes from 'prop-types';

export const SampleForm = ({
    sampleSize, numberOfSamples, handleChange, runSample, sampleMeansIdx,
    enableSampleSlider, handleSampleMeansIdx, handleResetPopulation,
    showSampleBtn}) => {

    const handleFormChange = (e) => {
        handleChange(e.target.id, e.target.value);
    };

    const handleRunSample = (e) => {
        e.preventDefault();
        runSample();
    };

    const handleResetPop = (e) => {
        e.preventDefault();
        handleResetPopulation();
    };

    return (
        <>
        <form onSubmit={handleRunSample} >
            <fieldset>
                <legend>Step 2: Set the Sample Parameters</legend>
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
                            disabled={showSampleBtn ? false : true}
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
                            disabled={showSampleBtn ? false : true}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                { showSampleBtn &&
                <div className="form-row">
                    <div className="form-group offset-md-5 col-md-7">
                        <button className="btn btn-secondary mr-1"
                            id="reset-population"
                            onClick={handleResetPop}>
                            Reset
                        </button>
                        <input className="btn btn-primary"
                            id="run-sample"
                            type="submit"
                            value="Sample"/>
                    </div>
                </div>}
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
