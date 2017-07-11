/* global describe, it */
import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { NavigationView } from '../../src';

import * as componentStyles from '../../src/styles/navigationView.sass';

const ItemView = ({ children, next, prev }) => (
    <div className="navItem">
        <p>{ children }</p>
        <div>
            <button onClick={ prev }>Prev</button>
            <button onClick={ next }>Next</button>
        </div>
    </div>
);

ItemView.propTypes = {
    children: PropTypes.string,
    prev: PropTypes.func,
    next: PropTypes.func,
};

describe('core component navigationView', () => {

    it('initialize by default', () => {
        const wrapper = shallow(<NavigationView />);
        expect(wrapper.hasClass(componentStyles.navigationView));
    });

    it('initialize by 1 child', () => {
        const wrapper = shallow(
            <NavigationView width={ 200 } height={ 100 }>
                <ItemView>对饮成三人</ItemView>
            </NavigationView>
        );

        expect(wrapper.find(ItemView)).to.have.lengthOf(1);
        expect(wrapper.find(ItemView).dive().text()).to.equal('对饮成三人PrevNext');
    });

    it('initialize by 5 child and default index 0', () => {
        const wrapper = shallow(
            <NavigationView width={ 200 } height={ 100 }>
                <ItemView>items 0</ItemView>
                <ItemView>items 1</ItemView>
                <ItemView>items 2</ItemView>
                <ItemView>items 3</ItemView>
                <ItemView>items 4</ItemView>
            </NavigationView>
        );
        
        expect(wrapper.find(ItemView)).to.have.lengthOf(5);
        expect(wrapper.prop('index')).to.equal(0);
    });

    it('initialize by 5 child and default index 2 and click next', () => {
        const wrapper = shallow(
            <NavigationView width={ 200 } height={ 100 } index={ 2 }>
                <ItemView>items 0</ItemView>
                <ItemView>items 1</ItemView>
                <ItemView>items 2</ItemView>
                <ItemView>items 3</ItemView>
                <ItemView>items 4</ItemView>
            </NavigationView>
        );

        expect(wrapper.prop('index')).to.equal(2);
        expect(wrapper.state('index')).to.equal(2);

        const buttons = wrapper.find(ItemView).at(2).dive().find('button');

        expect(buttons).to.have.lengthOf(2);

        const prevButton = buttons.at(0);
        const nextButton = buttons.at(1);

        expect(prevButton.text()).to.equal('Prev');
        expect(nextButton.text()).to.equal('Next');

        //prevButton.simulate('click');
        //expect(wrapper.state('index')).to.equal(1);

        //nextButton.simulate('click');
        //expect(wrapper.state('index')).to.equal(2);
    });
});
