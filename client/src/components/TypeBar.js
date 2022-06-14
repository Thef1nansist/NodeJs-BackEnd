import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "..";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  const [isSelected, setIsSelected] = useState(true);

  const handleCLick = (type) => {
    if (isSelected) {
      device.setSelectedType(type);
      setIsSelected((prevState) => !prevState);
    } else {
      device.setSelectedType({});
      setIsSelected((prevState) => !prevState);
    }
  };
  return (
    <ListGroup>
      {device.getTypes.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === device.getSelectedType.id}
          onClick={() => handleCLick(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
