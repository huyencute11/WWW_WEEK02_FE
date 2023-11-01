import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme } from "@mui/material/styles";

const OrderDetailTable = ({ detail }: any) => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    if (detail && detail.length > 0) {
      const tableData = detail.map((item: any) => [
        item?.orderDetailPK?.product.name,
        item.quantity,
        item.price,
      ]);
      const total = detail.reduce(
        (acc: number, item: any) => acc + item.price,
        0.0
      );

      setTotalPrice(total);
      tableData.push(["Total Price", "", "", total]);

      setData(tableData);
    }
  }, [detail]);

  const columns = ["Product Name", "Quantity", "Price", "Total Price"];
  const options = {
    selectableRows: "none", // Remove the checkbox column
    responsive: "vertical",
    print: false, // Hide the print button
    download: false, // Hide the download button
  };

  const theme = createTheme();

  return (
    <MUIDataTable
      title="Product Details"
      data={data}
      columns={columns}
      options={options}
      theme={theme}
    />
  );
};

export default OrderDetailTable;
