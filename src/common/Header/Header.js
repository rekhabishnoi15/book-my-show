import React from "react";
import Logo from "../../assets/logo.svg";
//style
import "./Header.css";
//react router dom
import { useHistory } from "react-router-dom";
//react-modal
import Modal from "react-modal";
//material ui
import Button from "@material-ui/core/Button";
import {
  AppBar,
  Tabs,
  Tab,
  FormControl,
  TextField,
  Typography,
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

Modal.setAppElement("#root");

function Header() {
  const [isLogin, setIsLogin] = React.useState(false);
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
    password: "",
    number: "",
  });
  const [registrationId, setRegistrationId] = React.useState("");
  const history = useHistory();

  function openModal() {
    setIsModalOpen(true);
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

  async function loginSubmitHandler(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setIsLogin(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function registerSubmitHandler(e) {
    e.preventDefault();
    const payload = {
      email_address: registerState.email,
      first_name: registerState.firstname,
      last_name: registerState.lastname,
      mobile_number: registerState.number,
      password: registerState.password,
    };

    try {
      const res = await fetch("/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setRegistrationId(data.id);
    } catch (err) {}
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <img
          src={Logo}
          alt="Logo"
          height={35}
          width={35}
          fill="#ff7777"
          className="header__logo"
        />

        <div className="header__btnContainer">
          {history.location.pathname.includes("/movie/") && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (isLogin) {
                  history.push("/book");
                } else openModal();
              }}
            >
              Book Show
            </Button>
          )}
          {!isLogin ? (
            <Button variant="contained" onClick={openModal}>
              Login
            </Button>
          ) : (
            <Button variant="contained">Logout</Button>
          )}
        </div>
      </nav>

      {/* model window */}

      <AppBar position="static">
        <Modal
          isOpen={isModalOpen}
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
            <form onSubmit={registerSubmitHandler} className="headerform">
              <FormControl>
                <TextField
                  value={registerState.firstname}
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
                  value={registerState.lastname}
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
                  value={registerState.username}
                  onChange={(e) =>
                    registerStateHandler("email", e.target.value)
                  }
                  type="email"
                  placeholder="Email*"
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  value={registerState.password}
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
                  value={registerState.number}
                  type="text"
                  placeholder="Contact No.*"
                  onChange={(e) =>
                    registerStateHandler("number", e.target.value)
                  }
                  required
                />
              </FormControl>

              <Typography>
                {registrationId ? "Registration Successful. Please Login!" : ""}
              </Typography>

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
