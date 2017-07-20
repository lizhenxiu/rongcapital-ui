import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { NavigationView } from '../../src/core';

import compose from '../../src/utils/compose';

const ItemView = ({ children, next, prev }) => (
    <div>
        <p>{ children }</p>
        <div>
            <button onClick={ compose(prev, action('prev')) }>Prev</button>
            <button onClick={ compose(next, action('next')) }>Next</button>
        </div>
    </div>
);

ItemView.propTypes = {
    children: PropTypes.any,
    next: PropTypes.func,
    prev: PropTypes.func,
};

/* eslint-disable no-console */
const beforePrev = () => console.info('beforePrev');
const afterPrev = () => console.info('afterPrev');
const beforeNext = () => console.info('beforeNext');
const afterNext = () => console.info('afterNext');
/* eslint-enable no-console */

storiesOf('core.NavigationView', module)
    .add('initialize by default', () => (
        <NavigationView />
    ))
    .add('initialize by 1 child', () => (
        <NavigationView width={ 200 } height={ 100 }>
            <ItemView>item 0</ItemView>
        </NavigationView>
    ))
    .add('initialize by index = 2 and 3 children', () => (
        <NavigationView width={ 200 } height={ 100 } index={ 2 }>
            <ItemView>item 0</ItemView>
            <ItemView>item 1</ItemView>
            <ItemView>item 2</ItemView>
        </NavigationView>
    ))
    .add('initialize by 5 children', () => (
        <NavigationView width={ 200 } height={ 100 }
            beforePrev={beforePrev}
            afterPrev={afterPrev}
            beforeNext={beforeNext}
            afterNext={afterNext}>
            <ItemView>item 0</ItemView>
            <ItemView>item 1</ItemView>
            <ItemView>item 2</ItemView>
            <ItemView>item 3</ItemView>
            <ItemView>item 4</ItemView>
        </NavigationView>
    ));
