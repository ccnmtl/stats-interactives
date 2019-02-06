import React from 'react';

export const SampleRangeSliderForm = () => {
    return (
        <form>
            <fieldset>
                <legend>Observe the changes.</legend>
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
    );
};
