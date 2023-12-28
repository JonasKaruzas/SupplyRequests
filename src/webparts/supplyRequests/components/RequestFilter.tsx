import {
  DatePicker,
  Label,
  TextField,
  defaultDatePickerStrings,
} from "@fluentui/react";
import * as React from "react";
import { IRequestFilter } from "./interfaces/IRequestFilter";
// import "../../../../node_modules/office-ui-fabric-core/dist/css/fabric.css";

const RequestFilter: React.FC<IRequestFilter> = (props: IRequestFilter) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    props.setListFilters({ ...props.listFilters, [name]: value });
  };

  const onDateChange = (date: Date | undefined, name: string): void => {
    if (!date) return;

    const formattedDate = new Date(date.setHours(date.getHours() + 2));
    props.setListFilters({ ...props.listFilters, [name]: formattedDate });
  };

  return (
    <>
      <div>Filter Area</div>
      <button onClick={props.clearFilters}>Clear filters</button>
      {/* <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">A</div>
          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">B</div>
        </div>
      </div>
      <div className="ms-Grid-col ms-sm12 ms-hiddenXxlUp">
        Visible on smaller screens
      </div>
      <div className="ms-Grid-col ms-sm12 ms-hiddenXlDown">
        Visible on larger screens
      </div> */}

      <Label htmlFor="filterTitleFieldId">Title:</Label>
      <TextField
        id="filterTitleFieldId"
        name="Title"
        placeholder="Search"
        value={props.listFilters.Title}
        onChange={onChange}
      />
      <Label htmlFor="filterDescriptionFieldId">Description:</Label>
      <TextField
        id="filterDescriptionFieldId"
        name="Description"
        placeholder="Search"
        value={props.listFilters.Description}
        onChange={onChange}
      />
      <DatePicker
        placeholder="from"
        label="Due Date from"
        value={props.listFilters.DueDateMin}
        onSelectDate={(e) => {
          if (e === null) {
            onDateChange(undefined, "DueDateMin");
          } else {
            onDateChange(e, "DueDateMin");
          }
        }}
        strings={defaultDatePickerStrings}
      />
      <DatePicker
        placeholder="to"
        label="Due Date to"
        value={props.listFilters.DueDateMax}
        onSelectDate={(e) => {
          if (e === null) {
            onDateChange(undefined, "DueDateMax");
          } else {
            onDateChange(e, "DueDateMax");
          }
        }}
        strings={defaultDatePickerStrings}
      />
      <DatePicker
        placeholder="from"
        label="Execution Date from"
        value={props.listFilters.ExecutionDateMin}
        onSelectDate={(e) => {
          if (e === null) {
            onDateChange(undefined, "ExecutionDateMin");
          } else {
            onDateChange(e, "ExecutionDateMin");
          }
        }}
        strings={defaultDatePickerStrings}
      />
      <DatePicker
        placeholder="to"
        label="Execution Date to"
        value={props.listFilters.ExecutionDateMax}
        onSelectDate={(e) => {
          if (e === null) {
            onDateChange(undefined, "ExecutionDateMax");
          } else {
            onDateChange(e, "ExecutionDateMax");
          }
        }}
        strings={defaultDatePickerStrings}
      />
    </>
  );
};

export default RequestFilter;
