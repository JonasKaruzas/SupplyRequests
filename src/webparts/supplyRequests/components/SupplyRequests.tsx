import * as React from "react";
import { useState, useEffect, createContext } from "react";

import RequestList from "./RequestList";

import { SPFx, spfi } from "@pnp/sp";

import type { ISupplyRequestsProps } from "./interfaces/ISupplyRequestsProps";
import { IListItem } from "./interfaces/IListItem";
import Services from "./services/Services";
import FormPanel from "./FormPanel";
import { IGlobalContext } from "./interfaces/IGlobalContext";

import { IFormState } from "./interfaces/IFormState";

export const GlobalContext = createContext<IGlobalContext | undefined>(
  undefined,
);

const SupplyRequests: React.FC<ISupplyRequestsProps> = (
  props: ISupplyRequestsProps,
) => {
  const { context } = props;
  const sp = spfi().using(SPFx(context));

  const services = new Services(sp);

  const [requestsList, setRequestsList] = useState<IListItem[] | undefined>();
  const [formPanelVisible, setFormPanelVisible] = useState<boolean>(false);

  const updateTags = async (id: number, tagStrings: string): Promise<void> => {
    await services.updateTags(id, tagStrings);
    setRequestsList(await services.getListItems());
  };

  const [globalContext, setGlobalContext] = useState<IGlobalContext>({
    SpContext: context,
    SelectedListItemContext: null,
    RequestsTypesContext: undefined,
    RequestsStatusesContext: null,
    RequestsAreaOptionsContext: undefined,
    CurrentUserContext: undefined,
    AllUsersContext: undefined,
    IsUserAManagerContext: false,
    updateListItemTags: updateTags,
  });

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        setRequestsList(await services.getListItems());
        setGlobalContext({
          ...globalContext,
          IsUserAManagerContext: await services.getIsUserAManager(),
          AllUsersContext: await services.getAllUsers(),
          RequestsAreaOptionsContext: await services.getAreaOptions(),
          RequestsTypesContext: await services.getTypesItems(),
          CurrentUserContext: await services.getCurrentUser(),
        });
      } catch (error) {
        console.error(error);
      }
    };

    getData().catch((error) => console.error(error));
  }, []);

  const selectItem = (id: number): void => {
    if (!requestsList) return;
    setGlobalContext({
      ...globalContext,
      SelectedListItemContext: services.selectItemFromList(id, requestsList),
    });
    setFormPanelVisible(true);
  };

  const hideFormPanel = (): void => {
    setFormPanelVisible(false);
    setGlobalContext({ ...globalContext, SelectedListItemContext: null });
  };

  const showFormPanel = (): void => {
    setFormPanelVisible(true);
  };

  const onAddItem = async (
    formData: IFormState,
  ): Promise<number | undefined> => {
    const res = await services.addItem(formData);
    setRequestsList(await services.getListItems());

    if (res) {
      return res;
    }

    return undefined;
  };

  const onDeleteItem = async (id: number): Promise<void> => {
    await services.deleteItem(id);
    setRequestsList(await services.getListItems());
  };

  const onUpdateItem = async (formData: IFormState): Promise<void> => {
    await services.updateItem(formData);
    setRequestsList(await services.getListItems());
  };

  return (
    <>
      <GlobalContext.Provider value={globalContext}>
        <FormPanel
          onAddItem={(formData: IFormState) => onAddItem(formData)}
          onDelete={(id: number) => onDeleteItem(id)}
          onUpdateItem={(formData: IFormState) => onUpdateItem(formData)}
          formPanelVisible={formPanelVisible}
          hideFormPanel={hideFormPanel}
          showFormPanel={showFormPanel}
        />
        <RequestList list={requestsList} onSelect={selectItem} />
      </GlobalContext.Provider>
    </>
  );
};

export default SupplyRequests;
