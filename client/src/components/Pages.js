import { Card, Col, Pagination } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../assets/newstar.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.getTotalCount / device.getLimit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  console.log(pageCount);
  console.log(pages);
  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.getPage === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
