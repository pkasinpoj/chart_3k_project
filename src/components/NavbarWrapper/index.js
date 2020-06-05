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
      university: {
        name: "university_name",
        data: [],
      },
      faculty: {
        name: "faculty",
        data: [],
      },
      years: {
        name: "year",
        data: [],
      },
      endYear: {
        name: "endyear",
        data: [],
      },
      body: {},
      charts: [
        {
          label: "[university_name, year]",
          pathName: "checkfaculty-university",
          name: "Check Faculty University",
        },
        {
          label: "[university_name]",
          pathName: "checkAllyearInUniversity",
          name: "Check All year In University",
        },
        {
          label: "[year, faculty]",
          pathName: "checkfaculty-year",
          name: "Check Faculty year",
        },
        {
          label: "[]",
          pathName: "checkAllAmount-AllUniversity",
          name: "Check All Amount - All University",
        },
        {
          label: "[endyear]",
          pathName: "checkEndAmount-Year",
          name: "Check End Amount - Year",
        },
      ],
    };
  }

  Loader = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  componentDidMount() {
    this.Loader(true);
    let data = Axios.get(API.HOME)
      .then((res) => {
        this.setState({
          university: {
            name: "university_name",
            data: res.data.university_names,
          },
          faculty: {
            name: "faculty",
            data: res.data.facultys,
          },
          years: {
            name: "year",
            data: res.data.years,
          },
          endYear: {
            name: "endyear",
            data: res.data.endyear,
          },
          body: {
            university_name: res.data.university_names[0],
            faculty: res.data.facultys[0],
            year: res.data.years[0],
            endyear: res.data.endyear[0],
          },
        });
        this.Loader(false);
      })
      .catch((err) => {
        console.log(err);
        this.Loader(false);
      });
  }

  _onSelect = (e) => {
    this.setState({
      body: {
        ...this.state.body,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    // let { } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavbarWrapper;
