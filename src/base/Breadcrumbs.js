import React from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';

import ListView from '../core/ListView';

import * as componentStyles from '../styles/base/breadcrumbs.sass';

const MODE = ListView.MODE;

class Breadcrumbs extends ListView {

    static propTypes = {
        ...ListView.propTypes,
        children: PropTypes.arrayOf(PropTypes.element),
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
        const newChildren = [];
        const { children } = this.props;
        const arrayOfChildren = React.Children.toArray(children);

        arrayOfChildren.forEach((item, index) => {
            newChildren.push(<li>{ item }</li>);

            if (index != arrayOfChildren.length - 1)
                newChildren.push(<li>/</li>);
        });

        const elementTree = super.render();
        const newProps = {
            ...elementTree.props,
            children: newChildren,
            className: clazz(elementTree.props.className, componentStyles.breadcrumbs),
        };

        return React.cloneElement(elementTree, newProps);
    }
}

export default Breadcrumbs;
