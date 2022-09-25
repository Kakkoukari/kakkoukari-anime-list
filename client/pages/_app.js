import "../styles/globals.css";
import NavBar from "../components/navbar";
import buildClient from "../api/build-client";
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  console.log("hello");
  const client = buildClient(appContext.ctx);
  try {
    const { data } = await client.get("/api/users/currentuser");

    console.log("I am the current user:", data);
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(
        appContext.ctx,
        client,
        data.currentUser
      );
    }

    return {
      pageProps,
      ...data,
    };
  } catch (e) {
    console.log(e);
    return {
      currentUser: undefined,
    };
  }
};

export default AppComponent;
