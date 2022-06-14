import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [brand, setBrand] = useState(null);
  const [type, setType] = useState(null);

  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.getSelectedBrand.id);
    formData.append("typeId", device.getSelectedType.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((data) => onHide());
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-model-title-vcenter">
          Добавить устройство
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <DropdownToggle>
              {device.getSelectedType.name || "Выберите тип"}
            </DropdownToggle>
            <DropdownMenu>
              {device.getTypes.map((type) => (
                <DropdownItem
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <DropdownToggle>
              {device.getSelectedBrand.name || "Выберите тип"}
            </DropdownToggle>
            <DropdownMenu>
              {device.getBrands.map((brand) => (
                <DropdownItem
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <FormControl
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt3"
            placeholder="Введите название устройства"
          />
          <FormControl
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt3"
            type="number"
            placeholder="Введите стоимость устройства"
          />
          <FormControl onChange={selectFile} className="mt3" type="File" />
          <hr />

          <Button variant="outline-dark" onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-2" key={i.number}>
              <Col className="md-4">
                <FormControl
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col className="md-4">
                <FormControl
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col className="md-4">
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant="outline-danger"
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          {" "}
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          {" "}
          Добавить
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default CreateDevice;
