import React from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';

import CollectionView from './CollectionView';

import * as componentStyles from '../styles/core/listView.sass';

const MODE = {
    VERTICAL: 0,
    HORIZONTAL: 1
};

const listLayout = (element, index) =>
    <li key={ index }>{ element }</li>;

class ListView extends CollectionView {
    static propTypes = {
        ...CollectionView.propTypes,
        mode: PropTypes.oneOf(Object.values(MODE))
    };

    static defaultProps = {
        ...CollectionView.defaultProps
    };

    static MODE = MODE;

    constructor (props, context) {
        super(props, context);
    }

    render () {
        const { mode } = this.props;
        const elementTree = super.render();
        const { children, ...others } = elementTree.props;
        const newProps = {
            ...others,
            className: clazz(elementTree.props.className, componentStyles['list-view'], {
                [componentStyles['list-view-horizontal']]: mode === MODE.HORIZONTAL
            })
        };

        // return React.cloneElement(elementTree, newProps);
        return <ul { ...newProps }>{ React.Children.map(children, listLayout)}</ul>;
    }
}

export default ListView;
