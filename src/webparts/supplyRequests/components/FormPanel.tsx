import * as React from "react";
import { useContext } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import RequestForm from "./RequestForm";
import { IFormPanel } from "./interfaces/IFormPanel";
import { GlobalContext } from "./SupplyRequests";

const FormPanel: React.FC<IFormPanel> = (props: IFormPanel) => {
  const globalContext = useContext(GlobalContext);
  const isUserAManager = globalContext?.IsUserAManagerContext;

  const closePanel = (): void => {
    props.hideFormPanel();
  };

  const openPanel = (): void => {
    props.showFormPanel();
  };

  const onSave = async (
    formData: React.FormEvent,
  ): Promise<number | undefined> => {
    props.hideFormPanel();
    const res = await props.onAddItem(formData);

    if (res) {
      return res;
    }

    return undefined;
  };

  const onUpdate = async (formData: React.FormEvent): Promise<void> => {
    props.hideFormPanel();
    await props.onUpdateItem(formData);
  };

  const onDelete = async (id: number): Promise<void> => {
    props.hideFormPanel();
    await props.onDelete(id);
  };

  return (
    <div>
      {isUserAManager ? null : (
        <DefaultButton
          primary
          text="Add request"
          onClick={openPanel}
          style={{ marginTop: "16px" }}
        />
      )}
      <Panel
        headerText="Request info"
        isOpen={props.formPanelVisible}
        onDismiss={closePanel}
        closeButtonAriaLabel="Close"
      >
        <RequestForm
          onAddItem={onSave}
          onDelete={onDelete}
          onUpdateItem={onUpdate}
          onCancel={closePanel}
        />
      </Panel>
    </div>
  );
};

export default FormPanel;
