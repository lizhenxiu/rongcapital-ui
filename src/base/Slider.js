import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import memoize from 'ramda/src/memoize';
import compose from 'ramda/src/compose';
import autobind from 'core-decorators/lib/autobind';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/scan';

import { Scheduler } from 'rxjs/Scheduler';
import { animationFrame } from 'rxjs/scheduler/animationFrame';

import View from '../core/View';
import * as componentStyles from '../styles/base/slider.sass';

const lineProgressClassName = memoize((className) =>
    clazz(componentStyles['line-progress'], componentStyles[className]));

const convertTo = (value, max) => value / max * 100;
const addUnit = (unit) => (val) => val + '' + unit;
const present = compose(addUnit('%'), convertTo);

const mustBeSelector = (e) => e.target.classList.contains(componentStyles.selector);
const mustBeContainer = (e) => e.target.classList.contains(componentStyles['line-container']);
const createObservable = (action) => (targetRef) => Observable.fromEvent(targetRef, action);
const withFilter = (filter) => (observable) => observable.filter(filter);
const createMousedown = compose(withFilter(mustBeSelector), createObservable('mousedown'));
const createMouseup = compose(withFilter(mustBeSelector), createObservable('mouseup'));
const createMouseout = compose(withFilter(mustBeContainer), createObservable('mouseout'));
const createMousemove = createObservable('mousemove');

const noop = arg => arg;

// 线性插值
const lerp = (start, end) => {
    const dx = end - start;

    return start + dx * 0.1
};

const Controller = (WrappedView) =>
    class SliderController extends Component {

        static defaultProps = {
            max: 100,
        };

        static propTypes = {
            max: PropTypes.number,
        };

        constructor(props, context) {
            super(props, context);
            this.state = {
                currentLeft: 0,
                currentRight: 0,
                containerWidth: 0,
            };
        }

        @autobind
        storeRef(ref) {
            this.containerRef = ref;
        }

        @autobind
        handleClick(e) {
            
        }

        componentDidMount() {
            const { max } = this.props;

            const mousedown$ = createMousedown(this.containerRef);
            const mousemove$ = createMousemove(document.body);
            const mouseup$ = createMouseup(document.body);
            const mouseout$ = createMouseout(this.containerRef);
            const animationFrame$ = Observable.interval(0, animationFrame);

            const work$ = mousedown$.flatMap(e => {
                const startX = e.clientX;
                const startLeft = parseInt(e.target.style.left, 10);
                return mousemove$.map(e => {
                    e.preventDefault();
                    return startLeft + e.clientX - startX;
                }).takeUntil(mouseup$);
            });

            const smoothMove$ = animationFrame$
                .withLatestFrom(work$, (frame, move) => move)
                .scan(lerp).subscribe(result => {
                    this.setState({
                        currentRight: result * max / this.state.containerWidth,
                    })
                });

            this.setState({
                containerWidth: parseInt(this.containerRef.offsetWidth, 10),
            });
        }

        render () {
            const { currentLeft, currentRight, containerWidth } = this.state;
            const newProps = {
                ...this.props,
                ...this.state,
                storeRef: this.storeRef,
            };

            return <WrappedView { ...newProps } />;
        }
    };

@Controller
class Slider extends View {
    static defaultProps = {
        min: 0,
        max: 100,
        currentLeft: 0,
        currentRight: 0,
        isRange: false,
        storeRef: noop,
    };

    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        currentLeft: PropTypes.number,
        currentRight: PropTypes.number,
        isRange: PropTypes.bool,
        storeRef: PropTypes.func,
    };

    constructor (props, context) {
        super(props, context);
    }

    @autobind
    storeRef(ref) {
        this.containerRef = ref;

        const { storeRef } = this.props;
        storeRef && storeRef(ref);
    }


    render () {
        const { min, max, currentLeft, currentRight, isRange, containerWidth } = this.props;

        const layout = [
            <div key='min'>{ min }</div>,
            <div key='value'>
                <div className={ componentStyles['line-container'] } ref={ this.storeRef }>
                    <div className={ lineProgressClassName('line-progress-bar') }></div>
                    <div className={ lineProgressClassName('line-progress-val') } style={ { width: currentRight * containerWidth / max } }></div>
                    <div className={ componentStyles.selector } style={ { left: currentRight * containerWidth / max } }></div>
                </div>
            </div>,
            <div key='max'>{ currentRight }</div>
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
