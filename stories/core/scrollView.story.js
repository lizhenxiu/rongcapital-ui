import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { ScrollView } from '../../src/core';

const temp = {
    height: 100,
};

class Wrapper extends Component {

    state = {
        items: ['Hello', 'World', 'Some', 'One'],
    };

    intervalID = 0;

    componentDidMount() {
        this.intervalID = setInterval(() => {
            const newItems = [ ...this.state.items ];
            newItems.push(`newItem ${ newItems.length }`);

            this.setState({
                items: newItems
            });
        }, 2E3);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        const { items } = this.state;
        return (
            <ScrollView width={ 500 } height={ 300 }>
                { items.map(n => <div key={ n } style={ temp }>{ n }</div>) }
            </ScrollView>
        );
    }
}

storiesOf('core.ScrollView', module)
    .add('initialize by width 500 and height 500', () => (
        <ScrollView width={ 500 } height={ 500 } />
    ))
    .add('initialize by content height below to container', () => (
        <ScrollView width={ 500 } height={ 300 }>
            <div style={ temp }>items 1</div>
        </ScrollView>
    ))
    .add('initialize by content height equal to container', () => (
        <ScrollView width={ 500 } height={ 300 }>
            <div style={ temp }>items 1</div>
            <div style={ temp }>items 2</div>
            <div style={ temp }>items 3</div>
        </ScrollView>
    ))
    .add('initialize by content height above to container', () => (
        <ScrollView width={ 500 } height={ 300 }>
            <div style={ temp }>items 1</div>
            <div style={ temp }>items 2</div>
            <div style={ temp }>items 3</div>
            <div style={ temp }>items 4</div>
            <div style={ temp }>items 5</div>
        </ScrollView>
    ))
    .add('initialize by count of content will change', () => (
        <Wrapper />
    ));
