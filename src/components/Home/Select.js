import React, { Component } from "react";

import { Form, FormGroup, Label, Input } from "reactstrap";

class SelectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  _handlerDropdown = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    let { isOpen } = this.state;
    let { name, data } = this.props;

    return (
      <div className={this.props.className}>
        <Form >
          <FormGroup>
            <Label for={name}>{name}</Label>
            <Input type="select" name={name} id={name} onChange={this.props.onSelect}>
              {data.map((value, index) => {
                return (
                  <option name={name} value={value} selected={index==0?true:false}>
                    {value}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default SelectComponent;
