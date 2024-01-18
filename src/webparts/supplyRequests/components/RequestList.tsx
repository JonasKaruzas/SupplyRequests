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
    color: "darkblue",
    fontWeight: "700",
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const statusStyle = (id: number) => {
    switch (id) {
      case 1:
        return {
          backgroundColor: "#E1E1E1",
          padding: "4px 8px",
          width: "fit-content",
          fontWeight: "700",
          borderRadius: "4px",
        };
      case 2:
        return {
          backgroundColor: "#FFFDCD",
          padding: "4px 8px",
          width: "fit-content",
          fontWeight: "700",
          borderRadius: "4px",
        };
      case 3:
        return {
          backgroundColor: "#FFCDCD",
          padding: "4px 8px",
          width: "fit-content",
          fontWeight: "700",
          borderRadius: "4px",
        };
      case 4:
        return {
          backgroundColor: "#D1FFCD",
          padding: "4px 8px",
          width: "fit-content",
          fontWeight: "700",
          borderRadius: "4px",
        };
      default:
        return {};
    }
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
      minWidth: 100,
      fieldName: "StatusText",
      onRender: (item: IListItem, index: number, column: IColumn) => {
        return <div style={statusStyle(item.StatusId)}>{item.StatusText}</div>;
      },
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
        const date = new Date(item.ExecutionDate).toISOString().split("T")[0];
        if (date === "1970-01-01") {
          return "";
        } else {
          return date;
        }
      },
    },
    {
      key: "column4",
      name: "Request Type",
      minWidth: 100,
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

  const userTypeFilteredList = (): IListItem[] => {
    if (IsUserAManager) {
      return props.list ?? [];
    } else {
      return (
        props.list?.filter((item) => item.AuthorId === currentUserId) ?? []
      );
    }
  };

  const filteredList = (): IListItem[] => {
    const userFilteredList = userTypeFilteredList();

    const filteredText = userFilteredList.filter(
      (item) =>
        item.Title.toLocaleLowerCase().indexOf(
          props.listFilters.Title.toLocaleLowerCase(),
        ) !== -1 &&
        item.Description.toLocaleLowerCase().indexOf(
          props.listFilters.Description.toLocaleLowerCase(),
        ) !== -1,
    );

    const filteredDueMin = filteredText.filter((item) => {
      if (props.listFilters.DueDateMin !== undefined) {
        return new Date(item.DueDate) >= props.listFilters.DueDateMin;
      }
      return true;
    });

    const filteredDueMax = filteredDueMin.filter((item) => {
      if (props.listFilters.DueDateMax !== undefined) {
        return new Date(item.DueDate) <= props.listFilters.DueDateMax;
      }
      return true;
    });

    const filteredExecMin = filteredDueMax.filter((item) => {
      if (props.listFilters.ExecutionDateMin !== undefined) {
        return (
          new Date(item.ExecutionDate) >= props.listFilters.ExecutionDateMin
        );
      }
      return true;
    });

    const filteredExecMax = filteredExecMin.filter((item) => {
      if (props.listFilters.ExecutionDateMax !== undefined) {
        return (
          new Date(item.ExecutionDate) <= props.listFilters.ExecutionDateMax
        );
      }
      return true;
    });

    const filteredByManager = filteredExecMax.filter((item) => {
      if (props.listFilters.AssignedManagerId === null) return true;
      return item.AssignedManagerId === props.listFilters.AssignedManagerId;
    });

    const filteredByType = filteredByManager.filter((item) => {
      if (
        props.listFilters.RequestTypeId === null ||
        props.listFilters.RequestTypeId === 0
      )
        return true;
      return item.RequestTypeId === props.listFilters.RequestTypeId;
    });

    const filteredByArea = filteredByType.filter((item) => {
      if (
        props.listFilters.RequestArea === null ||
        props.listFilters.RequestArea === ""
      )
        return true;
      return item.RequestArea === props.listFilters.RequestArea;
    });

    const filteredByTags = filteredByArea.filter((item) => {
      if (props.listTagFilter.length === 0) return true;
      return props.listTagFilter.some((guid) =>
        item.Tags.some((item) => item.TermGuid === guid),
      );
    });

    return filteredByTags;
  };

  return (
    <>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col">
            <h3>Request List</h3>
          </div>
        </div>
      </div>

      {props.list === undefined ? (
        <p>No list items</p>
      ) : (
        <DetailsList
          items={filteredList()}
          columns={columns}
          selectionMode={0}
        />
      )}
    </>
  );
};

export default RequestList;
