import React, { Component } from 'react';
import PropTypes from 'prop-types';
import THEME from './constants/theme';

class AppTheme extends Component {

    static childContextTypes = {
        theme: PropTypes.oneOf(Object.values(THEME)),
    };

    static propTypes = {
        theme: PropTypes.oneOf(Object.values(THEME)),
        children: PropTypes.element,
    };

    static defaultProps = {
        theme: THEME.LIGHT
    };

    static THEME = THEME;

    getChildContext() {
        const { theme } = this.props;
        return {
            theme 
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                { this.props.children  }
            </div>
        );
    }
}

export default AppTheme;
