import React from "react";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom"
//components
import Layout from "./Layout/Layout";
//pages
import Login from "../pages/login/Login";
//context
import {useUserState} from "../context/UserContext";

export default function App() {
    //global

    let {isAuthenticated} = useUserState();

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/newsfeeds"/>}/>
                <Route
                    exact
                    path="/app"
                    render={() => <Redirect to="/app/newsfeeds" />}
                />
                <PrivateRoute path="/app" component={Layout}/>
                <PublicRoute exact path="/login" component={Login}/>
            </Switch>
        </HashRouter>
    )

    function PrivateRoute({component, ...rest}) {
        return (
            <Route
                {...rest}
                render={props => isAuthenticated ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: {
                            from: props.location
                        },
                    }}/>
                )}
            />)
    }

    function PublicRoute({component, ...rest}) {
        return (
            <Route {...rest} render={props => isAuthenticated ? (
                <Redirect to={{pathname: "/"}}/>
            ) : (
                React.createElement(component, props)
            )}/>
        )
    }
};
