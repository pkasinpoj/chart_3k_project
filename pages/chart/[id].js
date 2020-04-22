import Link from "next/link";
import { useEffect, Component } from "react";
import { withRouter, useRouter } from "next/router";
import ChartComponent from "../../src/components/Chart";
import Layout from "../../src/components/Layout";
import Axios from "axios";
import { API } from "../../src/config/api";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        key: [],
        amounts: [],
      },
    };
  }
  componentWillReceiveProps(nextProps) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let { data } = this.state;

    return (
      <dev className="container">
        <Layout>
          <Link href="/">
            <button type="button" class="btn btn-outline-primary ml-2 mr-2 mb-5">
              back to Home
            </button>
          </Link>
          <ChartComponent data={data} />
        </Layout>
      </dev>
    );
  }
}
export default withRouter(Chart);
