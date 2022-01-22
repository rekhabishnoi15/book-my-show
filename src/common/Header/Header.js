import React from "react";
import Logo from "../../assets/logo.svg";
//style
import "./Header.css";
//react router dom
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
//react-modal
import Modal from "react-modal";
//material ui
import {
  AppBar,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Input,
  TextField,
} from "@material-ui/core/";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Header() {
  const isLogin = false;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tabNum, setTabNum] = React.useState(0);
  const [loginState, setLoginState] = React.useState({
    username: "",
    password: "",
  });
  const [registerState, setRegisterState] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    number: "",
  });

  function openModal() {
    setIsModalOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  //tab value change handler
  const handleChange = (e, num) => {
    setTabNum(num);
  };

  function loginStateHandler(name, value) {
    setLoginState({ ...loginState, [name]: value });
  }

  function registerStateHandler(name, value) {
    setRegisterState({ ...registerState, [name]: value });
  }

  function loginSubmitHandler(e) {}

  function registerSubmitHandler(e) {}

  return (
    <header className="header">
      <nav className="header__nav">
        {/* <Logo /> */}
        <img
          src={Logo}
          alt="Logo"
          height={35}
          width={35}
          fill="#ff7777"
          className="header__logo"
        />

        {/* <Link> */}

        <div className="header__btnContainer">
          {!isLogin ? (
            <Button variant="contained" onClick={openModal}>
              Login
            </Button>
          ) : (
            <React.Fragment>
              <Button variant="contained" color="primary">
                Book Show
              </Button>
              <Button variant="contained">Logout</Button>
            </React.Fragment>
          )}
        </div>
        {/* </Link> */}
      </nav>
      <AppBar position="static">
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <Tabs value={tabNum} variant="fullWidth" onChange={handleChange}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {/* login form */}

          {tabNum === 0 && (
            <form onSubmit={loginSubmitHandler} className="headerform">
              <FormControl>
                <TextField
                  value={loginState.username}
                  onChange={(e) =>
                    loginStateHandler("username", e.target.value)
                  }
                  type="text"
                  placeholder="Username*"
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  value={loginState.password}
                  type="password"
                  placeholder="Password*"
                  onChange={(e) =>
                    loginStateHandler("password", e.target.value)
                  }
                  required
                />
              </FormControl>

              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </form>
          )}

          {/* registeration form  */}

          {tabNum === 1 && (
            <form className="headerform">
              <FormControl>
                <TextField
                  value={loginState.firstname}
                  onChange={(e) =>
                    registerStateHandler("firstname", e.target.value)
                  }
                  type="text"
                  placeholder="First Name*"
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  value={loginState.lastname}
                  onChange={(e) =>
                    registerStateHandler("lastname", e.target.value)
                  }
                  type="text"
                  placeholder="Last Name*"
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  value={loginState.username}
                  onChange={(e) =>
                    registerStateHandler("username", e.target.value)
                  }
                  type="text"
                  placeholder="Username*"
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  value={loginState.password}
                  type="password"
                  placeholder="Password*"
                  onChange={(e) =>
                    registerStateHandler("password", e.target.value)
                  }
                  required
                />
              </FormControl>

              <FormControl>
                <TextField
                  value={loginState.password}
                  type="text"
                  placeholder="Contact No.*"
                  onChange={(e) =>
                    registerStateHandler("number", e.target.value)
                  }
                  required
                />
              </FormControl>

              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </form>
          )}
        </Modal>
      </AppBar>
    </header>
  );
}

export default Header;
