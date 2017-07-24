/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ActionBar } from '../../src';

import * as componentStyles from '../../src/styles/base/actionBar.sass';

describe('base component actionBar', () => {
    it('initialize by default', () => {
        const wrapper = shallow(
            <ActionBar />
        );

        expect(wrapper.hasClass(componentStyles['action-bar'])).to.equal(true);
    });

    it('initialize by some child', () => {
        const wrapper = shallow(
            <ActionBar>
                <ActionBar.Item>item 0</ActionBar.Item>
                <ActionBar.Item>item 1</ActionBar.Item>
                <ActionBar.Item right>item 2</ActionBar.Item>
                <ActionBar.Item right>item 3</ActionBar.Item>
            </ActionBar>
        );

        expect(wrapper.children(ActionBar.Item)).to.have.lengthOf(4);
        wrapper.children(ActionBar.Item).slice(2).forEach((item, index) => {
            expect(item.prop('right')).to.equal(true);
            expect(item.prop('children')).to.equal(`item ${index + 2}`);
        });
    });
});
