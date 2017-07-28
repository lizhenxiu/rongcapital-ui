/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, shallow, mount } from 'enzyme';
import { SnakeBar } from '../../src';
import sinon from 'sinon';

import * as componentStyles from '../../src/styles/base/snakeBar.sass';

describe.only('base component snakeBar', () => {
    it('initialize by default', () => {
        const wrapper = render(<SnakeBar />);
        expect(wrapper.find(`.${ componentStyles['snake-bar'] }`)).to.have.lengthOf(1);
        expect(wrapper.find(`.${ componentStyles['snake-bar-left'] }`)).to.have.lengthOf(1);
    });

    it('initialize by position right', () => {
        const wrapper = render(<SnakeBar position={ SnakeBar.POSITION.RIGHT } />);
        expect(wrapper.find(`.${ componentStyles['snake-bar-right'] }`)).to.have.lengthOf(1);
    });

    it('initialize by position center', () => {
        const wrapper = render(<SnakeBar position={ SnakeBar.POSITION.CENTER } />);
        expect(wrapper.find(`.${ componentStyles['snake-bar-center'] }`)).to.have.lengthOf(1);
    });

    it('initialize SnakeBarMessage by content', () => {
        const wrapper = shallow(<SnakeBar.Message>Hello World</SnakeBar.Message>);
        expect(wrapper.hasClass(componentStyles['snake-bar-item'])).to.equal(true);
        expect(wrapper.text()).to.equal('Hello World');
    });

    it('initialize by 1 child', () => {
        const wrapper = shallow(
            <SnakeBar>
                <SnakeBar.Message>Hello World</SnakeBar.Message>
            </SnakeBar>
        );
        
        const targets = wrapper.find(SnakeBar.Message);
        expect(targets).to.have.lengthOf(1);
    });

    it('initialize by delay 0', (done) => {
        const delay = 0;
        const handleRemove = sinon.spy();
        const wrapper = mount(
            <SnakeBar delay={ delay } onRequestRemove={ handleRemove }>
                <SnakeBar.Message>Hello World</SnakeBar.Message>
            </SnakeBar>
        );

        setTimeout(() => {
            expect(handleRemove.notCalled).to.equal(true);
            wrapper.unmount();
            done();
        }, delay + 1E3);
    });

    it('initialize by delay 5', (done) => {
        const delay = 1E3;
        const handleRemove = sinon.spy();
        const wrapper = mount(
            <SnakeBar delay={ delay } onRequestRemove={ handleRemove }>
                <SnakeBar.Message>Hello World</SnakeBar.Message>
            </SnakeBar>
        );

        setTimeout(() => {
            expect(handleRemove.calledOnce).to.equal(true);
            wrapper.unmount();
            done();
        }, delay);
    });
});
