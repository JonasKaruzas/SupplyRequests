import { DetailsList, IColumn } from "@fluentui/react";
import * as React from "react";
// import { useEffect, useState } from "react";
// import { useContext } from "react";
import { IListItem } from "./interfaces/IListItem";
// import { RequestsStatusesContext } from "./SupplyRequests";
// import { RequestsTypesContext } from "./SupplyRequests";
import { Button } from "@fluentui/react-components";

import { EditRegular } from "@fluentui/react-icons";
import { StatusType } from "./enums/StatusType";
import { IRequestListProps } from "./interfaces/IRequestListProps";
// import Services from "./services/Services";

// import { AllUsersContext } from "./SupplyRequests";
// import { IsUserAManagerContext } from "./SupplyRequests";
// import { CurrentUserContext } from "./SupplyRequests";

const RequestList: React.FC<IRequestListProps> = (props: IRequestListProps) => {
  // const requestStatuses = useContext(RequestsStatusesContext) ?? [];
  // const requestTypes = useContext(RequestsTypesContext) ?? [];
  // const allUsers = useContext(AllUsersContext) ?? [];
  // const isUserAManager = useContext(IsUserAManagerContext) ?? false;
  // const currentUser = useContext(CurrentUserContext) ?? null;

  // const [items, setItems] = useState(props.list);

  //   if (!isUserAManager) {
  //     const filteredList = mappedList.filter((item) => {
  //       return item.AuthorId === currentUser?.Id;
  //     });
  //     return filteredList;
  //   } else {
  //     return mappedList;
  //   }
  // };

  // useEffect(() => {
  //   if (!props.list) return;

  //   setItems(mapItems(props.list));
  // }, [props.list, allUsers, isUserAManager, currentUser]);

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
    { key: "column3", name: "Due Date", minWidth: 100, fieldName: "DueDate" },
    {
      key: "column3B",
      name: "Execution Date",
      minWidth: 100,
      fieldName: "ExecutionDate",
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

  return (
    <>
      <h3>Request List</h3>

      {props.list === undefined ? (
        <p>No list items</p>
      ) : (
        <DetailsList items={props.list} columns={columns} selectionMode={0} />
      )}
    </>
  );
};

export default RequestList;
