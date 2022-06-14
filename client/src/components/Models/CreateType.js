import { useState } from "react";
import {
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
import { createType } from "../../http/deviceAPI";

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const addType = () => {
    createType({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-model-title-vcenter">Добавить тип</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormControl
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название типа"
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          {" "}
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addType}>
          {" "}
          Добавить
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateType;
