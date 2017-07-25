import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import range from 'ramda/src/range';
import map from 'ramda/src/map';
import compose from 'ramda/src/compose';

import { AppTheme, SnakeBar } from '../../src';

const POSITION = SnakeBar.POSITION;
//const THEME = AppTheme.THEME;

const create = (content) => <SnakeBar.Message key={ content }>{ content.toString() }</SnakeBar.Message>;
const mapItems = (fn) => (arr) => map(fn, arr);

const generate = compose(mapItems(create), range);

class Tester extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: generate(0, 5)
        };
    }

    render() {
        const { messages } = this.state;
        return (
            <SnakeBar position={ POSITION.CENTER } delay={ 0 }>
                { messages }
            </SnakeBar>
        );
    }
}

storiesOf('base.SnakeBar', module)
    .add('initialize by items', () => (
        <AppTheme>
            <SnakeBar />
        </AppTheme>
    ))
    .add('initialize by 1 child, position is default(left)', () => (
        <AppTheme>
            <SnakeBar>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
            </SnakeBar>
        </AppTheme>
    ))
    .add('initialize by 2 child, position is right', () => (
        <AppTheme>
            <SnakeBar position={ POSITION.RIGHT }>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
            </SnakeBar>
        </AppTheme>
    ))
    .add('initialize by 2 child, position is center', () => (
        <AppTheme>
            <SnakeBar position={ POSITION.CENTER }>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
            </SnakeBar>
        </AppTheme>
    ))
    .add('initialize by delay 5', () => (
        <AppTheme>
            <SnakeBar position={ POSITION.CENTER } delay={ 5 }>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
                <SnakeBar.Message>
                    Hello World
                </SnakeBar.Message>
            </SnakeBar>
        </AppTheme>
    ))
    .add('initialize by delay 5 and inc', () => (
        <AppTheme>
            <Tester />
        </AppTheme>
    ));
