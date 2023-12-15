import * as React from "react";
import { useState, useContext } from "react";

import { SelectedListItemContext } from "./SupplyRequests";

import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { IRequestForm } from "./IRequestForm";
import { DefaultButton } from "@fluentui/react/lib/Button";

import { DatePicker } from "@fluentui/react";

import { SpContext } from "./SupplyRequests";
// import * as moment from "moment";

export interface IFormState {
  Id: number;
  Title: string;
  Description: string;
  DueDate: Date | undefined;
}
console.log("wtf");

const RequestForm: React.FC<IRequestForm> = (props: IRequestForm) => {
  const defaultFormState = {
    Id: 0,
    Title: "",
    Description: "",
    // RequestType: "",
    // RequestArea: "",
    DueDate: undefined,
    // Tags: "",
  };

  const selectedListItem = useContext(SelectedListItemContext);
  const context = useContext(SpContext);
  console.log(context);

  const initialFormDataState = (): IFormState => {
    if (!selectedListItem) {
      return defaultFormState;
    }

    return {
      Id: selectedListItem.Id,
      Title: selectedListItem.Title,
      Description: selectedListItem.Description,
      DueDate: new Date(selectedListItem.DueDate),
    };
  };

  const [formData, setFormData] = useState(initialFormDataState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDateChange = (date: Date | undefined): void => {
    console.log("date");
    console.log(date);
    // if (context) {
    //   const currentCultureName =
    //     context.pageContext.legacyPageContext.currentCultureName;
    //   moment.locale(currentCultureName);
    //   const dateString = moment(new Date()).format("L");
    //   console.log("dateString");
    //   console.log(dateString);
    // }

    if (date === undefined) return;
    setFormData({ ...formData, DueDate: date });
    // setFormData({ ...formData, DueDate: date.toISOString() });
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
