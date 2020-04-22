import Layout from "../src/components/Layout";
import LoaderComponent from "../src/components/Loader";

export default () => {
  return (
    <div className="bg-color">
      <Layout>
        <LoaderComponent />
      </Layout>
    </div>
  );
};
