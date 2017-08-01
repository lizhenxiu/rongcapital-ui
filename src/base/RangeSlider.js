import React from 'react';
import Slider from './Slider';

const RangeSlider = (props) =>
    <Slider {...props} isRange={ true } />;

RangeSlider.displayName = 'RangeSlider';

export default RangeSlider;
