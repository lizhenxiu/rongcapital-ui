import React from 'react';
import { storiesOf } from '@storybook/react';

import { Slider } from '../../src/base';

storiesOf('base.Slider', module)
    .add('initialize by default', () => (
        <Slider />
    ));

