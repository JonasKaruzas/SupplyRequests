import * as React from "react";
import { useState, useContext } from "react";

import { SelectedListItemContext } from "./SupplyRequests";

import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { IRequestForm } from "./interfaces/IRequestForm";
import { DefaultButton } from "@fluentui/react/lib/Button";

import { DatePicker } from "@fluentui/react";

import { CurrentUserContext } from "./SupplyRequests";
// import RequestFormPeoplePicker from "./RequestFormPeoplePicker";

export interface IFormState {
  Id: number;
  AuthorId: number;
  Title: string;
  Description: string;
  DueDate: Date | undefined;
  StatusId: number;
}

const RequestForm: React.FC<IRequestForm> = (props: IRequestForm) => {
  const currentUser = useContext(CurrentUserContext);
  const selectedListItem = useContext(SelectedListItemContext);

  const defaultFormState = {
    Id: 0,
    AuthorId: currentUser?.Id ?? 0,
    Title: "",
    Description: "",
    // RequestType: "",
    // RequestArea: "",
    DueDate: undefined,
    StatusId: 1,
    // Tags: "",
  };

  const initialFormDataState = (): IFormState => {
    if (!selectedListItem) {
      return defaultFormState;
    }

    return {
      Id: selectedListItem.Id,
      AuthorId: selectedListItem.AuthorId,
      Title: selectedListItem.Title,
      Description: selectedListItem.Description,
      DueDate: new Date(selectedListItem.DueDate),
      StatusId: selectedListItem.StatusId,
    };
  };

  const [formData, setFormData] = useState(initialFormDataState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDateChange = (date: Date | undefined): void => {
    console.log(formData);

    if (date === undefined) return;
    setFormData({ ...formData, DueDate: date });
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (selectedListItem) {
      await props.onUpdateItem({ ...formData });
    } else {
      await props.onAddItem(formData);
    }
  };

  const onDelete = async (id: number): Promise<void> => {
    await props.onDelete(id);
  };

  // Request type: Lookup
  // Request Area: Choice
  // Tags: Managed metadata
  // Assigned Manager: Person or Group

  return (
    <>
      <form onSubmit={onSubmit}>
        <Label htmlFor="titleFieldId">Title:</Label>
        <TextField
          id="titleFieldId"
          name="Title"
          value={formData.Title}
          onChange={onChange}
          required
        />
        <Label htmlFor="descriptionFieldId">Description:</Label>
        <TextField
          id="descriptionFieldId"
          name="Description"
          value={formData.Description}
          onChange={onChange}
          required
        />
        <DatePicker
          placeholder="Select a DueDate"
          label="DueDate"
          value={formData.DueDate}
          onSelectDate={(e) => {
            if (e === null) {
              onDateChange(undefined);
            } else {
              onDateChange(e);
            }
          }}
        />
        {/* <RequestFormPeoplePicker /> */}

        <DefaultButton primary type="submit">
          {selectedListItem ? "Update" : "Save"}
        </DefaultButton>
        {selectedListItem ? (
          <DefaultButton
            type="button"
            onClick={() => onDelete(selectedListItem.Id)}
          >
            Delete
          </DefaultButton>
        ) : null}
      </form>
    </>
  );
};

export default RequestForm;