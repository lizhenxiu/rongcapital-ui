import React from 'react';
import { storiesOf } from '@storybook/react';

import { Breadcrumbs } from '../../src/base';

storiesOf('base.Breadcrumbs', module)
    .add('initialize by items', () => (
        <Breadcrumbs>
            <span title="hello">items 0</span>
            <span>items 1</span>
            <span>items 2</span>
            <span>items 3</span>
            <span>items 4</span>
            <span>items 5</span>
            <span>items 6</span>
        </Breadcrumbs>
    ));
