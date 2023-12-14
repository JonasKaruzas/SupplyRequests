import * as React from "react";
// import { useContext } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
// import { useBoolean } from "@fluentui/react-hooks";
import RequestForm from "./RequestForm";
import { IFormPanel } from "./IFormPanel";

const FormPanel: React.FC<IFormPanel> = (props: IFormPanel) => {
  // const context = useContext(SpContext);

  // console.log("context");
  // console.log(context);

  const closePanel = () => {
    props.hideFormPanel();
  };

  const openPanel = () => {
    props.showFormPanel();
  };

  const onSave = async (formData: React.FormEvent): Promise<void> => {
    await props.onAddItem(formData);
    await props.hideFormPanel();
  };

  const onDelete = async (id: number): Promise<void> => {
    await props.onDelete(id);
    await props.hideFormPanel();
  };

  return (
    <div>
      <DefaultButton primary text="Add request" onClick={openPanel} />
      <Panel
        headerText="Request info"
        isOpen={props.formPanelVisible}
        onDismiss={closePanel}
        closeButtonAriaLabel="Close"
      >
        <RequestForm onAddItem={onSave} onDelete={onDelete} />
      </Panel>
    </div>
  );
};

export default FormPanel;
