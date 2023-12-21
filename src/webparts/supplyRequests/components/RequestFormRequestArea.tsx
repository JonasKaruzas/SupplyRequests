import * as React from "react";
import { useContext, useState } from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import { RequestsAreaOptionsContext } from "./SupplyRequests";
import { IRequestFormRequestAreaProps } from "./interfaces/IRequestFormRequestAreaProps";

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const RequestFormRequestArea: React.FC<IRequestFormRequestAreaProps> = (
  props: IRequestFormRequestAreaProps,
) => {
  const areaOptions = useContext(RequestsAreaOptionsContext) ?? [];

  const selectedItemOption = props.selectedOption
    ? {
        key: props.selectedOption,
        text: props.selectedOption,
      }
    : { key: "", text: "" };

  const [selectedItem, setSelectedItem] =
    useState<IDropdownOption>(selectedItemOption);

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption,
  ): void => {
    setSelectedItem(item);
    props.onOptionChange(event, item);
  };

  return (
    <Dropdown
      label="Request Area"
      selectedKey={selectedItem ? selectedItem.key : undefined}
      onChange={onChange}
      placeholder="Select request area"
      options={areaOptions}
      styles={dropdownStyles}
    />
  );
};

export default RequestFormRequestArea;
