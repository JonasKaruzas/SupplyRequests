import * as React from "react";
import { useState, useEffect, createContext } from "react";

// import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import { SPFx, spfi } from "@pnp/sp";

// import "@pnp/sp/site-groups/web";
// import "@pnp/sp/taxonomy";
// import { ITermGroupInfo } from "@pnp/sp/taxonomy";
// import { IFieldInfo } from "@pnp/sp/fields/types";

import type { ISupplyRequestsProps } from "./interfaces/ISupplyRequestsProps";
import { IListItem } from "./interfaces/IListItem";
import { IRequestStatusListItem } from "./interfaces/IRequestStatusListItem";
import { IRequestTypeListItem } from "./interfaces/IRequestTypeListItem";
// import { IFormState } from "./RequestForm";

import { WebPartContext } from "@microsoft/sp-webpart-base";

// import RequestList from "./RequestList";
// import FormPanel from "./FormPanel";

// import { UserGroups } from "./enums/UserGroups";
import { IRequestAreaOptions } from "./interfaces/IRequestAreaOptions";
// import { ITermInfo } from "@pnp/sp/taxonomy";
import { ITag } from "@fluentui/react";
import Services from "./services/Services";
import { ICurrentUser } from "./interfaces/ICurrentUser";
import { IAvailableTags } from "./interfaces/IAvailableTags";

// const _requestsTable = "Requests";
// const _requestsStatusesTable = "RequestStatuses";
// const _requestsTypesTable = "RequestTypes";
// const _requestsRequestAreaColumn = "RequestArea";
// const _requestsTagsColumn = "Tags";

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
  const [requestsStatusesList, setRequestsStatusesList] =
    useState<IRequestStatusListItem[]>();
  const [requestsTypesList, setRequestsTypesList] =
    useState<IRequestTypeListItem[]>();
  const [currentUser, setCurrentUser] = useState<ICurrentUser | undefined>(
    undefined,
  );
  const [allUsers, setAllUsers] = useState<ICurrentUser[] | undefined>(
    undefined,
  );
  const [isUserAManager, setIsUserAManager] = useState<boolean>(false);
  const [areaOptions, setAreaOptions] = useState<
    IRequestAreaOptions[] | undefined
  >(undefined);
  const [availableTags, setAvailableTags] = useState<IAvailableTags[] | []>([]);
  const [selectedListItem, setSelectedListItem] = useState<IListItem | null>(
    null,
  );

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        setRequestsList(await services.getListItems());
        setRequestsStatusesList(await services.getStatusesItems());
        setRequestsTypesList(await services.getTypesItems());
        setCurrentUser(await services.getCurrentUser());
        setAllUsers(await services.getAllUsers());
        setIsUserAManager(await services.getIsUserAManager());
        setAreaOptions(await services.getAreaOptions());
        setAvailableTags(await services.getTags());
        setSelectedListItem(null);
      } catch (error) {
        console.error(error);
      }
    };

    getData().catch((error) => console.error(error));
  }, []);

  console.log(requestsList);
  console.log(requestsStatusesList);
  console.log(requestsTypesList);
  console.log(currentUser);
  console.log(allUsers);
  console.log(isUserAManager);
  console.log(areaOptions);
  console.log(availableTags);
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
    <div>demo</div>
    // <SpContext.Provider value={props.context}>
    //   <AvailableTagsContext.Provider value={availableTags}>
    //     <RequestsAreaOptionsContext.Provider value={areaOptions}>
    //       <IsUserAManagerContext.Provider value={isUserAManager}>
    //         <AllUsersContext.Provider value={allUsers}>
    //           <CurrentUserContext.Provider value={currentUser}>
    //             <RequestsStatusesContext.Provider value={requestsStatusesList}>
    //               <RequestsTypesContext.Provider value={requestsTypesList}>
    //                 <SelectedListItemContext.Provider value={selectedListItem}>
    // <FluentProvider theme={webLightTheme}>
    //   <FormPanel
    //     onAddItem={addItem}
    //     onDelete={deleteItem}
    //     onUpdateItem={updateItem}
    //     formPanelVisible={formPanelVisible}
    //     hideFormPanel={hideFormPanel}
    //     showFormPanel={showFormPanel}
    //   />
    //   <RequestList
    //     list={requestsList}
    //     onSelect={selectItem}
    //   />
    // </FluentProvider>
    //                 </SelectedListItemContext.Provider>
    //               </RequestsTypesContext.Provider>
    //             </RequestsStatusesContext.Provider>
    //           </CurrentUserContext.Provider>
    //         </AllUsersContext.Provider>
    //       </IsUserAManagerContext.Provider>
    //     </RequestsAreaOptionsContext.Provider>
    //   </AvailableTagsContext.Provider>
    // </SpContext.Provider>
  );
};

export default SupplyRequests;
