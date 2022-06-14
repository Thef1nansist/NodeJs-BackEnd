import React, { useContext, useState } from "react";
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { Button, Form, FormControl } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { searchDevice } from "../http/deviceAPI";

const NavBar = observer(() => {
  const { user, device } = useContext(Context);
  const history = useNavigate();
  const [name, setName] = useState("");

  const logOut = () => {
    user.setUser({});
    user.setAuth(false);
    localStorage.clear();
    history(LOGIN_ROUTE);
  };

  const searchItem = () => {
    if (name != "") {
      searchDevice(name).then((data) => {
        device.setDevices(data.rows);
      });
    }
    setName("");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink
          className={"text-decoration-none"}
          style={{ color: "white" }}
          to={SHOP_ROUTE}
        >
          9 Element
        </NavLink>
        <Form className="d-flex">
          <FormControl
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button onClick={() => searchItem()} variant="outline-success">
            Поиск
          </Button>
        </Form>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            {jwt_decode(localStorage.getItem("token")).role === "ADMIN" ? (
              <Button
                variant={"outline-light"}
                onClick={() => history(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
            ) : (
              <Button
                variant={"outline-light"}
                onClick={() => history(BASKET_ROUTE)}
              >
                Корзина
              </Button>
            )}

            <Button
              className="ms-2"
              variant={"outline-light"}
              onClick={() => logOut()}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant="outline-light"
              onClick={() => history(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
