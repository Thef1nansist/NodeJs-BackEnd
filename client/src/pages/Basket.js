import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BasketList from "../components/BasketList";
import { fetchDevicesInBasket } from "../http/deviceAPI";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { STRIPE_ROUTE } from "../utils/consts";

const Basket = observer(() => {
  const { device } = useContext(Context);
  const history = useNavigate();
  const stripe = () => {
    let amount = 0;
    let arrayOfElements = device.getBasketDevices;
    arrayOfElements.forEach((element) => {
      amount += element.price;
    });
    device.setAmount(amount);
    history(STRIPE_ROUTE);
  };
  useEffect(() => {
    fetchDevicesInBasket(jwt_decode(localStorage.getItem("token")).id).then(
      (data) => device.setBasketDevices(data)
    );
  }, []);

  return (
    <Container className="container">
      <Row className="mt-2">
        <BasketList />
      </Row>
      {device.getBasketDevices != 0 ? (
        <Row>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Total:
            <div
              style={{
                marginLeft: "auto",
              }}
            >
              {device.getAmount}$
            </div>
          </div>
          <Button onClick={stripe}>Оплатить</Button>
        </Row>
      ) : (
        <Row>
          <h1 className="d-flex flex-column align-items-center">
            Добавьте товары в корзину!
          </h1>
        </Row>
      )}
    </Container>
  );
});

export default Basket;
