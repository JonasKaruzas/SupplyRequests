import * as React from "react";
import { useState, useContext } from "react";

import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { IRequestForm } from "./interfaces/IRequestForm";
import { DefaultButton } from "@fluentui/react/lib/Button";

import {
  DatePicker,
  defaultDatePickerStrings,
  IDropdownOption,
  IPersonaProps,
  // ITag,
} from "@fluentui/react";

import RequestFormPeoplePicker from "./RequestFormPeoplePicker";
import RequestFormRequestArea from "./RequestFormRequestArea";
import RequestFormRequestType from "./RequestFormRequestType";
import RequestFormTagPicker from "./RequestFormTagPicker";
import { GlobalContext } from "./SupplyRequests";

import { IFormState } from "./interfaces/IFormState";
import { StatusType } from "./enums/StatusType";

const RequestForm: React.FC<IRequestForm> = (props: IRequestForm) => {
  const globalContext = useContext(GlobalContext);

  const currentUser = globalContext?.CurrentUserContext;
  const selectedListItem = globalContext?.SelectedListItemContext;
  const IsUserAManager = globalContext?.IsUserAManagerContext;

  const defaultFormState = {
    Id: undefined,
    AuthorId: currentUser?.Id ?? 0,
    Title: "",
    Description: "",
    RequestTypeId: null,
    RequestArea: null,
    DueDate: undefined,
    StatusId: StatusType.New,
    AssignedManagerId: null,
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
      RequestTypeId: selectedListItem.RequestTypeId,
      RequestArea: selectedListItem.RequestArea,
      DueDate: new Date(selectedListItem.DueDate),
      StatusId: selectedListItem.StatusId,
      AssignedManagerId: selectedListItem.AssignedManagerId,
      // Tags: selectedListItem.Tags,
    };
  };

  const [formData, setFormData] = useState(initialFormDataState);
  const [tags, setTags] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDateChange = (date: Date | undefined): void => {
    if (!date) return;

    const formattedDate = new Date(date.setHours(date.getHours() + 2));
    setFormData({ ...formData, DueDate: formattedDate });
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

  const onTagChange = (tagsIds: string[]): void => {
    const joined = tagsIds.map((item) => "-1;#null|" + item).join(";#");
    setTags(joined);
  };

  const onSubmit = async (e: React.FormEvent): Promise<number | undefined> => {
    e.preventDefault();
    if (selectedListItem) {
      await props.onUpdateItem({ ...formData });
      if (!globalContext) return;
      if (!formData.Id) return;
      await globalContext.updateListItemTags(formData.Id, tags);
    } else {
      const newId = await props.onAddItem(formData);

      if (newId) {
        if (!globalContext) return;
        await globalContext.updateListItemTags(newId, tags);
        return newId;
      }
    }
  };

  const onSendToDeliveryDepartment = async (
    e: React.FormEvent<HTMLDivElement>,
  ): Promise<void> => {
    e.preventDefault();
    await props.onUpdateItem({
      ...formData,
      StatusId: StatusType["In Progress"],
    });
  };

  const onDelete = async (id: number): Promise<void> => {
    await props.onDelete(id);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {!IsUserAManager ? (
          <>
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
              isRequired
              strings={defaultDatePickerStrings}
            />
          </>
        ) : (
          <>
            <RequestFormPeoplePicker
              assignedManager={formData.AssignedManagerId}
              onManagerChange={onManagerChange}
            />
          </>
        )}

        <RequestFormRequestType
          selectedTypeId={formData.RequestTypeId}
          onTypeChange={onTypeChange}
        />
        <RequestFormRequestArea
          selectedOption={formData.RequestArea}
          onOptionChange={onOptionChange}
        />
        <RequestFormTagPicker onTagsChange={onTagChange} />

        <DefaultButton primary type="submit">
          {selectedListItem ? "Update" : "Save"}
        </DefaultButton>

        {selectedListItem && IsUserAManager ? (
          <DefaultButton
            type="button"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              onSendToDeliveryDepartment(e)
            }
          >
            Update and Send
          </DefaultButton>
        ) : null}

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
