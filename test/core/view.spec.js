/* global describe, it */
import React from 'react';
// import sinon from 'sinon';
import { expect } from 'chai';
import { /* mount, render,*/ shallow } from 'enzyme';

import { View } from '../../src';
import * as componentStyles from '../../src/styles/core/view.sass';

describe('core component view', () => {
    it('initialize by default', () => {
        const wrapper = shallow(<View />);
        expect(wrapper.type()).to.equal('div');
        expect(wrapper.hasClass(componentStyles.view)).to.equal(true);
    });

    it('initialize with width = 200', () => {
        const wrapper = shallow(<View width={ 200 } />);
        expect(wrapper.html()).to.include('width:200px');
    });

    it('initialize with height = 300', () => {
        const wrapper = shallow(<View height={ 300 } />);
        expect(wrapper.html()).to.include('height:300px');
    });

    it('initialize with both of all', () => {
        const wrapper = shallow(<View width={200} height={300} />);
        expect(wrapper.html()).to.include('width:200px;height:300px');
    });

    it('initialize with text', () => {
        const wrapper = shallow(<View>Hello</View>);
        expect(wrapper.text()).to.equal('Hello');
    });

    it('initialize with children of element', () => {
        const wrapper = shallow(<View><div></div></View>);
        expect(wrapper.find('div').children('div')).to.have.lengthOf(1);
    });
});
