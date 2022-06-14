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
import { createBrand, deleteBrand } from "../../http/deviceAPI";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CrudBrand = observer(({ show, onHide }) => {
  const [value, setValue] = useState("");
  const { device } = useContext(Context);
  const removeBrand = () => {
    deleteBrand(device.getSelectedBrand.id).then((data) => {
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-model-title-vcenter">
          Изменить бренд
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
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
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          {" "}
          Закрыть
        </Button>
        <Button variant="outline-warning" onClick={removeBrand}>
          {" "}
          Удалить
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default CrudBrand;
