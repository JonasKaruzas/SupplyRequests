import * as React from "react";
import { useContext, useState } from "react";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { IRequestFormRequestAreaProps } from "./interfaces/IRequestFormRequestAreaProps";
import { GlobalContext } from "./SupplyRequests";

const RequestFormRequestArea: React.FC<IRequestFormRequestAreaProps> = (
  props: IRequestFormRequestAreaProps,
) => {
  const globalContext = useContext(GlobalContext);

  const areaOptions = globalContext?.RequestsAreaOptionsContext ?? [];

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
    <div style={{ display: "flex", position: "relative" }}>
      <div style={{ width: "100%" }}>
        <Dropdown
          label="Request Area"
          selectedKey={selectedItem ? selectedItem.key : undefined}
          onChange={onChange}
          placeholder="Select request area"
          options={areaOptions}
          style={{ width: "100%" }}
        />
      </div>
      {props.required && (
        <div
          style={{
            color: "rgb(164, 38, 44)",
            position: "relative",
            top: "25px",
            right: "-3px",
          }}
        >
          *
        </div>
      )}
    </div>
  );
};

export default RequestFormRequestArea;
