import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/Models/CreateBrand";
import CreateDevice from "../components/Models/CreateDevice";
import CreateType from "../components/Models/CreateType";
import CrudBrand from "../components/Models/CrudBrand";
import CrudType from "../components/Models/CrudType";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [crudBrandVisible, setCrudBrandVisible] = useState(false);
  const [crudTypeVisible, setCrudTypeVisible] = useState(false);

  return (
    <Container>
      <Button
        variant="outline-dark"
        onClick={() => setTypeVisible(true)}
        className="mt-4 p-2"
      >
        Добавить Тип
      </Button>
      <Button
        variant="outline-dark"
        onClick={() => setBrandVisible(true)}
        className="mt-4 p-2"
      >
        Добавить Бренд
      </Button>
      <Button
        variant="outline-dark"
        onClick={() => setDeviceVisible(true)}
        className="mt-4 p-2"
      >
        Добавить Устройство
      </Button>
      <Button
        variant="outline-dark"
        onClick={() => setCrudBrandVisible(true)}
        className="mt-4 p-2"
      >
        Изменить Брэнд
      </Button>
      <Button
        variant="outline-dark"
        onClick={() => setCrudTypeVisible(true)}
        className="mt-4 p-2"
      >
        Изменить Тип
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CrudBrand
        show={crudBrandVisible}
        onHide={() => setCrudBrandVisible(false)}
      />
      <CrudType
        show={crudTypeVisible}
        onHide={() => setCrudTypeVisible(false)}
      />
    </Container>
  );
};

export default Admin;
