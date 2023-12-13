import * as React from "react";
import { useState } from "react";

import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { IRequestForm } from "./IRequestForm";

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await props.onAddItem(formData);
    console.log("form submitted");
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
          onSelectDate={(e) => onDateChange(e)}
        />

        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
};

export default RequestForm;
