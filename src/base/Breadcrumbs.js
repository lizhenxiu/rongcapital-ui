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
        const newChildren = [];
        const { children } = this.props;
        const arrayOfChildren = React.Children.toArray(children);

        arrayOfChildren.forEach((item, index) => {
            newChildren.push(item)

            if (index != arrayOfChildren.length - 1)
                newChildren.push(<span>/</span>);
        });

        const elementTree = super.render();
        const newProps = {
            ...elementTree.props,
            mode: MODE.HORIZONTAL,
            children: newChildren,
        };

        return React.cloneElement(elementTree, newProps);
    }
}

export default Breadcrumbs;
