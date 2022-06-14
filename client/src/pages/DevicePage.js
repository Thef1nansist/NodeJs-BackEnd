import React, { useContext, useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBasket,
  deleteDevice,
  fetchOneDevice,
  updateDeviceAPI,
} from "../http/deviceAPI";
import { BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import jwt_decode from "jwt-decode";
import { Context } from "..";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [name, setName] = useState("Standart");
  const [priceValue, setPrice] = useState(0);
  const { id } = useParams();
  const { user } = useContext(Context);
  const history = useNavigate();
  const dev = useContext(Context);

  const addDeviceInBasket = () => {
    if (user.isAuth) {
      const formData = new FormData();
      let amount = dev.device.getAmount;
      if (amount < 0) {
        dev.device.setAmount(0);
        amount = device.price;
      }
      formData.append("userId", jwt_decode(localStorage.getItem("token")).id);
      formData.append("deviceId", id);
      dev.device.setAmount(amount + device.price);
      createBasket(formData).then((data) => history(BASKET_ROUTE));
    } else {
      history(LOGIN_ROUTE);
    }
  };
  const removeDevice = () => {
    deleteDevice(id).then((data) => {
      history(SHOP_ROUTE);
    });
  };
  const updateDevice = () => {
    console.log(device.price);
    if (name == "Standart") {
      setName(device.name);
    } else if (priceValue == 0) {
      setPrice(device.price);
    }
    console.log(priceValue);
    const formDat = new FormData();
    formDat.append("id", id);
    formDat.append("name", name);
    formDat.append("price", priceValue);
    console.log("---------");
    updateDeviceAPI(formDat).then((data) => {
      history(SHOP_ROUTE);
    });
  };

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={"https://localhost:5000/" + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2 className="d-flex align-items-center justify-content-center">
              {device.name}
            </h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              with: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>От {device.price} $</h3>
            {jwt_decode(localStorage.getItem("token")).role === "ADMIN" ? (
              <Button variant="outline-danger" onClick={() => removeDevice()}>
                Удалить
              </Button>
            ) : (
              <Button
                variant="outline-dark"
                onClick={() => addDeviceInBasket()}
              >
                Добавить в коризну
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column mt-3">
        <h1>Характеристики</h1>
        {device.info.map((inf, index) => (
          <Row
            key={inf.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {inf.title}:{inf.description}
          </Row>
        ))}
      </Row>
      {jwt_decode(localStorage.getItem("token")).role === "ADMIN" ? (
        <Row>
          <Form>
            <h3>Name</h3>
            <FormControl onChange={(e) => setName(e.target.value)} />
            <h3>Price</h3>
            <FormControl onChange={(e) => setPrice(e.target.value)} />
            <Button variant="outline-dark" onClick={() => updateDevice()}>
              Обновить
            </Button>
          </Form>
        </Row>
      ) : null}
    </Container>
  );
};

export default DevicePage;
