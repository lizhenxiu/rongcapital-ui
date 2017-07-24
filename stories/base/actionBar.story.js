import React from 'react';
import { storiesOf } from '@storybook/react';

import { ActionBar } from '../../src/base';

storiesOf('base ActionBar', module)
    .add('initialize by items', () => (
        <ActionBar>
            <ActionBar.Item>Yes Master</ActionBar.Item>
            <ActionBar.Item>Yes Master</ActionBar.Item>
            <ActionBar.Item right>Yes Right Master</ActionBar.Item>
            <ActionBar.Item right>Yes Right Master</ActionBar.Item>
        </ActionBar>
    ));
