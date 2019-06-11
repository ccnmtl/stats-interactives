import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';

export class NumericField extends Component {
    constructor(props) {
        super(props);

        this.setValue = this.setValue.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onClick = this.onClick.bind(this);

        this.state = {
            value: this.props.value,
            fieldValue: this.props.value,
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.value) {
            return {
                value: props.value,
                fieldValue: props.value,
            };
        } else {
            return null;
        }
    }
    onFocus(e) {
        e.target.select();
    }
    setValue(e) {
        // Validate and push state up here
        let val = forceNumber(e.target.value);
        if (val >= this.props.min && val <= this.props.max) {
            if (this.props.onChange) {
                this.props.onChange(val);
            }
            this.setState({
                value: val,
                fieldValue: val,
            });
        }
    }
    onChange(e) {
        // track local changes here
        e.preventDefault();
        this.setState({
            fieldValue: e.target.value,
        });
    }
    onKeyUp(e) {
        if (e.keyCode === 38 || e.keyCode === 40) {
            this.setValue(e);
        }
    }
    onClick(e) {
        if (this.state.value !== e.currentTarget.value) {
            e.target = e.currentTarget;
            this.setValue(e);
        }
    }
    render() {
        return (
            <input type="number"
                id={this.props.id}
                className={this.props.className}
                disabled={typeof this.props.disabled === 'boolean' ?
                    this.props.disabled : undefined}
                step={this.props.step ? this.props.step : 1}
                min={this.props.min}
                max={this.props.max}
                value={this.state.fieldValue}
                autoFocus={this.props.autoFocus}
                onFocus={this.onFocus}
                onBlur={this.setValue}
                onKeyUp={this.onKeyUp}
                onClick={this.onClick}
                onChange={this.onChange}/>
        );
    }
}

NumericField.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    step: (props, propName, componentName) => {
        let val = props[propName];
        if (typeof val === 'number' && val < 0) {
            return new Error(
                'Invalid value for "step" prop: ' +
                'the provided step, ' + val + ', is less than 0'
            );
        } else if (typeof val !== 'number' && typeof val !== 'undefined') {
            return new Error('Val Prop Invalid Type: expected val to be ' +
                ' Number, received ' + typeof val);
        }
    },
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: (props, propName, componentName) => {
        let min = props['min'];
        let max = props['max'];
        let val = props[propName];
        // First check type
        if (typeof val !== 'number') {
            return new Error('Val Prop Invalid Type: expected val to be ' +
                ' Number, received ' + typeof val);
        }
        // Then check that the val is within range
        if (val < min || val > max) {
            let diff = val < min ? 'less than the min: ' + min :
                'greater than the max: ' + max;
            return new Error(
                'Invalid Value: the provided value ' + val +
                ' is ' + diff
            );
        }
    },
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
};
