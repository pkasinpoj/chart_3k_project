import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

class NavbarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  Loader = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  componentDidMount() {
    this.Loader(true);
  }

  _onSelect = (e) => {};

  render() {
    // let { } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Chart 3K</NavbarBrand>
          <Collapse navbar>
            <Nav className="mr-auto d-flex" navbar>
              <NavItem>
                <NavLink href="/company">Company</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/upload">Upload</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavbarWrapper;
