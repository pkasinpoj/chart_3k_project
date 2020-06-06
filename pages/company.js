import { Component } from "react";
import { Row, Col, Label, Input } from "reactstrap";
import Link from "next/link";
import Axios from "axios";
import { API } from "../src/config/api";
import SelectComponent from "../src/components/Select";
import LoaderComponent from "../src/components/Loader";
import Layout from "../src/components/Layout";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      years: {
        name: "year",
        data: [],
      },
      faculty: {
        name: "faculty",
        data: [],
      },
      mostFaculty: "",
      predictFaculty: "",

      body: {},
      percentJob: "0%",
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
    let data = Axios.get(API.HOME_COMPANY)
      .then((res) => {
        console.log(res.data);
        this.setState({
          faculty: {
            ...this.state.faculty,
            name: "faculty",
            data: res.data.faculty,
          },
          years: {
            ...this.state.years,
            name: "year",
            data: res.data.year,
          },
          body: {
            faculty: res.data.faculty[0],
            year: res.data.year[0],
          },
          mostFaculty: res.data.mostFaculty,
          predictFaculty: res.data.predictFaculty,
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
  _onSelectFaculty = (e) => {
    Axios.post(`${API.DOMAIN}/${query.id}`, { faculty: e.target.value }).then((res) => {});
    this.setState({
      percentJob: e.target.value,
    });
  };

  render() {
    let { faculty, years, mostFaculty, predictFaculty, body, percentJob } = this.state;
    console.log(faculty);
    console.log(mostFaculty);
    return this.state.isLoading ? (
      <LoaderComponent />
    ) : (
      <Layout>
        <div>
          <dev className="justify-content-center">
            <h1 className="d-flex justify-content-center">Company</h1>
            <div className="p-5 justify-content-center ">
              {/* //////////////1111111 */}
              <Row className="border">
                <Col md={8}></Col>
                <Col md={4} className=" m-auto pt-4 pb-4">
                  <Link href={{ pathname: `/chart/check-most-faculty-company`, query: body }}>
                    <button id="checkAllyearInUniversity" type="button" className="btn btn-primary ml-2 mr-2">
                      เช็คคณะที่มึความต้องการมากที่สุดในแต่ละปี
                    </button>
                  </Link>
                </Col>
              </Row>
              {/* //////////////1111111 */}
              <Row className="border">
                <Col md={8}></Col>
                <Col md={4} className=" m-auto pt-4 pb-4">
                  <Link href={{ pathname: `/chart/check-lowest-faculty-company`, query: body }}>
                    <button id="checkAllyearInUniversity" type="button" className="btn btn-primary ml-2 mr-2">
                      เช็คคณะที่มึความต้องการน้อยที่สุดในแต่ละปี
                    </button>
                  </Link>
                </Col>
              </Row>
              {/* //////////////1111111 */}
              <Row className="border">
                <Col md={4}></Col>
                <Col md={4} className="m-auto">
                  <h6 className="text-right">คณะที่มึความต้องการมากที่สุดในปัจจุบัน</h6>
                </Col>
                <Col md={4} className=" m-auto pt-4 pb-4">
                  <Input type="text" name="mostFaculty" value={mostFaculty} disabled />
                </Col>
              </Row>
              {/* //////////////1111111 */}
              <Row className="border">
                <Col md={4}></Col>
                <Col md={4}>
                  <SelectComponent
                    name={years.name}
                    data={years.data}
                    onSelect={this._onSelect}
                    className="ml-2 mr-2"
                  />
                </Col>
                <Col md={4} className=" m-auto pt-4 pb-4">
                  <Link href={{ pathname: `/chart/check-faculty-company`, query: body }}>
                    <button id="checkAllyearInUniversity" type="button" className="btn btn-primary ml-2 mr-2">
                      เช็คคณะต่างๆที่บริษัทต้องการ
                    </button>
                  </Link>
                </Col>
              </Row>
              {/* //////////////222222 */}
              <Row className="border">
                <Col md={4}></Col>
                <Col md={4} className="m-auto">
                  <h6 className="text-right"> คณะในอนาคคที่มึความต้องการมากที่สุด</h6>
                </Col>
                <Col md={4} className=" m-auto pt-4 pb-4">
                  <Input type="text" name="predictFaculty" value={predictFaculty} disabled />
                </Col>
              </Row>
              {/* //////////////1111111 */}
              <Row className="border">
                <Col md={4}></Col>
                <Col md={4}>
                  <SelectComponent
                    name={faculty.name}
                    data={faculty.data}
                    onSelect={this._onSelectFaculty}
                    className="ml-2 mr-2"
                  />
                </Col>
                <Col md={4} className=" m-auto pt-4 pb-4">
                  <Input type="text" name="percentJob" value={percentJob} disabled />
                </Col>
              </Row>
            </div>

            <div className="p-5 d-flex justify-content-center">
              <img src="/images/kmitl.png" alt="kmitl" className="img-size m-auto" />
              <img src="/images/kmutnb.png" alt="kmutnb" className="img-size m-auto" />
              <img src="/images/kmutnb.png" alt="kmutt" className="img-size m-auto" />
            </div>
          </dev>
        </div>
      </Layout>
    );
  }
}
export default Company;
