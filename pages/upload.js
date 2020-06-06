import React, { Component } from "react";
import { Row, Col, Label, Input, Alert } from "reactstrap";
import Link from "next/link";
import Axios from "axios";
import { API } from "../src/config/api";
import SelectComponent from "../src/components/Select";
import LoaderComponent from "../src/components/Loader";
import Layout from "../src/components/Layout";
import Router from "next/router";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      company: {
        file: "",
        name: "",
      },
      student: {
        file: "",
        name: "",
      },
      alert: "",
    };
    this.inputRefCompany = React.createRef();
    this.inputRefStudent = React.createRef();
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
        this.Loader(false);
      })
      .catch((err) => {
        console.log(err);
        this.Loader(false);
      });
  }

  _onSelect = (e) => {
    this.setState({
      [e.target.name]: {
        ...this.state[e.target.name],
        file: e.target.files[0],
        name: e.target.files[0].name,
      },
    });
  };
  upload = (type) => {
    let { company, student } = this.state;
    console.log(company);

    let data = new FormData();

    switch (type) {
      case "company":
        data.append("file", company.file);
        Axios.post(API.UPLOAD_COMPANY, data)
          .then((res) => {
            this._alert(res.data.statusName, "company");

          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "student":
        data.append("file", student.file);
        Axios.post(API.UPLOAD_STUDENT, data)
          .then((res) => {
            this._alert(res.data.statusName, "student");

            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      default:
        break;
    }
  };

  _alert = (text, name) => {
    this.setState({
      [name]: {
        ...this.state[name],
        file: "",
        name: "",
      },
      alert: <Alert color="success">{text}</Alert>,
    });
    setInterval(() => {
      this.setState({
        alert: "",
      });
    }, 3000);
  };

  render() {
    let { company, student } = this.state;
    return this.state.isLoading ? (
      <LoaderComponent />
    ) : (
      <Layout>
        {this.state.alert}
        <h1 for="company" className="text-center mt-3 mb-3">
          company
        </h1>
        <Row>
          <Col md={6} className="text-center">
            <input
              type="file"
              name="company"
              id="company"
              // value={company}
              onChange={this._onSelect}
              ref={(e) => (this.inputRefCompany = e)}
              className="hidden-input"
            />
            <div className="upload-border" onClick={() => this.inputRefCompany.click()}>
              {company.name ? (
                <div className="text-center">{company.name}</div>
              ) : (
                <div className="upload-plus">&#43;</div>
              )}
            </div>
            <h5 for="company" className="text-center mt-3 mb-3">
              company
            </h5>
            <button
              id="uploadCompany"
              type="button"
              className="btn btn-primary ml-2 mr-2"
              onClick={() => this.upload("company")}
            >
              Upload Company
            </button>
          </Col>
          <Col md={6} className="text-center">
            <input
              type="file"
              name="student"
              id="student"
              onChange={this._onSelect}
              ref={(e) => (this.inputRefStudent = e)}
              className="hidden-input"
            />

            <div className="upload-border" onClick={() => this.inputRefStudent.click()}>
              {student.name ? (
                <div className="text-center">{student.name}</div>
              ) : (
                <div className="upload-plus">&#43;</div>
              )}
            </div>
            <h5 for="student" className="text-center mt-3 mb-3">
              student
            </h5>
            <button
              id="uploadCompany"
              type="button"
              className="btn btn-primary ml-2 mr-2"
              onClick={() => this.upload("student")}
            >
              Upload Student
            </button>
          </Col>
        </Row>
        {this._alert}
      </Layout>
    );
  }
}
export default Company;
