/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DragDropView } from '../../src';

describe.only('core component dragDropView', () => {
    
    it('initialize by default', () => {
        const wrapper = shallow(<DragDropView />);
    });
});
