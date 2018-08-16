import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

import nav from '../data/nav';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const navItem = (item, key) => {
      const disabled = item.disabled ? 'disabled' : '';
      const classes = {
        item: `${item.class}`,
        link: `nav-link ${disabled}`,
        icon: `${item.icon}`
      };
      return navLink(item, key, classes);
    };

    const navList = items => {
      return items.map((item, index) => navItem(item, index));
    };

    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';
      return (
        <NavItem key={key} className={classes.item}>
          {
            <NavLink to={url} className={classes.link} activeClassName="active">
              <i className={classes.icon} />&nbsp;
              {item.name}
            </NavLink>
          }
        </NavItem>
      );
    };

    return (
      <div>
        <Navbar dark className="header" expand="md">
          <NavbarBrand href="/">Logo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto">{navList(nav.items)}</Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
