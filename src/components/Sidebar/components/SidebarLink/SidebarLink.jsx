import React, {useState} from 'react';
import {Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {Inbox as InboxIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import useStyles from './styles';

import Dot from "../Dot";

export default function SidebarLink({
                                        link,
                                        icon,
                                        label,
                                        children,
                                        location,
                                        isSidebarOpened,
                                        nested,
                                        type
                                    }) {
    let classes = useStyles();
    let [isOpen, setIsOpen] = useState(false);
    let isLinkActive =
        link && (location.pathname === link || location.pathname.indexOf(link) !== -1);

    if (type === "title")
        return (
            <Typography className={classnames(classes.linkText, classes.sectionTitle, {
                [classes.linkTextHidden]: !isSidebarOpened
            })}>
                {label}
            </Typography>
        );

    if (type === "divider") return <Divider className={classes.divider}/>;

    if (!children)
        return (
            <ListItem
                button
                component={link && Link}
                to={link}
                className={classes.link}
                classes={{
                    root: classnames(classes.linkRoot, {
                        [classes.linkActive]: isLinkActive && !nested,
                        [classes.linkNested]: nested
                    }),
                }}
                disableRipple>
                <ListItemIcon
                    className={classnames(classes.linkIcon, {
                        [classes.linkIconActive]: isLinkActive,
                    })}>
                    {nested ? <Dot color={isLinkActive && "primary"}/> : icon}
                </ListItemIcon>
                <ListItemText
                    classes={{
                        primary: classnames(classes.linkText, {
                            [classes.linkTextActive]: isLinkActive,
                            [classes.linkTextHidden]: !isSidebarOpened,
                        }),
                    }}
                    primary={label}/>
            </ListItem>
        );

    function toggleCollapse(e) {
        if (isSidebarOpened) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    }

    return (
        <>
            <ListItem
                button
                component={link && Link}
                onClick={toggleCollapse}
                className={classes.link}
                to={link}
                disableRippe
            >
                <ListItemIcon
                    className={classnames(classes.linkIcon, {
                        [classes.linkIconActive]: isLinkActive,
                    })}>
                    {icon ? icon : <InboxIcon/>}
                </ListItemIcon>
                <ListItemText
                    classes = {{
                        primary : classnames(classes.linkText,{
                            [classes.linkTextActive] : isLinkActive,
                            [classes.linkTextHidden] : !isSidebarOpened,
                        })
                    }}
                >

                </ListItemText>
            </ListItem>
        </>
    );

}
