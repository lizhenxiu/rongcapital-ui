import React from 'react';
import clazz from 'classnames';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import override from 'core-decorators/lib/override';

import View from './View';

import * as componentStyles from '../styles/core/scrollView.sass';

const defaultProps = {
    autoHide: true
};

class ScrollView extends View {
    static propTypes = {
        ...View.propTypes,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }

    constructor (props, context) {
        super(props, context);
    }

    @override
    render () {
        const elementTree = super.render();
        const newProps = {
            ...elementTree.props,
            className: clazz(elementTree.props.className, componentStyles['scroll-view']),
            children: (<Scrollbars { ...defaultProps }>{ elementTree.props.children }</Scrollbars>)
        };
        return React.cloneElement(elementTree, newProps);
    }
}

export default ScrollView;
