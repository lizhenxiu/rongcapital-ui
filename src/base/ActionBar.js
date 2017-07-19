import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListView from '../core/ListView';

const MODE = ListView.MODE;

class ActionBar extends ListView {

    static propTypes = {
        ...ListView.propTypes,
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
        return super.render();
    }
}

ActionBar.Item = class extends Component {
    static displayName = 'ActionBarItem';

    render() {
        const { children, left } = this.props;
        return (
            <div>{ children }</div>
        );
    }
};

export default ActionBar;
