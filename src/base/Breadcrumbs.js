import React from 'react';
import PropTypes from 'prop-types';

import ListView from '../core/ListView';

const MODE = ListView.MODE;

class Breadcrumbs extends ListView {

    static propTypes = {
        ...ListView.propTypes,
        children: PropTypes.arrayOf(PropTypes.element),
    };

    static defaultProps = {
        ...ListView.defaultProps,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const elementTree = super.render();
        const newProps = {
            ...elementTree.props,
            mode: MODE.HORIZONTAL,
            children: this.props.children,
        };

        return React.cloneElement(elementTree, newProps);
    }
}

export default Breadcrumbs;
