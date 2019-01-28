import React from 'react';
import PropTypes from 'prop-types';
{/*import {CopyToClipboard} from 'react-copy-to-clipboard';*/}

export const SampleRangeSliderForm = ({handleResetSimulation}) => {
    return (
        <>
        {/*
        <form onSubmit={handleResetSimulation}>
            <fieldset>
                <legend>Step 3: Observe the changes among samples</legend>
                <div>
                    <input className="btn btn-primary"
                        id="reset-simulation"
                        type="submit"
                        value="Reset Simulation"/>
                </div>
            </fieldset>
        </form>
        <CopyToClipboard text={location.href}>
            <button>Copy link to clipboard</button>
        </CopyToClipboard>
        */}
        <form>
            <fieldset>
                <legend>Step 3: Observe the changes among samples</legend>
                <label htmlFor="samplesize">Sample Size&nbsp;</label>
                <input type="number" size="3" /> of 1000
                <input type="range"
                    className="form-control-range"
                    id="samplesize" />
                <hr />
                <label htmlFor="currentsample">Current Sample&nbsp;</label>
                <input type="number" /> of 50
                <div>Current Value ##</div>
                <input type="range"
                    className="form-control-range"
                    id="currentsample" />
            </fieldset>
        </form>
        </>
    );
};

SampleRangeSliderForm.propTypes = {
    handleResetSimulation: PropTypes.func,
};
