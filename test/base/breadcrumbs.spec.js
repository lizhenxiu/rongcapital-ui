/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Breadcrumbs } from '../../src';

describe('base component breadcrumbs', () => {
    
    it('initialize by some child', () => {
        const wrapper = shallow(
            <Breadcrumbs>
                <span>Items 0</span>
                <span>Items 1</span>
                <span>Items 2</span>
                <span>Items 3</span>
                <span>Items 4</span>
                <span>Items 5</span>
            </Breadcrumbs>
        );

        expect(wrapper.children('span')).to.have.lengthOf(11);
    });
});
