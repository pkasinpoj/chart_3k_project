import Link from "next/link";
import { useEffect, Component } from "react";
import { withRouter, useRouter } from "next/router";
import ChartComponent from "../../src/components/Chart";
import Layout from "../../src/components/Layout";
import Axios from "axios";
import { API } from "../../src/config/api";
import LoaderComponent from "../../src/components/Loader";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {
        name: "",
        key: [],
        amounts: [],
      },
    };
  }

  Loader = (status) => {
    this.setState({
      isLoading: status,
    });
  };
  componentWillReceiveProps(nextProps) {
    this.Loader(true);
    let { query } = nextProps.router;
    let name = "";
    switch (query.id) {
      case "checkfaculty-university": {
        name = "facultys";
        break;
      }
      case "checkAllyearInUniversity": {
        name = "years";
        break;
      }
      case "checkfaculty-year": {
        name = "university_names";
        break;
      }
      case "checkAllAmount-AllUniversity": {
        name = "years";
        break;
      }
      case "checkEndAmount-Year": {
        name = "facultys";
        break;
      }
      case "check-most-faculty-company": {
        name = "facultys";
        break;
      }
      case "check-lowest-faculty-company": {
        name = "facultys";
        break;
      }
      case "check-faculty-company": {
        name = "facultys";
        break;
      }
      default:
        break;
    }
    let data = Axios.post(`${API.DOMAIN}/${query.id}`, query)
      .then((res) => {
        // console.log("\n== res ==\n", res);

        this.setState({
          data: {
            ...data,
            name: name,
            key: res.data[name],
            amounts: res.data.amounts,
          },
        });
        this.Loader(false);
      })
      .catch((err) => {
        console.log( err );
        this.Loader(false);
      });
  }

  render() {
    let { data, isLoading } = this.state;

    return (
      <Layout>
        <Link href="/">
          <button type="button" class="btn btn-primary ml-2 mr-2 mb-5">
            back to Home
          </button>
        </Link>
        <ChartComponent data={data} />
        {isLoading ? (
          <div className="bg bg-color bg-loader">
            <LoaderComponent />
          </div>
        ) : (
          ""
        )}
      </Layout>
    );
  }
}
export default withRouter(Chart);
