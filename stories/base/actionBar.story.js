import React from 'react';
import { storiesOf } from '@storybook/react';

import { ActionBar } from '../../src/base';

storiesOf('base ActionBar', module)
    .add('initialize by items', () => (
        <ActionBar>
            <ActionBar.Item left={ true }>
                some one
            </ActionBar.Item>
            <ActionBar.Item>
                some one
            </ActionBar.Item>
            <ActionBar.Item>
                some one
            </ActionBar.Item>
            <ActionBar.Item>
                some one
            </ActionBar.Item>
        </ActionBar>
    ));
