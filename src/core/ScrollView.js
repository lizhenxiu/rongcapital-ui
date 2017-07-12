import React from 'react';
import clazz from 'classnames';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import View from './View';

import * as componentStyles from '../styles/scrollView.sass';

const defaultProps = {
    autoHide: true,
};

class ScrollView extends View {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }
    
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const elementTree = super.render();
        const newProps = {
            ...elementTree.props,
            className: clazz(elementTree.props.className, componentStyles.scrollView),
            children: (<Scrollbars { ...defaultProps }>{  elementTree.props.children  }</Scrollbars>),
        };
        return React.cloneElement(elementTree, newProps);
    }
}

export default ScrollView;
