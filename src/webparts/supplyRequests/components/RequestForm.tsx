import * as React from "react";
import { useState } from "react";

import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { IRequestForm } from "./IRequestForm";
import { DefaultButton } from "@fluentui/react/lib/Button";

import { DatePicker } from "@fluentui/react";

const RequestForm: React.FC<IRequestForm> = (props: IRequestForm) => {
  const defaultFormState = {
    Title: "",
    Description: "",
    // RequestType: "",
    // RequestArea: "",
    DueDate: "",
    // Tags: "",
  };

  const [formData, setFormData] = useState(defaultFormState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("form changed");
    console.log(e);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDateChange = (date: Date | null | undefined): void => {
    console.log("date changed");
    console.log(date);
    if (!date) return;
    setFormData({ ...formData, DueDate: date.toISOString() });
    console.log(formData);
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await props.onAddItem(formData);
    console.log("form submitted");
  };

  // const onDelete = async (id: number): Promise<void> => {
  //   await props.onDelete(id);
  // };

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
          onSelectDate={(e) => onDateChange(e)}
        />

        <DefaultButton primary type="submit">
          Save
        </DefaultButton>
        <DefaultButton type="button">Delete</DefaultButton>
      </form>
    </>
  );
};

export default RequestForm;
