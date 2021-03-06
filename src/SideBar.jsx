import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'


class SideNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathName,
            items: [
                {
                    path: '/',
                    name: 'Newsfeed',
                    css: 'fa fa-fw fa-home',
                    key: 1,
                },
                {
                    path: '/group',
                    name: 'Group',
                    css: '',
                    key: 2
                }, {
                    path: '/event',
                    name: 'Event',
                    css: '',
                    key: 3
                }
            ]
        }
    }

    onItemClick = (path) => {
        this.setState({activePath: path});
    }

    render() {
        const {items, activePath} = this.state;
        return (
            <div>
                {items.map((item) => {
                    return (
                        <NavItem
                            path={item.path}
                            name={item.name}
                            css={item.css}
                            onItemClick={this.onItemClick}
                            active={item.path === activePath}
                            key={item.key}
                        />
                    );
                })}
            </div>
        )
    }
}

const RouterSideNav = withRouter(SideNav);

class NavItem extends React.Component {
    handleClick = () => {
        const {path, onItemClick} = this.props;
        onItemClick(path);
    }

    render(){
        const {active} = this.props;
        return(
            <div>

            </div>
        )
    }
}

