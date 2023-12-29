import {
  DatePicker,
  IDropdownOption,
  IPersonaProps,
  Label,
  TextField,
  defaultDatePickerStrings,
} from "@fluentui/react";
import * as React from "react";
import { IRequestFilter } from "./interfaces/IRequestFilter";
import RequestFormPeoplePicker from "./RequestFormPeoplePicker";
import RequestFormRequestType from "./RequestFormRequestType";
import RequestFormRequestArea from "./RequestFormRequestArea";
import RequestFormTagPicker from "./RequestFormTagPicker";
import { Button } from "@fluentui/react-components";
import { EraserRegular } from "@fluentui/react-icons";

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

  const onManagerChange = (persons: IPersonaProps[]): void => {
    if (persons.length < 1) {
      props.setListFilters({ ...props.listFilters, AssignedManagerId: null });
    } else {
      if (persons[0].id === undefined) return;
      props.setListFilters({
        ...props.listFilters,
        AssignedManagerId: parseInt(persons[0].id, 10),
      });
    }
  };

  const onTypeChange = (item: IDropdownOption): void => {
    if (typeof item.key === "string") return;

    props.setListFilters({
      ...props.listFilters,
      RequestTypeId: item.key,
    });
  };

  const onOptionChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption,
  ): void => {
    props.setListFilters({
      ...props.listFilters,
      RequestArea: item.text,
    });
  };

  const onTagChange = (tagsIds: string[]): void => {
    props.setListTagFilter(tagsIds);
  };

  return (
    <>
      <h4>Filter</h4>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <Label htmlFor="filterTitleFieldId">Title:</Label>
            <TextField
              id="filterTitleFieldId"
              name="Title"
              placeholder="Search"
              value={props.listFilters.Title}
              onChange={onChange}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <Label htmlFor="filterDescriptionFieldId">Description:</Label>
            <TextField
              id="filterDescriptionFieldId"
              name="Description"
              placeholder="Search"
              value={props.listFilters.Description}
              onChange={onChange}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col">
                <Label>Due date</Label>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm10">
                <DatePicker
                  placeholder="from"
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
              </div>
              <div className="ms-Grid-col ms-sm2 ">
                <Button
                  shape="circular"
                  onClick={() =>
                    props.setListFilters({
                      ...props.listFilters,
                      DueDateMin: undefined,
                    })
                  }
                  icon={<EraserRegular />}
                />
              </div>
            </div>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col">
                <Label>Due date</Label>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm10">
                <DatePicker
                  placeholder="to"
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
              </div>
              <div className="ms-Grid-col ms-sm2 ">
                <Button
                  shape="circular"
                  onClick={() =>
                    props.setListFilters({
                      ...props.listFilters,
                      DueDateMax: undefined,
                    })
                  }
                  icon={<EraserRegular />}
                />
              </div>
            </div>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col">
                <Label>Execution date</Label>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm10">
                <DatePicker
                  placeholder="from"
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
              </div>
              <div className="ms-Grid-col ms-sm2 ">
                <Button
                  shape="circular"
                  onClick={() =>
                    props.setListFilters({
                      ...props.listFilters,
                      ExecutionDateMin: undefined,
                    })
                  }
                  icon={<EraserRegular />}
                />
              </div>
            </div>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col">
                <Label>Execution date</Label>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm10">
                <DatePicker
                  placeholder="from"
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
              </div>
              <div className="ms-Grid-col ms-sm2 ">
                <Button
                  shape="circular"
                  onClick={() =>
                    props.setListFilters({
                      ...props.listFilters,
                      ExecutionDateMax: undefined,
                    })
                  }
                  icon={<EraserRegular />}
                />
              </div>
            </div>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <RequestFormPeoplePicker
              assignedManager={props.listFilters.AssignedManagerId}
              onManagerChange={onManagerChange}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <RequestFormRequestType
              selectedTypeId={props.listFilters.RequestTypeId}
              onTypeChange={onTypeChange}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <RequestFormRequestArea
              selectedOption={props.listFilters.RequestArea}
              onOptionChange={onOptionChange}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <RequestFormTagPicker onTagsChange={onTagChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestFilter;
