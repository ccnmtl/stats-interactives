/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import { NumericField } from '../utility_components/NumericField';

configure({adapter: new Adapter()});

describe('The NumericField componenet', () => {
    test('render', () => {
        const wrapper = shallow(<NumericField min={1} max={100} value={42}/>);
        expect(wrapper.exists()).toEqual(true);
    });

    test('to throw an errow when no props are passed', () => {
        let originalConsoleError = console.error;
        console.error = jest.fn();
        const wrapper = shallow(<NumericField />);
        expect(console.error).toHaveBeenCalledTimes(3);

        console.error = originalConsoleError;
    });

    test('to throw an errow when a value prop greater than the max is passed', () => {
        let originalConsoleError = console.error;
        console.error = jest.fn();
        const wrapper = shallow(<NumericField min={1} max={100} value={142}/>);
        expect(console.error).toHaveBeenCalledTimes(1);

        console.error = originalConsoleError;
    });

    test('to throw an errow when a value prop less than the min is passed', () => {
        let originalConsoleError = console.error;
        console.error = jest.fn();
        const wrapper = shallow(<NumericField min={1} max={100} value={0}/>);
        expect(console.error).toHaveBeenCalledTimes(1);

        console.error = originalConsoleError;
    });

    test('to throw an errow when an invalide value prop type is passed', () => {
        let originalConsoleError = console.error;
        console.error = jest.fn();
        const wrapper = shallow(<NumericField min={1} max={100} value={'space lizard'}/>);
        expect(console.error).toHaveBeenCalledTimes(1);

        console.error = originalConsoleError;
    });

    test('to throw an errow when an invalid step prop type is passed', () => {
        let originalConsoleError = console.error;
        console.error = jest.fn();
        const wrapper = (<NumericField min={1} max={100} value={42} step={new String()}/>);
        expect(console.error).toHaveBeenCalledTimes(1);

        console.error = originalConsoleError;
    });

    test('that the state of the component is updated when value prop is updated', () => {
        const wrapper = mount(<NumericField min={1} max={100} value={42}/>);
        const instance = wrapper.instance();

        wrapper.setProps({value: 15})
        expect(wrapper.state('value')).toEqual(15);
    });

    test('that pressing the up or down button updates the value', () => {
        // We don't need to test that the value is updated, just that the
        // expected handler is called.
        const wrapper = shallow(<NumericField min={1} max={100} value={42}/>);
        const instance = wrapper.instance();

        // set up a dummy func
        instance.setValue = (e) => { return; };
        jest.spyOn(instance, 'setValue');

        // test the up arrow
        wrapper.find('input').simulate('keyUp', {keyCode: 38});
        expect(instance.setValue).toHaveBeenCalled();

        // test the down arrow
        wrapper.find('input').simulate('keyUp', {keyCode: 40});
        expect(instance.setValue).toHaveBeenCalled();
    });


});
