import * as React from "react";
import { useContext, useState } from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import { RequestsTypesContext } from "./SupplyRequests";
import { IRequestFormRequestTypeProps } from "./interfaces/IRequestFormRequestTypeProps";

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const RequestFormRequestType: React.FC<IRequestFormRequestTypeProps> = (
  props: IRequestFormRequestTypeProps,
) => {
  const typeOptions = useContext(RequestsTypesContext) ?? [];
  const mappedTypeOptions = typeOptions.map((option) => ({
    ...option,
    key: option.Id,
    text: option.Title,
  }));

  const selectedItemOption = props.selectedTypeId
    ? {
        key: typeOptions.filter(
          (option) => option.DisplayOrder === props.selectedTypeId,
        )[0].DisplayOrder,
        text: typeOptions.filter(
          (option) => option.DisplayOrder === props.selectedTypeId,
        )[0].Title,
      }
    : { key: 0, text: "" };

  const [selectedItem, setSelectedItem] =
    useState<IDropdownOption>(selectedItemOption);

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption,
  ): void => {
    setSelectedItem(item);
    props.onTypeChange(item);
  };

  return (
    <Dropdown
      label="Request Type"
      selectedKey={selectedItem ? selectedItem.key : undefined}
      onChange={onChange}
      placeholder="Select request type"
      options={mappedTypeOptions}
      styles={dropdownStyles}
    />
  );
};

export default RequestFormRequestType;
