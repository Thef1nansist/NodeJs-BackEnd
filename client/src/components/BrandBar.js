import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import { Context } from "..";
import { Card } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  const [isSelected, setIsSelected] = useState(true);

  const handleCLick = (brand) => {
    if (isSelected) {
      device.setSelectedBrand(brand);
      setIsSelected((prevState) => !prevState);
    } else {
      device.setSelectedBrand({});
      setIsSelected((prevState) => !prevState);
    }
  };

  return (
    <Row className="d-flex">
      {device.getBrands.map((brand) => (
        <Col>
          <Card
            key={brand.id}
            className="p-3"
            style={{ cursor: "pointer" }}
            border={
              brand.id === device.getSelectedBrand.id ? "danger" : "light"
            }
            onClick={() => handleCLick(brand)}
          >
            {brand.name}
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default BrandBar;
