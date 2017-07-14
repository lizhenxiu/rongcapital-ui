import React, { Component } from 'react';

import ListView from '../core/ListView';

const MODE = ListView.MODE;

class Breadcrumbs extends ListView {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return super.render();
    }
}

const Controller = (View) =>
    class BreadcrumbsController extends Component {

        render() {
            const { children } = this.props;

            return ( 
                <View mode={ MODE.HORIZONTAL } inline> 
                    { children }
                </View>
            );
        }
    }

export default Controller(Breadcrumbs);
