import React from 'react';
import clazz from 'classnames';
import PropTypes from 'prop-types';

import View from './View';
import * as componentStyles from '../styles/collectionView.sass';

const noop = arg => arg;

class CollectionView extends View {

    static defaultProps = {
        ...View.defaultProps,
        itemLayout: noop,
    };

    static propTypes = {
        ...View.propTypes,
        itemLayout: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const elementTree = super.render();
        const props = elementTree.props;
        const { children, itemLayout } = this.props;

        const newProps = {
            ...props,
            className: clazz(props.className, componentStyles.collectionView),
            children: React.Children.map(children, itemLayout),
        };

        return React.cloneElement(elementTree, newProps);
    }
}

export default CollectionView;
