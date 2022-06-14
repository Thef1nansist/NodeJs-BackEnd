import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../assets/newstar.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const history = useNavigate();
  return (
    <Col
      className="col-md-3 mt-3"
      onClick={() => history(`${DEVICE_ROUTE}/${device.id}`)}
    >
      <Card style={{ with: 158, cursor: "pointer" }} border={"light"}>
        <Image
          with={150}
          height={150}
          src={"https://localhost:5000/" + device.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div></div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
