import React from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';

import View from '../core/View';
import ListView from '../core/ListView';

import * as componentStyles from '../styles/base/actionBar.sass';

const MODE = ListView.MODE;

class ActionBar extends ListView {

    static propTypes = {
        ...ListView.propTypes,
        mode: PropTypes.oneOf([ MODE.HORIZONTAL ]),
    };

    static defaultProps = {
        ...ListView.defaultProps,
        mode: MODE.HORIZONTAL,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const elementTree = super.render();
        const { props } = elementTree;
        const newProps = {
            ...props,
            className: clazz(props.className, componentStyles['action-bar']),
        };

        return React.cloneElement(elementTree, newProps);
    }
}

ActionBar.Item = class extends View {
    static displayName = 'ActionBarItem'; // just for anonymouse component class 

    render() {
        return super.render();
    }
};

export default ActionBar;
