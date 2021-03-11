import React from "react";
import {
    Route,
    Switch,
    Redirect,
    withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
    mdiFacebook as FacebookIcon,
    mdiTwitter as TwitterIcon,
    mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
// pages
import Groups from "../../pages/groups";
import Newsfeed from "../../pages/Newsfeed";
import Events from "../../pages/events";
// context
import {useLayoutState} from "../../context/LayoutContext";

function Layout(props) {
    var classes = useStyles();

    // global
    var layoutState = useLayoutState();

    return (
        <div className={classes.root}>
            <>
                <Header history={props.history}/>
                <Sidebar/>
                <div
                    className={classnames(classes.content, {
                        [classes.contentShift]: layoutState.isSidebarOpened,
                    })}
                >
                    <div className={classes.fakeToolbar}/>
                    <Switch>
                        <Route path="/app/newsfeeds" component={Newsfeeds}/>
                        <Route path="/app/groups" component={Groups}/>
                        <Route path="/app/events" component={Events}/>
                    </Switch>
                </div>
            </>
        </div>
    );
}

export default withRouter(Layout);
