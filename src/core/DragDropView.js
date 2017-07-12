import React from 'react';
import clazz from 'classnames';
//import { DragDropContext } from 'react-dnd';

import View from './View';

import * as componentStyles from '../styles/dragdropView.sass';

class DragDropView extends View {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const elementTree = super.render();
        const newProps = {
            ...elementTree.props,
            className: clazz(elementTree.props.className, componentStyles.dragdropView),
        };

        return React.cloneElement(elementTree, newProps);
    }
}

export default DragDropView;
