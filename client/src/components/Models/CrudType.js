import { useContext, useState } from "react";
import {
  Dropdown,
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { Context } from "../..";
import { createBrand, deleteBrand, deleteType } from "../../http/deviceAPI";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CrudType = observer(({ show, onHide }) => {
  const [value, setValue] = useState("");
  const { device } = useContext(Context);
  const removeType = () => {
    deleteType(device.getSelectedType.id).then((data) => {
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-model-title-vcenter">Изменить тип</ModalTitle>
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
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          {" "}
          Закрыть
        </Button>
        <Button variant="outline-warning" onClick={removeType}>
          {" "}
          Удалить
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default CrudType;
