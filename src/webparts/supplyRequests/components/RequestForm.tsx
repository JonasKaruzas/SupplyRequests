import * as React from "react";
import { useState, useContext } from "react";

import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { IRequestForm } from "./interfaces/IRequestForm";

import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { useBoolean } from "@fluentui/react-hooks";

import {
  DatePicker,
  defaultDatePickerStrings,
  IDropdownOption,
  IPersonaProps,
  addDays,
} from "@fluentui/react";
import { useConst } from "@fluentui/react-hooks";

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

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Delete request",
    subText: "Do you really want to delete this request?",
  };

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
  const [tags, setTags] = useState("");

  const today = useConst(new Date(Date.now()));
  const minDate = useConst(addDays(today, 3));

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

  const isSubmitDisabled = (): boolean => {
    console.log(formData);

    if (!IsUserAManager) {
      if (
        formData.Title === "" ||
        formData.Description === "" ||
        formData.RequestTypeId === null ||
        formData.DueDate === undefined
      ) {
        return true;
      }
    } else {
      if (formData.AssignedManagerId === null) {
        return true;
      }
    }

    return false;
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
              minDate={minDate}
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

        <div className="ms-Grid" dir="ltr">
          <div
            className="ms-Grid-row"
            style={{ marginTop: "8px", width: "100%" }}
          >
            <div className="ms-Grid-col ms-sm4">
              <DefaultButton
                primary
                type="submit"
                disabled={isSubmitDisabled()}
                style={{ padding: "0" }}
              >
                {selectedListItem ? "Update" : "Save"}
              </DefaultButton>
            </div>
            <div className="ms-Grid-col ms-sm4">
              {selectedListItem && IsUserAManager ? (
                <DefaultButton
                  type="button"
                  disabled={isSubmitDisabled()}
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                    onSendToDeliveryDepartment(e)
                  }
                  styles={{
                    root: {
                      backgroundColor: "#0078D4",
                      color: "lightgrey",
                      padding: "0",
                    },
                  }}
                >
                  Send
                </DefaultButton>
              ) : null}
            </div>
            <div className="ms-Grid-col ms-sm4">
              <DefaultButton
                type="button"
                onClick={props.onCancel}
                style={{ padding: "0" }}
              >
                Cancel
              </DefaultButton>
            </div>
          </div>
          <div
            className="ms-Grid-row"
            style={{ marginTop: "8px", width: "100%" }}
          >
            <div
              className="ms-Grid-col ms-sm12"
              style={{ width: "100%", paddingTop: "15px" }}
            >
              {selectedListItem ? (
                <>
                  <DefaultButton
                    type="button"
                    onClick={toggleHideDialog}
                    styles={{
                      root: {
                        backgroundColor: "#E81123",
                        color: "white",
                        width: "100%",
                      },
                    }}
                  >
                    Delete
                  </DefaultButton>
                  <Dialog
                    hidden={hideDialog}
                    onDismiss={toggleHideDialog}
                    dialogContentProps={dialogContentProps}
                  >
                    <DialogFooter>
                      <DefaultButton
                        onClick={() => onDelete(selectedListItem.Id)}
                        text="Delete"
                        styles={{
                          root: {
                            backgroundColor: "#E81123",
                            color: "white",
                            width: "100%",
                          },
                        }}
                      />
                      <DefaultButton onClick={toggleHideDialog} text="Cancel" />
                    </DialogFooter>
                  </Dialog>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RequestForm;
