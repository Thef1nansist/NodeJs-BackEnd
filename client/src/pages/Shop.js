import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import WSPushNotify from "../components/Models/WSPushNotify";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

const Shop = observer(() => {
  const { device } = useContext(Context);
  const [notifyVisible, setNotifyVisible] = useState(false);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      device.getSelectedType.id,
      device.getSelectedBrand.id,
      device.getPage
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.getPage, device.getSelectedType, device.getSelectedBrand]);

  useEffect(() => {
    var ws = new WebSocket("ws://localhost:40510");
    ws.onopen = function () {
      console.log("websocket is connected ...");
      // sending a send event to websocket server
      ws.send("connected");
    };
    ws.onmessage = function (ev) {
      setNotifyVisible(true);
    };
  }, []);

  return (
    <Container className="container">
      <Row className="mt-2">
        <Col className="col-md-3">
          <TypeBar />
        </Col>
        <Col className="col-md-9">
          <WSPushNotify
            show={notifyVisible}
            onHide={() => setNotifyVisible(false)}
          />
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
