/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ScrollView } from '../../src';

import * as viewStyles from '../../src/styles/view.sass';
import * as componentStyles from '../../src/styles/scrollView.sass';

describe.only('core component scrollView', () => {

    it('initialize by required properties', () => {
        const wrapper = shallow(<ScrollView width={ 500 } height={ 300 } />);
        expect(wrapper.type()).to.equal('div');
        expect(wrapper.hasClass(componentStyles.scrollView) && wrapper.hasClass(viewStyles.view)).to.equal(true);
    });

    it('initialize by 1 child', () => {
        const wrapper = shallow(
            <ScrollView width={ 500 } height={ 300 }>
                <div className="item">items 0</div>
            </ScrollView>
        );

        expect(wrapper.find('.item')).to.have.lengthOf(1);
        expect(wrapper.find('.item').at(0).text()).to.equal('items 0');
    });

    it('initialize by more children', () => {
        const wrapper = shallow(
            <ScrollView width={ 500 } height={ 300 }>
                <div className="item">items 1</div>
                <div className="item">items 2</div>
                <div className="item">items 3</div>
                <div className="item">items 4</div>
                <div className="item">items 5</div>
            </ScrollView>
        );

        expect(wrapper.find('.item')).to.have.lengthOf(5);
        wrapper.find('.item').forEach((item, index) => 
            expect(item.text()).to.equal(`items ${ index + 1 }`)
        );
    });
});
