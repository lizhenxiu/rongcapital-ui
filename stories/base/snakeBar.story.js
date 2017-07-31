import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import range from 'ramda/src/range';
import remove from 'ramda/src/remove';
import map from 'ramda/src/map';
import compose from 'ramda/src/compose';
import append from 'ramda/src/append';

import autobind from 'core-decorators/lib/autobind';

import { AppTheme, SnakeBar } from '../../src';

const POSITION = SnakeBar.POSITION;
// const THEME = AppTheme.THEME;

const create = (content) =>
    <SnakeBar.Message key={ content }>{ content.toString() }</SnakeBar.Message>;
const mapItems = (fn) => (arr) => map(fn, arr);
const generate = compose(mapItems(create), range);

class Tester extends Component {
    counter = 5;

    static propTypes = {
        delay: PropTypes.number
    };

    static defaultProps = {
        delay: 0
    };

    constructor (props) {
        super(props);
        this.state = {
            messages: generate(0, this.counter)
        };
    }

    @autobind
    handleAppend () {
        this.setState(({ messages }) => ({
            messages: append(create(this.counter), messages)
        }), () => ++this.counter);
    }

    @autobind
    handleRemove (event, index) {
        this.setState(({ messages }) => ({
            messages: remove(index, 1, messages)
        }));
    }

    render () {
        const { messages } = this.state;
        const { delay } = this.props;
        return (
            <div>
                <SnakeBar
                    position={ POSITION.CENTER }
                    delay={ delay }
                    onRequestRemove={ this.handleRemove }>
                    { messages }
                </SnakeBar>
                {
                    delay !== 0 &&
                    <div>
                        <button onClick={ compose(this.handleAppend, action('append message')) }>Append Message</button>
                    </div>
                }
            </div>
        );
    }
}

storiesOf('base.SnakeBar', module)
    .add('initialize by default', () => (
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
            <SnakeBar position={ POSITION.CENTER } delay={ 5E3 }>
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
    .add('initialize by add and remove', () => (
        <AppTheme>
            <Tester />
        </AppTheme>
    ))
    .add('initialize by delay 3 and remove', () => (
        <AppTheme>
            <Tester delay={ 3E3 } />
        </AppTheme>
    ));
