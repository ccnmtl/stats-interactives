import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { forceNumber } from '../utils';

export class NumericField extends Component {
    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);

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
    onBlur(e) {
        // Validate and push state up here
        let val = forceNumber(e.target.value);
        if (val >= this.props.min && val <= this.props.max) {
            if (this.props.onChange) {
                this.props.onChange(val);
            }
            /* eslint-disable */
            console.log('setting the state');
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
    render() {
        return (
            <input type="number"
                id={this.props.id}
                className={this.props.className}
                disbaled={typeof this.props.disabled === 'boolean' ?
                        this.props.disbaled : undefined}
                min={this.props.min}
                max={this.props.max}
                value={this.state.fieldValue}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}/>
        );
    }
}

NumericField.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: (props, propName, componentName) => {
        let min = props['min'];
        let max = props['max'];
        let val = props[propName];
        // First check type
        if (typeof val !== 'number') {
            return new Error('Val Prop Invalid Type: expected val to be ' +
                ' Number, recieved ' + typeof val);
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
};
