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

const WSPushNotify = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-model-title-vcenter">
          Новое уведомление
        </ModalTitle>
      </ModalHeader>
      <ModalBody>Скидки до конца мая, успей купить!</ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          {" "}
          Закрыть
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WSPushNotify;
