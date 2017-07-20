import React from 'react';
import { storiesOf } from '@storybook/react';

import { ActionBar } from '../../src/base';

storiesOf('base ActionBar', module)
    .add('initialize by items', () => (
        <ActionBar>
            <ActionBar.Item width={ 80 }>
                some one
            </ActionBar.Item>
            <ActionBar.Item left={ true }>
                some two
            </ActionBar.Item>
            <ActionBar.Item>
                some three
            </ActionBar.Item>
            <ActionBar.Item width={ 80 }>
                some four
            </ActionBar.Item>
        </ActionBar>
    ));
