import React from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const SampleRangeSliderForm = ({handleResetSimulation}) => {
    return (
        <>
        <form onSubmit={handleResetSimulation}>
            <fieldset>
                <legend>Step 3:<br />Observe the changes among samples.</legend>
                <div className="form-group offset-md-5 col-md-7">
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
        </>
    );
};

SampleRangeSliderForm.propTypes = {
    handleResetSimulation: PropTypes.func,
};
