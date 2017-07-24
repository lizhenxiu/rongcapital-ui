import React from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';

import range from 'ramda/src/range';
import memoize from 'ramda/src/memoize';
import omit from 'ramda/src/omit';

import CollectionView from './CollectionView';

import * as componentStyles from '../styles/core/gridView.sass';

class GridView extends CollectionView {

    static propTypes = {
        ...CollectionView.propTypes,
        rows: PropTypes.number.isRequired,
        columns: PropTypes.number.isRequired,
        cellLayout: PropTypes.func,
    };

    static defaultProps = {
        ...CollectionView.defaultProps,
        rows: 0,
        columns: 0,
        cellLayout: arg => arg,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { rows, columns,  cellLayout } = this.props;
        const cells = cellLayout(Array.from({ length: rows * columns }, (_, index) => ({
            // 一维数组索引二维化
            x: index / columns >> 0,
            y: index % columns,
            // 合并单元格
            rowspan: 1,
            colspan: 1,
            // 单元格上下文组件
            // context: children[index] ? React.Children.toArray(omit(children[index], ['key'])) : void 0,
            // 是否挂载
            isMounted: true,
        })));

        const elementTree = super.render();
        const children = React.Children.toArray(elementTree.props.children);

        let item = null, i = 0;

        for (let cell of cells) {
            if (!cell.isMounted)
                continue;

            item = children[i++];
            if (!item)
                continue;

            // dot't clone child element
            cell.context = React.Children.toArray(omit(['key'], item));
        }

        const newChildren = gridLayout(cells, rows, columns);
        const newProps = {
            ...elementTree.props,
            className: clazz(elementTree.props.className, componentStyles['grid-view']),
            children: newChildren,
        };

        return React.cloneElement(elementTree, newProps);
    }
}

const gridLayout = memoize((cells, rows, columns) =>
    <table>
        <tbody>
            {
                range(0, rows).map(rowIndex => 
                    <tr key={ `.0.0.${rowIndex}` }>
                        {
                            range(0, columns).map(columnIndex => 
                                cells[rowIndex * columns + columnIndex].isMounted &&
                                <td key={ `.0.0.${rowIndex}.${columnIndex}` }
                                    colSpan={ cells[rowIndex * columns + columnIndex].colspan }
                                    rowSpan={ cells[rowIndex * columns + columnIndex].rowspan }
                                >{ cells[rowIndex * columns + columnIndex].context }</td>
                            )
                        }
                    </tr>
                )
            }
        </tbody>
    </table> 
);


export default GridView;
