import React from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';

import memoize from 'lodash/memoize';

import CollectionView from './CollectionView';

import * as componentStyles from '../styles/listView.sass';

const MODE = {
    VERTICAL: 0,
    HORIZONTAL: 1,
};

class ListView extends CollectionView {

    static propTypes = {
        ...CollectionView.propTypes,
        mode: PropTypes.oneOf([ ...Object.values(MODE) ]),
    };

    static defaultProps = {
        ...CollectionView.defaultProps,
    };

    static MODE = MODE;

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { mode } = this.props;
        const elementTree = super.render();
        const { children } = elementTree.props;
        const newProps = {
            ...elementTree.props,
            className: clazz(elementTree.props.className, componentStyles.listView, { 
                [componentStyles.horizontal]: mode === MODE.HORIZONTAL 
            }),
            children: listLayout(React.Children.toArray(children)),
        };

        return React.cloneElement(elementTree, newProps);
    }
}

const listLayout = memoize((items = []) => 
    <ul>
        { items.map((component, index) => <li key={ index }>{ component  }</li>) }
    </ul>
);

export default ListView;
