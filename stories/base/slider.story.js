import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Slider } from '../../src/base';
import { RangeSlider } from '../../src/base';

class Tester extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return <Slider min={ 0 } max={ 200 } current={ 100 } />;
    }
}

class MoreSlider extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <div>
                <Slider />
                <Slider />
                <RangeSlider />
                <RangeSlider />
            </div>
        );
    }
}

storiesOf('base.Slider', module)
    .add('initialize by default', () => (
        <Slider />
    ))
    .add('initialize by current', () => (
        <Slider current={ 50 } />
    ))
    .add('initialize by isRange true', () => (
        <RangeSlider />
    ))
    .add('initialize by left and right', () => (
        <RangeSlider left={ 25 } right={ 75 } />
    ))
    .add('initialize by changing property', () => (
        <Tester />
    ))
    .add('initialize by more sliders', () => (
        <MoreSlider />
    ));
