/* 一种另类的尝试 */
import React from 'react';
import clazz from 'classnames';
import PropTypes from 'prop-types';

import * as componentStyles from '../styles/base/actionBar.sass';

const ActionBar = ({ children }) =>
    <ul className={ componentStyles['action-bar'] }>{ children }</ul>;

ActionBar.Item = ({ children, right }) =>
    <li className={ clazz({
        [componentStyles.right]: right
    }) }>{ children }</li>;

ActionBar.propTypes = {
    children: PropTypes.oneOfType([ PropTypes.element, PropTypes.arrayOf(PropTypes.element) ])
};

ActionBar.Item.displayName = 'ActionBarItem';
ActionBar.Item.propTypes = {
    right: PropTypes.bool,
    children: PropTypes.any
};
ActionBar.Item.defaultProps = {
    right: false
};

export default ActionBar;
