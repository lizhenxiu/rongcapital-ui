import React from 'react';
import { storiesOf } from '@storybook/react';

import { DragDropView } from '../src/core';

const JSONStyle = {
    height: 80,
    width: 80,
    backgroundColor: 'red',
    color: 'white',
};

storiesOf('core.DragDropView', module)
    .add('initialize by default', () => (
        <DragDropView />
    ))
    .add('initialize by 1 child', () => (
        <DragDropView width={ 500 } height={ 500 }>
            <div style={ JSONStyle }>items 0</div>
        </DragDropView>
    ));
