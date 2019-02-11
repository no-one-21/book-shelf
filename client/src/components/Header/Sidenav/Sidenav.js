import React from 'react';
import Sidenav from 'react-simple-sidenav';
import SidenavItems from './SidenavItems'

const Nav = (props) =>{
    return(
        <Sidenav
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle = {{
            background:'#242424',
            maxWidth:'220px' 
        }}
        >
            <SidenavItems/>
        </Sidenav>
    );
};

export default Nav;