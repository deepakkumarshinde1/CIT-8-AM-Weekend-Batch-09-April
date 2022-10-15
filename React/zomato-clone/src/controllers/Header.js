import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";

function Header(props) {
  let { color } = props;

  let readToken = async () => {
    // read from local storage
    try {
      let token = localStorage.getItem("token");
      token = await jwt_decode(token);
      return token;
    } catch (error) {
      localStorage.removeItem("token");
      return false;
    }
  };
  let [user, setUser] = useState(readToken());
  let onSuccess = (credentialResponse) => {
    let token = credentialResponse.credential;
    // storage
    // create or store
    localStorage.setItem("token", token);
    alert("login successfully");
    window.location.assign("/");
  };
  let onError = () => {
    console.log("Login Failed");
    alert("Google login Error");
  };
  return (
    <>
      <GoogleOAuthProvider clientId="157052762268-ourfudmb451jjktbi19kne7r3iri8r1p.apps.googleusercontent.com">
        <div
          className="modal fade"
          id="modal-login"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  User Login
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />;
              </div>
            </div>
          </div>
        </div>
        <div className={`row justify-content-center w-100 ${color}`}>
          <div className="col-10 d-flex justify-content-between py-2">
            {color === "" ? <p></p> : <p className="m-0 brand">Z</p>}

            <div>
              <button
                className="btn text-white"
                data-bs-toggle="modal"
                data-bs-target="#modal-login"
              >
                Login
              </button>
              <button className="btn btn-outline-light">
                <i className="fa fa-search" aria-hidden="true"></i>Create a
                Account
              </button>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default Header;
