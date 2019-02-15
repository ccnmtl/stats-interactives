import React from 'react';
import Rheostat from 'rheostat';
import PropTypes from 'prop-types';

function PitComponent({ style, children }) {
    return (
        <div
            style={{
                ...style,
                background: '#a2a2a2',
                width: 1,
                height: children % 10 === 0 ? 12 : 8,
                top: 10,
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div style={{marginTop: 16}}>
                {children}
            </div>
        </div>
    );
}

export class LabeledSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.values || [0],
        };

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(sliderState) {
        this.setState({
            values: sliderState.values,
        });
    }

    render() {
        const { ...passProps } = this.props;
        const { values } = this.state;

        return (
            <div
                style={{
                    height: '50px',
                    width: '100%',
                }}
            >
                <Rheostat
                    {...passProps}
                    onValuesUpdated={this.updateValue}
                    values={values}
                    pitComponent={PitComponent}
                />
            </div>
        );
    }
}

export class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.values || [0],
        };

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(sliderState) {
        // Call the custom callback if one is passed in.
        if (typeof this.props.onValuesUpdated === 'function') {
            this.props.onValuesUpdated(sliderState);
        }

        this.setState({
            values: sliderState.values,
        });
    }

    render() {
        const { ...passProps } = this.props;
        const { values } = this.state;

        return (
            <div
                style={{
                    height: '50px',
                    width: '100%',
                }}
            >
                <Rheostat
                    {...passProps}
                    onValuesUpdated={this.updateValue}
                    values={values}
                />
            </div>
        );
    }
}

PitComponent.propTypes = {
    style: PropTypes.object,
    children: PropTypes.number
};

PitComponent.defaultProps = {
    style: null,
    children: null
};

LabeledSlider.propTypes = {
    values: PropTypes.array
};

LabeledSlider.defaultProps = {
    values: null
};

Slider.propTypes = {
    values: PropTypes.array,
    onValuesUpdated: PropTypes.func
};

Slider.defaultProps = {
    values: null
};
