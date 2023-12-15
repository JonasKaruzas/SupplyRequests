import { DetailsList } from "@fluentui/react";
import * as React from "react";

const RequestList = () => {
  const items = [
    { key: 1, name: "Jonas", car: "Toyota" },
    { key: 2, name: "Tomas", car: "BMW" },
  ];

  const columns = [
    { key: "column1", name: "Numeris", minWidth: 50, fieldName: "key" },
    { key: "column2", name: "Vardas", minWidth: 50, fieldName: "name" },
    { key: "column3", name: "Masina", minWidth: 50, fieldName: "car" },
  ];

  return (
    <>
      <div>I Am A List</div>
      <DetailsList items={items} columns={columns} selectionMode={0} />
    </>
  );
};

export default RequestList;
