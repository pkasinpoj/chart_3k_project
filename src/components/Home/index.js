import { Component } from "react";
import Link from "next/link";
import { API } from "../../config/api";
import Axios from "axios";
import SelectComponent from "./Select";
import { Row, Col } from "reactstrap";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          pathName: "checkfaculty-university",
          name: "Check Faculty University",
        },
        {
          pathName: "checkAllyearInUniversity",
          name: "Check All year In University",
        },
        {
          pathName: "checkfaculty-year",
          name: "Check Faculty year",
        },
        {
          pathName: "checkAllAmount-AllUniversity",
          name: "Check All Amount - All University",
        },
        {
          pathName: "checkEndAmount-Year",
          name: "Check End Amount - Year",
        },
      ],
    };
  }

  componentDidMount() {
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
      })
      .catch((err) => {
        console.log(err);
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
    console.log("body==", body);
    return (
      <div>
        <dev className="justify-content-center">
          <h1 className="d-flex justify-content-center">Chart 3K</h1>
          <div className="p-5 d-flex justify-content-center ">
            <Row>
              <Col md={6}>
                <SelectComponent
                  name={university.name}
                  data={university.data}
                  onSelect={this._onSelect}
                  className="ml-2 mr-2"
                />
              </Col>
              <Col md={6}>
                <SelectComponent
                  name={faculty.name}
                  data={faculty.data}
                  onSelect={this._onSelect}
                  className="ml-2 mr-2"
                />
              </Col>
              <Col md={6}>
                <SelectComponent name={years.name} data={years.data} onSelect={this._onSelect} className="ml-2 mr-2" />
              </Col>
              <Col md={6}>
                <SelectComponent
                  name={endYear.name}
                  data={endYear.data}
                  onSelect={this._onSelect}
                  className="ml-2 mr-2"
                />
              </Col>
            </Row>
          </div>

          <div className="p-5 d-flex justify-content-center">
          
            {charts.map((value, index) => {
              return (
                <Link href={{ pathname: `/chart/${value.pathName}`, query: body }}>
                  <button type="button" className="btn btn-primary ml-2 mr-2">
                    {value.name}
                  </button>
                </Link>
              );
            })}
          </div>
        </dev>
      </div>
    );
  }
}
export default Home;
