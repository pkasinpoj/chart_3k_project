import Layout from "../src/components/Layout";
import Home from "../src/components/Home";
import LoaderComponent from "../src/components/Loader";

export default () => {
  return (
    <div className="bg-color">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
};
