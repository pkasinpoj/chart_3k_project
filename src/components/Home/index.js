import { Component } from "react";
import Link from "next/link";
import { API } from "../../config/api";
import Axios from "axios";
import SelectComponent from "../Select";
import { Row, Col, Label } from "reactstrap";
import LoaderComponent from "../Loader";
// import kmitl from "../../../public/static/images/kmitl.png"
// import kmutnb from "/images/kmutnb.png";
// import kmutt from "/images/kmutt.png";
class Home extends Component {
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
        console.log( err );
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
    let { university, faculty, years, endYear, body, charts } = this.state;
    return this.state.isLoading ? (
      <LoaderComponent />
    ) : (
      <div>
        <dev className="justify-content-center">
          <h1 className="d-flex justify-content-center">Chart 3K</h1>
          <div className="p-5 justify-content-center ">
            <Row className="border">
              <Col md={4}>
                <SelectComponent
                  name={university.name}
                  data={university.data}
                  onSelect={this._onSelect}
                  className="ml-2 mr-2"
                />
              </Col>
              <Col md={4}>
                <SelectComponent name={years.name} data={years.data} onSelect={this._onSelect} className="ml-2 mr-2" />
              </Col>
              <Col md={4} className=" m-auto pt-4 pb-4">
                <Link href={{ pathname: `/chart/checkfaculty-university`, query: body }}>
                  <button id="checkfaculty-university" type="button" className="btn btn-primary ml-2 mr-2">
                    Check Faculty University
                  </button>
                </Link>
              </Col>
            </Row>
            {/* //////////////1111111 */}
            <Row className="border">
              <Col md={4}></Col>
              <Col md={4}>
                <SelectComponent
                  name={university.name}
                  data={university.data}
                  onSelect={this._onSelect}
                  className="ml-2 mr-2"
                />
              </Col>
              <Col md={4} className=" m-auto pt-4 pb-4">
                <Link href={{ pathname: `/chart/checkAllyearInUniversity`, query: body }}>
                  <button id="checkAllyearInUniversity" type="button" className="btn btn-primary ml-2 mr-2">
                    Check All year In University
                  </button>
                </Link>
              </Col>
            </Row>
            {/* //////////////222222 */}
            <Row className="border">
              <Col md={4}>
                <SelectComponent name={years.name} data={years.data} onSelect={this._onSelect} className="ml-2 mr-2" />
              </Col>
              <Col md={4}>
                <SelectComponent
                  name={faculty.name}
                  data={faculty.data}
                  onSelect={this._onSelect}
                  className="ml-2 mr-2"
                />
              </Col>
              <Col md={4} className=" m-auto pt-4 pb-4">
                <Link href={{ pathname: `/chart/checkfaculty-year`, query: body }}>
                  <button id="checkfaculty-year" type="button" className="btn btn-primary ml-2 mr-2">
                    Check Faculty year
                  </button>
                </Link>
              </Col>
            </Row>
            {/* //////////////333333 */}
            <Row className="border">
              <Col md={4}></Col>
              <Col md={4}></Col>
              <Col md={4} className=" m-auto pt-4 pb-4">
                <Link href={{ pathname: `/chart/checkAllAmount-AllUniversity`, query: body }}>
                  <button id="checkAllAmount-AllUniversity" type="button" className="btn btn-primary ml-2 mr-2">
                    Check All Amount - All University
                  </button>
                </Link>
              </Col>
            </Row>
            {/* //////////////4444444 */}
            <Row className="border">
              <Col md={4}></Col>
              <Col md={4}>
                <SelectComponent
                  name={endYear.name}
                  data={endYear.data}
                  onSelect={this._onSelect}
                  className="ml-2 mr-2"
                />
              </Col>
              <Col md={4} className=" m-auto pt-4 pb-4">
                <Link href={{ pathname: `/chart/checkEndAmount-Year`, query: body }}>
                  <button id="checkEndAmount-Year" type="button" className="btn btn-primary ml-2 mr-2">
                    Check End Amount - Year
                  </button>
                </Link>
              </Col>
            </Row>
            {/* //////////////5555555 */}
          </div>

          <div className="p-5 d-flex justify-content-center">
            <img src="/images/kmitl.png" alt="kmitl" className="img-size m-auto" />
            <img src="/images/kmutnb.png" alt="kmutnb" className="img-size m-auto"/>
            <img src="/images/kmutnb.png" alt="kmutt" className="img-size m-auto"/>
          </div>
        </dev>
      </div>
    );
  }
}
export default Home;
