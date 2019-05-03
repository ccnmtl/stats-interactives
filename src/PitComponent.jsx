import React from 'react';
import PropTypes from 'prop-types';

export function PitComponent({ style, children }) {
    return (
        <div aria-hidden="true"
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

PitComponent.propTypes = {
    style: PropTypes.object,
    children: PropTypes.number
};

PitComponent.defaultProps = {
    style: null,
    children: null
};
