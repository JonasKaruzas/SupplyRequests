import * as React from "react";
import { useState, useContext } from "react";

import { SelectedListItemContext } from "./SupplyRequests";

import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { IRequestForm } from "./interfaces/IRequestForm";
import { DefaultButton } from "@fluentui/react/lib/Button";

import { DatePicker, IDropdownOption, IPersonaProps } from "@fluentui/react";

import { CurrentUserContext } from "./SupplyRequests";
import RequestFormPeoplePicker from "./RequestFormPeoplePicker";
import RequestFormRequestArea from "./RequestFormRequestArea";
import RequestFormRequestType from "./RequestFormRequestType";

export interface IFormState {
  // eslint-disable-next-line @rushstack/no-new-null
  Id: number | null;
  AuthorId: number;
  Title: string;
  Description: string;
  // eslint-disable-next-line @rushstack/no-new-null
  RequestTypeId: number | null;
  // eslint-disable-next-line @rushstack/no-new-null
  RequestArea: string | null;
  DueDate: Date | undefined;
  StatusId: number;
  // eslint-disable-next-line @rushstack/no-new-null
  AssignedManagerId: number | null;
}

const RequestForm: React.FC<IRequestForm> = (props: IRequestForm) => {
  const currentUser = useContext(CurrentUserContext);
  const selectedListItem = useContext(SelectedListItemContext);

  const defaultFormState = {
    Id: null,
    AuthorId: currentUser?.Id ?? 0,
    Title: "",
    Description: "",
    RequestTypeId: null,
    RequestArea: null,
    DueDate: undefined,
    StatusId: 1,
    // Tags: "",
    AssignedManagerId: null,
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
      RequestTypeId: selectedListItem.RequestTypeId,
      RequestArea: selectedListItem.RequestArea,
      DueDate: new Date(selectedListItem.DueDate),
      StatusId: selectedListItem.StatusId,
      AssignedManagerId: selectedListItem.AssignedManagerId,
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

  const onManagerChange = (persons: IPersonaProps[]): void => {
    if (persons.length < 1) {
      setFormData({
        ...formData,
        AssignedManagerId: null,
      });
    } else {
      if (persons[0].id === undefined) return;
      setFormData({
        ...formData,
        AssignedManagerId: parseInt(persons[0].id, 10),
      });
    }
  };

  const onOptionChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption,
  ): void => {
    setFormData({
      ...formData,
      RequestArea: item.text,
    });
  };

  const onTypeChange = (item: IDropdownOption): void => {
    if (typeof item.key === "string") return;

    setFormData({
      ...formData,
      RequestTypeId: item.key,
    });
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

  // Tags: Managed metadata

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
        <RequestFormPeoplePicker
          assignedManager={formData.AssignedManagerId}
          onManagerChange={onManagerChange}
        />
        <RequestFormRequestArea
          selectedOption={formData.RequestArea}
          onOptionChange={onOptionChange}
        />
        <RequestFormRequestType
          selectedTypeId={formData.RequestTypeId}
          onTypeChange={onTypeChange}
        />

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
