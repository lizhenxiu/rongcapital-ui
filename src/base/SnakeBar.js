import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import autobind from 'core-decorators/lib/autobind';
import THEME from '../constants/theme';

import ListView from '../core/ListView';
import * as componentStyles from '../styles/base/snakeBar.sass';

const POSITION = {
    LEFT: 0,
    CENTER: 1,
    RIGHT: 2,
};

const Controller = (View) =>
    class SnakeBarController extends Component {

        static POSITION = View.POSITION;

        static defaultProps = {
            delay: 0,
        };

        static propTypes = {
            children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
            delay: PropTypes.number,
        };

        constructor(props) {
            super(props);

            const { children } = props;

            this.state = {
                pollId: 0,
                children: React.Children.toArray(children),
            };
        }

        @autobind
        poll() {
            const { children } = this.state;

            if (children.length > 0) {
                this.setState((prevState) => ({
                    ...prevState,
                    children: prevState.children.slice(1),
                }), () => this.state.children.length == 0 
                    && clearInterval(this.state.pollId));
            }
        }

        @autobind
        handleClick() {
        }

        componentWillReceiveProps(nextProps) {
            const { children, delay } = nextProps;

            if (delay > 0) {
                this.setState(() => ({
                    pollId: setInterval(this.poll, delay * 1E3),
                    children: React.Children.toArray(children),
                }));
            }
        }

        componentWillMount() {
            const { delay } = this.props;

            if (delay > 0) {
                this.setState({
                    pollId: setInterval(this.poll, delay * 1E3),
                });
            }
        }

        componentWillUnmount() {
            const { delay } = this.props;

            if (delay > 0) {
                clearInterval(this.state.pollId);
            }
        }

        render() {
            const { children } = this.state;
            const newProps = {
                ...this.props,
                children,
            };

            return <View { ...newProps } />;
        }
    };

@Controller
class SnakeBar extends Component {

    static POSITION = POSITION;

    static propTypes = {
        position: PropTypes.oneOf(Object.values(POSITION)),
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    };

    static defaultProps = {
        position: POSITION.LEFT,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { children, position } = this.props;
        const classNames = clazz(componentStyles['snake-bar'], {
            [componentStyles['snake-bar-left']]: position === POSITION.LEFT,
            [componentStyles['snake-bar-center']]: position === POSITION.CENTER,
            [componentStyles['snake-bar-right']]: position === POSITION.RIGHT,
        });

        return (
            <ListView className={ classNames }>
                { children }
            </ListView>
        );
    }
}

SnakeBar.Message = class SnakeBarMessage extends PureComponent {

    static contextTypes = {
        theme: PropTypes.oneOf(Object.values(THEME)),
    };

    static propTypes = {
        children: PropTypes.string,
        onClick: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { theme } = this.context;
        const { children, onClick } = this.props;
        const classNames = clazz(componentStyles['snake-bar-item'], {
            [componentStyles['theme-light']]: theme === THEME.LIGHT,
            [componentStyles['theme-dark']]: theme === THEME.DARK,
        });

        return (
            <div className={ classNames } onClick={ onClick }>{ children }</div>
        );
    }
};

export default SnakeBar;
