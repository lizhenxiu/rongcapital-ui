import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import autobind from 'core-decorators/lib/autobind';
import View from '../core/View';

import * as componentStyles from '../styles/base/switch.sass';
 
const Controller = (View) =>
	class Switch extends Component {

		static propTypes = {
			...View.propTypes,
			isOpen: PropTypes.bool,
			disabled: PropTypes.bool,
			width: PropTypes.string.isRequired,
      		height: PropTypes.string.isRequired,
      		className: PropTypes.string.isRequired,
		}

		constructor(props, context) {
			super(props, context);
			const { 
				isOpen,
				disabled,
				width,
				height,
				className,
			 } = props;
			this.state = {
				// 按钮开关状态
				isOpen,
				disabled,
				width,
				height,
				className,
			};
		}
	
		componentWillReceiveProps(nextProps) {
			this.setState(() => ({
				isOpen: nextProps.isOpen,
				disabled: nextProps.disabled,	
				width: nextProps.width,
				height: nextProps.height,
			}));
		}

		@autobind
		handleClickSwitch(evt){
			this.setState({
				isOpen: !this.state.isOpen,
				 
			})
		}

		render() {
			const newProps = {
				isOpen: this.state.isOpen,
				disabled: this.state.disabled,
				width: '60px' ,
				height: '30px' ,
				className: clazz(componentStyles['switch'],{
					[componentStyles['switch-on']] : this.state.isOpen,
					[componentStyles['switch-off']] : !this.state.isOpen ,

				}),
				onClick: this.handleClickSwitch,
			}
			return <View { ...this.props } { ...newProps }/>;
		}
	};
	
@Controller
class Switch extends View {
	render() {
		const elementTree = super.render();
        const props = elementTree.props;
		const { className, width, height, isOpen, disabled, onClick } = this.props;
		const newProps = {
			...elementTree.props,
			children: <div></div>
			 
		}
        return React.cloneElement(elementTree, newProps);
	}
}
export default Switch;