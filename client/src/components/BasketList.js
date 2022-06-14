import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Row } from "react-bootstrap";
import BasketItem from "./BasketItem";

const BasketList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.getBasketDevices.map((device) => (
        <BasketItem key={device.id} device={device} />
      ))}
    </Row>
  );
});

export default BasketList;
