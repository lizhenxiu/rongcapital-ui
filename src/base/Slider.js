import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import memoize from 'ramda/src/memoize';
import compose from 'ramda/src/compose';
import clamp from 'ramda/src/clamp';
import pathOr from 'ramda/src/pathOr';
import autobind from 'core-decorators/lib/autobind';
import override from 'core-decorators/lib/override';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/throttleTime';

import View from '../core/View';
import * as componentStyles from '../styles/base/slider.sass';

const lineProgressClassName = memoize(className =>
    clazz(componentStyles['line-progress'], componentStyles[className]));
const selectorClassName = memoize(className =>
    clazz(componentStyles.selector, componentStyles[className]));

const mustBeSelector = (e) => e.target.classList.contains(componentStyles.selector);
const withFilter = (mustBe) => (observable) => observable.filter(mustBe);

const createObservable = (action) => (targetRef) => Observable.fromEvent(targetRef, action);
const createMousedown = compose(withFilter(mustBeSelector), createObservable('mousedown'));
const createMouseup = createObservable('mouseup');
const createMousemove = createObservable('mousemove');
const createResize = createObservable('resize');

const isSelector = (className) => (target) => target.classList && target.classList.contains(componentStyles[className]);
const isLeftSelector = isSelector('selector-left');
const isRightSelector = isSelector('selector-right');

// 保留两位小数
const save = (number) => (value) => (value * Math.pow(10, number) >> 0) / Math.pow(10, number);
const saveTwo = save(2);

const Controller = (WrappedView) =>
    class SliderController extends Component {
        static defaultProps = {
            min: 0,
            max: 100,
            isRange: false,
            left: 0,
            right: 0,
            current: 0
        };

        static propTypes = {
            min: PropTypes.number,
            max: PropTypes.number,
            isRange: PropTypes.bool,
            left: PropTypes.number,
            right: PropTypes.number,
            current: PropTypes.number
        };

        constructor (props, context) {
            super(props, context);

            const { left, right, current, isRange, min, max } = props;
            this.state = {
                min,
                max,
                currentLeft: left,
                currentRight: isRange ? right : current,
                containerWidth: 0
            };
        }

        @autobind
        storeRef (ref) {
            this.wrappedRef = ref;
        }

        componentWillReceiveProps (nextProps) {
            const { left, right, current, isRange, min, max } = nextProps;
            this.state = {
                min,
                max,
                currentLeft: left,
                currentRight: isRange ? right : current,
                containerWidth: 0
            };
        }

        componentDidMount () {
            const { min, max } = this.props;

            const mousedown$ = createMousedown(this.wrappedRef.containerRef);
            const mousemove$ = createMousemove(document.body);
            const mouseup$ = createMouseup(document.body);

            this.work$ = mousedown$
                .flatMap(md => {
                    const target = md.target;
                    const startX = md.clientX;
                    const startLeft = parseInt(md.target.style.left, 10);

                    return mousemove$.map(mm => {
                        mm.preventDefault();
                        return {
                            target,
                            next: startLeft + mm.clientX - startX
                        };
                    }).takeUntil(mouseup$);
                })
                .subscribe(({ target, next }) => {
                    const containerWidth = this.wrappedRef.containerWidth;
                    const { currentLeft, currentRight } = this.state;
                    const newState = {};
                    const nextValue = clamp(min, max, next * max / containerWidth);

                    if (isLeftSelector(target)) { newState.currentLeft = clamp(min, currentRight, nextValue); }
                    if (isRightSelector(target)) { newState.currentRight = clamp(currentLeft, max, nextValue); }

                    this.setState(newState);
                });
        }

        componentWillUnmount () {
            if (this.work$) { this.work$.unsubscribe(); }
        }

        render () {
            const newProps = {
                ...this.props,
                ...this.state
            };

            return <WrappedView ref={ this.storeRef } { ...newProps } />;
        }
    };

const Resize = (WrappedView) =>
    class SliderResize extends WrappedView {
        constructor (props, context) {
            super(props, context);
        }

        componentDidMount () {
            const resize$ = createResize(window);
            this.resize$ = resize$
                .throttleTime(16.67)
                .subscribe(() => this.forceUpdate());

            this.forceUpdate();
        }

        componentWillUnmount () {
            if (this.resize$) { this.resize$.unsubscribe(); }
        }

        @override
        render () {
            return super.render();
        }
    };

@Controller
@Resize
class Slider extends View {
    static defaultProps = {
        min: 0,
        max: 100,
        currentLeft: 0,
        currentRight: 0,
        isRange: false
    };

    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        currentLeft: PropTypes.number,
        currentRight: PropTypes.number,
        isRange: PropTypes.bool
    };

    constructor (props, context) {
        super(props, context);
    }

    @autobind
    storeRef (ref) {
        this.containerRef = ref;
    }

    get containerWidth () {
        const width = pathOr('0', ['containerRef', 'offsetWidth'], this);
        return parseInt(width, 10);
    }

    @override
    render () {
        const { max, currentLeft, currentRight, isRange } = this.props;

        const left = currentLeft * this.containerWidth / max;
        const width = currentRight * this.containerWidth / max - left;

        const layout = [
            <div key='min'>{ saveTwo(currentLeft) }</div>,
            <div key='value'>
                <div className={ componentStyles['line-container'] } ref={ this.storeRef }>
                    <div className={ lineProgressClassName('line-progress-bar') }></div>
                    <div className={ lineProgressClassName('line-progress-val') } style={ { left, width } }></div>
                    {
                        isRange &&
                            <div className={ selectorClassName('selector-left') } style={ { left: currentLeft * this.containerWidth / max } }></div>
                    }
                    <div className={ selectorClassName('selector-right') } style={ { left: currentRight * this.containerWidth / max } }></div>
                </div>
            </div>,
            <div key='max'>{ saveTwo(currentRight) }</div>
        ];

        const elementTree = super.render();
        const props = elementTree.props;

        const newProps = {
            ...props,
            className: clazz(props.className, componentStyles.slider),
            children: layout
        };

        return React.cloneElement(elementTree, newProps);
    }
}

export default Slider;
