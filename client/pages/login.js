import Head from "next/head";
import LoginForm from "../components/LoginForm";

const Home = () => (
  <div className="container-fluid min-height-100 bg-grey">
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="row min-height-100">
      <div className="col-lg-7 m-auto d-flex justify-content-center">
        <img src="/login-pix.png" alt="smile_to_bank" className="img lg-size" />
      </div>
      <div className="col-lg-5 my-auto">
        <div className="cardboard py-3 px-5">
          <h3 className="pb-3">Legal 500</h3>
          <h4 className="pb-3">
            Register for a money making experience, its free
          </h4>
          <LoginForm />
          <p className="lead mt-4">Already have an account Sign up?</p>
        </div>
      </div>
    </div>

    <style jsx>{`
      .bg-grey {
        background: #f7f7f7 0% 0% no-repeat padding-box;
      }
      .cardboard {
        width: 425px;
        height: 580px;
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        opacity: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .lg-size {
        width: 600px;
      }
      .min-height-100 {
        min-height: 100vh !important;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Home;
