// import { FluentProvider, webLightTheme } from "@fluentui/react-components";
// import "@pnp/sp/site-groups/web";
// import "@pnp/sp/taxonomy";
// import { ITermGroupInfo } from "@pnp/sp/taxonomy";
// import { IFieldInfo } from "@pnp/sp/fields/types";
// import { IFormState } from "./RequestForm";
// import FormPanel from "./FormPanel";
// import { UserGroups } from "./enums/UserGroups";
// import { ITermInfo } from "@pnp/sp/taxonomy";
// import { IAvailableTags } from "./interfaces/IAvailableTags";

import * as React from "react";
import { useState, useEffect, createContext } from "react";

import RequestList from "./RequestList";

import { SPFx, spfi } from "@pnp/sp";

import type { ISupplyRequestsProps } from "./interfaces/ISupplyRequestsProps";
import { IListItem } from "./interfaces/IListItem";
import { IRequestStatusListItem } from "./interfaces/IRequestStatusListItem";
import { IRequestTypeListItem } from "./interfaces/IRequestTypeListItem";

import { WebPartContext } from "@microsoft/sp-webpart-base";

import { IRequestAreaOptions } from "./interfaces/IRequestAreaOptions";
import { ITag } from "@fluentui/react";
import Services from "./services/Services";
import { ICurrentUser } from "./interfaces/ICurrentUser";

export const SpContext = createContext<WebPartContext | null>(null);
export const SelectedListItemContext = createContext<IListItem | null>(null);
export const RequestsTypesContext = createContext<
  IRequestTypeListItem[] | null
>(null);
export const RequestsStatusesContext = createContext<
  IRequestStatusListItem[] | null
>(null);
export const RequestsAreaOptionsContext = createContext<
  IRequestAreaOptions[] | null
>(null);
export const CurrentUserContext = createContext<ICurrentUser | null>(null);
export const AllUsersContext = createContext<ICurrentUser[]>([]);
export const IsUserAManagerContext = createContext<boolean>(false);
export const AvailableTagsContext = createContext<ITag[] | []>([]);

const SupplyRequests: React.FC<ISupplyRequestsProps> = (
  props: ISupplyRequestsProps,
) => {
  const { context } = props;
  const sp = spfi().using(SPFx(context));

  const services = new Services(sp);

  const [requestsList, setRequestsList] = useState<IListItem[] | undefined>();
  const [selectedListItem, setSelectedListItem] = useState<IListItem | null>(
    null,
  );

  // const [requestsStatusesList, setRequestsStatusesList] =
  //   useState<IRequestStatusListItem[]>();
  // const [requestsTypesList, setRequestsTypesList] =
  //   useState<IRequestTypeListItem[]>();
  // const [currentUser, setCurrentUser] = useState<ICurrentUser | undefined>(
  //   undefined,
  // );
  // const [allUsers, setAllUsers] = useState<ICurrentUser[] | undefined>(
  //   undefined,
  // );
  // const [isUserAManager, setIsUserAManager] = useState<boolean>(false);
  // const [areaOptions, setAreaOptions] = useState<
  //   IRequestAreaOptions[] | undefined
  // >(undefined);
  // const [availableTags, setAvailableTags] = useState<IAvailableTags[] | []>([]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        setRequestsList(await services.getListItems());
      } catch (error) {
        console.error(error);
      }
    };

    getData().catch((error) => console.error(error));
  }, []);

  console.log(requestsList);

  const selectItem = (id: number): void => {
    if (!requestsList) return;

    setSelectedListItem(services.selectItemFromList(id, requestsList));
  };

  console.log(selectedListItem);

  // const [formPanelVisible, setFormPanelVisible] = useState<boolean>(false);

  // const hideFormPanel = (): void => {
  //   setFormPanelVisible(false);
  //   setSelectedListItem(null);
  // };

  // const showFormPanel = (): void => {
  //   setFormPanelVisible(true);
  // };

  // useEffect(() => {
  //   if (selectedListItem) {
  //     setFormPanelVisible(true);
  //   }
  // }, [selectItem]);

  return (
    <>
      <RequestList list={requestsList} onSelect={selectItem} />
      <div>{selectedListItem}</div>
    </>
  );
};

export default SupplyRequests;
