import React from 'react';
import { storiesOf } from '@storybook/react';

import { ListView } from '../src/core';

const MODE = ListView.MODE;

storiesOf('core.ListView', module)
    .add('initialize by default', () => (
        <ListView />
    ))
    .add('initialize by 1 items', () => (
        <ListView>
            <div>item 0</div>
        </ListView>
    ))
    .add('initialize by 6 items', () => (
        <div>
            <ListView>
                <div>item 0</div>
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
                <div>item 4</div>
                <div>item 5</div>
            </ListView>
            <hr />
            <ListView mode={ MODE.HORIZONTAL }>
                <div>item 0</div>
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
                <div>item 4</div>
                <div>item 5</div>
            </ListView>
            <hr />
            <ListView mode={ MODE.HORIZONTAL } inline>
                <div>item 0</div>
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
                <div>item 4</div>
                <div>item 5</div>
            </ListView>
        </div>
    ))
    .add('initialize by 6 items and itemLayout', () => (
        <ListView itemLayout={ itemLayout } inline>
            <div>item 0</div>
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
            <div>item 5</div>
        </ListView>
    ));

const itemLayout = (item, index) => {
    if (index % 2 == 0) {
        return React.cloneElement(item, {
            ...item.props,
            ...{
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                },
            },
        });
    }

    return item;
}
