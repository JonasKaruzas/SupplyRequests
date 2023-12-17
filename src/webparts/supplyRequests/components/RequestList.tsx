import { DetailsList } from "@fluentui/react";
import * as React from "react";
import { useContext } from "react";
import { IListItem } from "./IListItem";
import { RequestsStatusesContext } from "./SupplyRequests";
import { RequestsTypesContext } from "./SupplyRequests";

interface IRequestListProps {
  list: IListItem[];
}

const RequestList: React.FC<IRequestListProps> = (props: IRequestListProps) => {
  const requestStatuses = useContext(RequestsStatusesContext) ?? [];
  const requestTypes = useContext(RequestsTypesContext) ?? [];

  const items = props.list;

  const mappedItems = items.map((item) => {
    const findStatusText = (id: number): string => {
      let res = "";

      for (let i = 0; i < requestStatuses.length; i++) {
        if (requestStatuses[i].Id === id) {
          res = requestStatuses[i].Title;
          break;
        }
      }

      return res;
    };

    const findTypeText = (id: number): string => {
      let res = "";

      for (let i = 0; i < requestTypes.length; i++) {
        if (requestTypes[i].Id === id) {
          res = requestTypes[i].Title;
          break;
        }
      }

      return res;
    };

    return {
      ...item,
      StatusText: findStatusText(item.Id),
      RequestTypeText: findTypeText(item.Id),
    };
  });

  const columns = [
    { key: "column1", name: "Title", minWidth: 150, fieldName: "Title" },
    {
      key: "column2",
      name: "Description",
      minWidth: 100,
      fieldName: "Description",
    },
    { key: "column3", name: "Due Date", minWidth: 100, fieldName: "DueDate" },
    {
      key: "column4",
      name: "Request Type",
      minWidth: 150,
      fieldName: "RequestTypeText",
    },
    {
      key: "column5",
      name: "Request Area",
      minWidth: 100,
      fieldName: "RequestArea",
    },
    {
      key: "column6",
      name: "Assigned Manager",
      minWidth: 150,
      fieldName: "AssignedManagerId",
    },
    { key: "column7", name: "Tags", minWidth: 50, fieldName: "car" },
    {
      key: "column8",
      name: "Status",
      minWidth: 50,
      fieldName: "StatusText",
    },
  ];

  return (
    <>
      <h3>Request List</h3>
      <DetailsList items={mappedItems} columns={columns} selectionMode={0} />
    </>
  );
};

export default RequestList;
