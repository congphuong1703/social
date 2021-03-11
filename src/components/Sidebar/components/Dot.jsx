import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core";
import classnames from 'classnames';


var useStyles = makeStyles(theme => ({
    dotBase: {
        width: 8,
        height: 8,
        backgroundColor: theme.palette.text.hint,
        borderRadius: "50%",
        transition: theme.transitions.create("background-color")
    },
    dotSmall: {
        width: 5,
        height: 5
    },
    dotLarge: {
        width: 11,
        height: 11,
    }

}));

export default function Dot({size, color}) {
    let classes = useStyles();
    let theme = useTheme();

    return (
        <div className={classnames(classnames.dotBase, {
            [classes.dotLarge]: size === "large",
            [classes.dotSmall]: size === "small",
        })}
             sytle={{
                 backgroundColor: color && theme.palette[color] && theme.palette[color].main,
             }}
        />
    );
}
