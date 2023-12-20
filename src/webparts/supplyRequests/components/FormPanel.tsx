import * as React from "react";
import { useContext } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import RequestForm from "./RequestForm";
import { IFormPanel } from "./interfaces/IFormPanel";
import { IsUserAManagerContext } from "./SupplyRequests";

const FormPanel: React.FC<IFormPanel> = (props: IFormPanel) => {
  const isUserAManager = useContext(IsUserAManagerContext);

  const closePanel = (): void => {
    props.hideFormPanel();
  };

  const openPanel = (): void => {
    props.showFormPanel();
  };

  const onSave = async (formData: React.FormEvent): Promise<void> => {
    await props.hideFormPanel();
    await props.onAddItem(formData);
  };

  const onUpdate = async (formData: React.FormEvent): Promise<void> => {
    await props.hideFormPanel();
    await props.onUpdateItem(formData);
  };

  const onDelete = async (id: number): Promise<void> => {
    await props.hideFormPanel();
    await props.onDelete(id);
  };

  return (
    <div>
      {isUserAManager ? null : (
        <DefaultButton primary text="Add request" onClick={openPanel} />
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
        />
      </Panel>
    </div>
  );
};

export default FormPanel;
