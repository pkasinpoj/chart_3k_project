import Head from "next/head";
import NavbarWrapper from "../NavbarWrapper";

const Layout = ({ children }) => (
  <div className="bg-color">
    <Head>
      <title>Chart App</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <NavbarWrapper />
    <div className="container mt-5 ">{children}</div>
  </div>
);

export default Layout;
