import * as React from "react";
import { useContext } from "react";
import { DetailsList, IColumn } from "@fluentui/react";
import { IListItem } from "./interfaces/IListItem";
import { Button } from "@fluentui/react-components";

import { EditRegular } from "@fluentui/react-icons";
import { StatusType } from "./enums/StatusType";
import { IRequestListProps } from "./interfaces/IRequestListProps";
import { GlobalContext } from "./SupplyRequests";

const RequestList: React.FC<IRequestListProps> = (props: IRequestListProps) => {
  const globalContext = useContext(GlobalContext);
  const currentUserId = globalContext?.CurrentUserContext?.Id;
  const IsUserAManager = globalContext?.IsUserAManagerContext;

  const tagLabelStyle = {
    marginRight: "8px",
  };

  const columns = [
    {
      key: "columnA",
      name: "",
      minWidth: 50,
      fieldName: "Edit",
      onRender: (item: IListItem, index: number, column: IColumn) => {
        return item.StatusId === StatusType.New ? (
          <Button
            shape="circular"
            onClick={() => props.onSelect(item.Id)}
            icon={<EditRegular />}
          />
        ) : null;
      },
    },
    {
      key: "columnB",
      name: "Status",
      minWidth: 50,
      fieldName: "StatusText",
    },
    { key: "column1", name: "Title", minWidth: 150, fieldName: "Title" },
    {
      key: "column2",
      name: "Description",
      minWidth: 100,
      fieldName: "Description",
    },
    {
      key: "column2B",
      name: "Author",
      minWidth: 100,
      fieldName: "UserFullName",
    },
    {
      key: "column3",
      name: "Due Date",
      minWidth: 100,
      fieldName: "DueDate",
      onRender: (item: IListItem) => {
        return new Date(item.DueDate).toISOString().split("T")[0];
      },
    },
    {
      key: "column3B",
      name: "Execution Date",
      minWidth: 100,
      fieldName: "ExecutionDate",
      onRender: (item: IListItem) => {
        return new Date(item.ExecutionDate).toISOString().split("T")[0];
      },
    },
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
      fieldName: "AssignedManagerText",
    },
    {
      key: "column7",
      name: "Tags",
      fieldName: "Tags",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
      onRender: (item: IListItem) => {
        return (
          <div>
            {item.Tags.map((tag) => (
              <span key={tag.WssId} style={tagLabelStyle}>
                {tag.Label}
              </span>
            ))}
          </div>
        );
      },
    },
  ];

  const list = (): IListItem[] => {
    if (IsUserAManager) {
      return props.list ?? [];
    } else {
      return (
        props.list?.filter((item) => item.AuthorId === currentUserId) ?? []
      );
    }
  };

  return (
    <>
      <h3>Request List</h3>

      {props.list === undefined ? (
        <p>No list items</p>
      ) : (
        <DetailsList items={list()} columns={columns} selectionMode={0} />
      )}
    </>
  );
};

export default RequestList;
