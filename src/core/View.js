import React, { Component } from 'react';
import clazz from 'classnames';
import PropTypes from 'prop-types';
import defaults from 'ramda/src/merge';
import memoize from 'ramda/src/memoize';

import * as componentStyles from '../styles/core/view.sass';

//  创建一个记忆函数用于合并尺寸样式
const mergeStyle = memoize(defaults);
const defaultStyles = {
    width: 'auto',
    height: 'auto'
};

const noop = arg => arg;

class View extends Component {
    static defaultProps = {
        onClick: noop
    };

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        className: PropTypes.string,
        inline: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
        onClick: PropTypes.func
    };

    constructor (props, context) {
        super(props, context);
    }

    render () {
        const {
            width,
            height,
            inline,
            className,
            children,
            onClick
        } = this.props;

        const styles = mergeStyle(defaultStyles, { width, height });
        const classNames = clazz(className, componentStyles.view, {
            [componentStyles.inline]: inline
        });

        return (
            <div className={ classNames } style={ styles }
                onClick={ onClick }>{ children }</div>
        );
    }
}

export default View;
