import * as React from "react";
import { useState, useEffect, createContext } from "react";

import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import { IFieldInfo } from "@pnp/sp/fields/types";

import type { ISupplyRequestsProps } from "./interfaces/ISupplyRequestsProps";
import { IListItem } from "./interfaces/IListItem";
import { IRequestStatusListItem } from "./interfaces/IRequestStatusListItem";
import { IRequestTypeListItem } from "./interfaces/IRequestTypeListItem";
import { IFormState } from "./RequestForm";

import { WebPartContext } from "@microsoft/sp-webpart-base";

import RequestList from "./RequestList";
import FormPanel from "./FormPanel";
import { ICurrentUser } from "./interfaces/ICurrentUser";
import { UserGroups } from "./enums/UserGroups";
import { IRequestAreaOptions } from "./interfaces/IRequestAreaOptions";

const _requestsTable = "Requests";
const _requestsStatusesTable = "RequestStatuses";
const _requestsTypesTable = "RequestTypes";
const _requestsRequestAreaColumn = "RequestArea";

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

const SupplyRequests: React.FC<ISupplyRequestsProps> = (
  props: ISupplyRequestsProps,
) => {
  const { context } = props;
  const sp = spfi().using(SPFx(context));

  const [requestsStatusesList, setRequestsStatusesList] = useState<
    IRequestStatusListItem[]
  >([]);
  const [requestsTypesList, setRequestsTypesList] = useState<
    IRequestTypeListItem[]
  >([]);
  const [requestsList, setRequestsList] = useState<IListItem[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<IListItem | null>(
    null,
  );
  const [formPanelVisible, setFormPanelVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);
  const [allUsers, setAllUsers] = useState<ICurrentUser[]>([]);
  const [isUserAManager, setIsUserAManager] = useState<boolean>(false);
  const [areaOptions, setAreaOptions] = useState<IRequestAreaOptions[] | null>(
    null,
  );

  const getListItems = async (): Promise<void> => {
    try {
      const items: IListItem[] | [] = await sp.web.lists
        .getByTitle(_requestsTable)
        .items();
      setRequestsList(items);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusesItems = async (): Promise<void> => {
    try {
      const items: IRequestStatusListItem[] | [] = await sp.web.lists
        .getByTitle(_requestsStatusesTable)
        .items();
      setRequestsStatusesList(items);
    } catch (error) {
      console.error(error);
    }
  };

  const getTypesItems = async (): Promise<void> => {
    try {
      const items: IRequestTypeListItem[] | [] = await sp.web.lists
        .getByTitle(_requestsTypesTable)
        .items();
      setRequestsTypesList(items);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async (): Promise<void> => {
    try {
      const user: ICurrentUser = await sp.web.currentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async (): Promise<void> => {
    try {
      const users: ICurrentUser[] = await sp.web.siteUsers();
      setAllUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  const getIsUserAManager = async (): Promise<void> => {
    try {
      const userGroups = await sp.web.currentUser.groups();

      const group = userGroups.filter(
        (item) => item.Id === UserGroups["SupplyDepartment Managers"],
      )[0];

      if (group) {
        setIsUserAManager(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAreaOptions = async (): Promise<void> => {
    try {
      const fields: IFieldInfo = await sp.web.lists
        .getByTitle(_requestsTable)
        .fields.getByInternalNameOrTitle(_requestsRequestAreaColumn)();

      if (fields.Choices === undefined) {
        setAreaOptions(null);
      } else {
        const optionsArray = fields.Choices.map((item) => ({
          key: item,
          text: item,
        }));

        setAreaOptions(optionsArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (formData: IFormState): Promise<void> => {
    await sp.web.lists.getByTitle(_requestsTable).items.add(formData);
    await getListItems();
  };

  const deleteItem = async (id: number): Promise<void> => {
    const list = sp.web.lists.getByTitle(_requestsTable);
    await list.items.getById(id).delete();
    await getListItems();
  };

  const updateItem = async (formData: IFormState): Promise<void> => {
    if (!formData.Id) return;

    await sp.web.lists
      .getByTitle(_requestsTable)
      .items.getById(formData.Id)
      .update(formData);
    await getListItems();
  };

  const selectItem = (id: number): void => {
    const findItem = (id: number): IListItem | null => {
      let res = null;

      for (let i = 0; i < requestsList.length; i++) {
        if (requestsList[i].Id === id) {
          res = { ...requestsList[i] };
          break;
        }
      }
      return res;
    };

    const foundItem = findItem(id);

    setSelectedListItem(foundItem);
  };

  const hideFormPanel = (): void => {
    setFormPanelVisible(false);
    setSelectedListItem(null);
  };

  const showFormPanel = (): void => {
    setFormPanelVisible(true);
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        await getTypesItems();
        await getStatusesItems();
        await getListItems();
        await getCurrentUser();
        await getIsUserAManager();
        await getAllUsers();
        await getAreaOptions();
      } catch (error) {
        console.error(error);
      }
    };

    getData().catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedListItem) {
      setFormPanelVisible(true);
    }
  }, [selectItem]);

  return (
    <SpContext.Provider value={props.context}>
      <RequestsAreaOptionsContext.Provider value={areaOptions}>
        <IsUserAManagerContext.Provider value={isUserAManager}>
          <AllUsersContext.Provider value={allUsers}>
            <CurrentUserContext.Provider value={currentUser}>
              <RequestsStatusesContext.Provider value={requestsStatusesList}>
                <RequestsTypesContext.Provider value={requestsTypesList}>
                  <SelectedListItemContext.Provider value={selectedListItem}>
                    <FluentProvider theme={webLightTheme}>
                      <FormPanel
                        onAddItem={addItem}
                        onDelete={deleteItem}
                        onUpdateItem={updateItem}
                        formPanelVisible={formPanelVisible}
                        hideFormPanel={hideFormPanel}
                        showFormPanel={showFormPanel}
                      />
                      <RequestList list={requestsList} onSelect={selectItem} />
                    </FluentProvider>
                  </SelectedListItemContext.Provider>
                </RequestsTypesContext.Provider>
              </RequestsStatusesContext.Provider>
            </CurrentUserContext.Provider>
          </AllUsersContext.Provider>
        </IsUserAManagerContext.Provider>
      </RequestsAreaOptionsContext.Provider>
    </SpContext.Provider>
  );
};

export default SupplyRequests;
