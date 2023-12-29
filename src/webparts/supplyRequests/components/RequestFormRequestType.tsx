import * as React from "react";
import { useContext, useState } from "react";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { IRequestFormRequestTypeProps } from "./interfaces/IRequestFormRequestTypeProps";
import { GlobalContext } from "./SupplyRequests";

const RequestFormRequestType: React.FC<IRequestFormRequestTypeProps> = (
  props: IRequestFormRequestTypeProps,
) => {
  const globalContext = useContext(GlobalContext);

  const typeOptions = globalContext?.RequestsTypesContext ?? [];
  const mappedTypeOptions = typeOptions.map((option) => ({
    ...option,
    key: option.Id,
    text: option.Title,
  }));

  mappedTypeOptions.unshift({
    key: 0,
    text: "",
    "odata.type": "",
    "odata.id": "",
    "odata.etag": "",
    "odata.editLink": "",
    FileSystemObjectType: 0,
    Id: 0,
    ServerRedirectedEmbedUrl: "",
    ContentTypeId: "",
    Title: "",
    DisplayOrder: 0,
    ID: 0,
    Modified: "",
    Created: "",
    AuthorId: 0,
    EditorId: 0,
    OData__UIVersionString: "",
    Attachments: false,
    GUID: "",
  });

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
    />
  );
};

export default RequestFormRequestType;
