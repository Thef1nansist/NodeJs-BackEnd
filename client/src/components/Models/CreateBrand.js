import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { createBrand } from "../../http/deviceAPI";

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-model-title-vcenter">
          Добавить брэнд
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormControl
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название брэнда"
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          {" "}
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          {" "}
          Добавить
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateBrand;
