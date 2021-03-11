import React, {useState, useEffect} from "react";
import {Drawer, IconButton, List} from "@material-ui/core";
import {
    Home as HomeIcon,
    NotificationsNone as NotificationsIcon,
    FormatSize as TypographyIcon,
    ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import {useTheme} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
    {
        id: 0,
        label: "Newsfeed",
        link: "/app/Newsfeed",
        icon: <HomeIcon/>
    },
    {
        id: 1,
        label: "Group",
        link: "/app/group",
        icon: <NotificationsIcon/>
    },
    {
        id: 2,
        label: "Event",
        link: "/app/event",
        icon: <TypographyIcon/>
    }
];

function Sidebar({location}) {
    let classes = useStyles();
    let theme = useTheme();

    let {isSidebarOpened} = useLayoutState();
    let layoutDispatch = useLayoutDispatch();
    let [isPermanent, setPermanent] = useState(true);

    useEffect(function () {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer variant={isPermanent ? "permanent" : "temporary"}
                className={classnames(classes.drawer, {
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened
                })}
                classes={{
                    paper: classnames({
                        [classes.drawerOpen]: isSidebarOpened,
                        [classes.drawerClose]: !isSidebarOpened
                    }),
                }}
                open={isSidebarOpened}
        >
            <div className={classes.toolbar}/>
            <div className={classes.mobileBackButton}>
                <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                    <ArrowBackIcon classes={{
                        root: classnames(classes.headerIcon, classes.headerIconCollapse),
                    }}/>
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {structure.map(link => (
                    <SidebarLink key={link.id}
                                 location={location}
                                 isSidebarOpened={isSidebarOpened}
                                 {...link}/>
                ))}
            </List>
        </Drawer>
    );

    function handleWindowWidthChange() {
        let windowWidth = window.innerWidth;
        let breakpointWidth = theme.breakpoints.values.md;
        let isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }
}

export default withRouter(Sidebar);
