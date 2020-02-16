import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


import {
    connect
} from 'react-redux';

import AuthLogin from '../container/authLogin/authLogin';
import SearchDashboard from '../container/searchData/searchDashboard';

import { rout_login, rout_dashBoard } from './routerPath';

class RootRouter extends Component {


    renderLoginRouter() {
        if (!this.props.is_login) {
            return <Switch>
                <Route path={rout_login} component={AuthLogin} />
            </Switch>
        }
    }

    renderRouteIfLogin() {
        if (this.props.is_login) {
            return <Switch>
                <Route path={rout_dashBoard} component={SearchDashboard} />
            </Switch>
        }

    }

    checkIfLogin() {
        if (this.props.is_login) {
            return rout_dashBoard
        }
        else {
            return rout_login
        }
    }


    render() {
        return (
            <Router basename={`${process.env.PUBLIC_URL}/`}>
                <div>
                    <Route path={'/'}>
                        <Redirect to={this.checkIfLogin()} />
                    </Route>
                    {this.renderLoginRouter()}
                    {this.renderRouteIfLogin()}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = function (state) {
    const { is_login } = state.AuthReducer
    return {
        is_login
    }
}

export default connect(mapStateToProps, {})(RootRouter);