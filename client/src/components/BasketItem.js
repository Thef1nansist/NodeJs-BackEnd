import Image from "react-bootstrap/Image";
import { deleteItemFromBasket, fetchDevicesInBasket } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

const BasketItem = observer(({ device }) => {
  const dev = useContext(Context);

  const removetoBasket = () => {
    let amount = dev.device.getAmount;
    dev.device.setAmount(amount - device.price);
    deleteItemFromBasket(device.basketId).then((data) => console.log("Test"));
    const array = dev.device.getBasketDevices.filter(
      (i) => i.basketId !== device.basketId
    );
    dev.device.setBasketDevices(array);
  };

  return (
    <div className="row mt-3">
      <table className="table  text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Товар</th>
            <th scope="col">Наименование</th>
            <th scope="col">Цена</th>
            <th scope="col">Рейтинг</th>
            <th scope="col">Действие</th>
          </tr>
        </thead>
        <tbody>
          {
            <tr key={device.basketId}>
              <th scope="row">{device.basketId}</th>
              <th scope="row">
                <Image
                  with={150}
                  style={{ width: "4rem" }}
                  height={150}
                  src={"https://localhost:5000/" + device.img}
                />
              </th>
              <td>{device.name}</td>
              <td>{device.price}$</td>
              <td>{device.rating}</td>

              <td>
                <button onClick={removetoBasket} className="btn btn-danger">
                  Удалить
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
});

export default BasketItem;
