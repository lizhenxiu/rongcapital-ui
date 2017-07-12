import React from 'react';
import { storiesOf } from '@storybook/react';

import { DragDropView } from '../src/core';

storiesOf('core.DragDropView', module)
    .add('initialize by default', () => (
        <DragDropView />
    ));
