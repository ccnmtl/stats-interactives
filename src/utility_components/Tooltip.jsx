/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Use a counter to set unique-ish ids
let componentIdCounter = 0;

export class Tooltip extends Component {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onButtonBlur = this.onButtonBlur.bind(this);

        this.componentId = 'tooltip-' + componentIdCounter++;

        this.initialState = {
            showTooltip: false,
        }
        this.state = this.initialState;
    }
    onButtonClick(e) {
        e.preventDefault();
        this.setState((state) => {
            return {
                showTooltip: !state.showTooltip,
            }
        })
    }
    onButtonBlur(e) {
        e.preventDefault();
        this.setState({
            showTooltip: false,
        });
    }
    render() {
        return (
            <>
                <button
                    className={'tooltip-trigger'}
                    type='button'
                    onClick={this.onButtonClick}
                    onBlur={this.onButtonBlur}
                    aria-describedby={this.componentId}>
                    {this.props.tooltip}
                    <span className="sr-only">toggle tooltip</span>
                </button>
                { this.state.showTooltip &&
                    <div role="tooltip"
                        id={this.componentId}
                        className={'tooltip-box'}>
                        { this.props.children }
                    </div>
                }
            </>
        );
    }
}


Tooltip.propTypes = {
    tooltip: PropTypes.object,
};
