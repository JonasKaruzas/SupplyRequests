import * as React from "react";
import { useContext } from "react";
import { GlobalContext } from "./SupplyRequests";
import { ModernTaxonomyPicker } from "@pnp/spfx-controls-react/lib/ModernTaxonomyPicker";
import { TERM_SET_ID } from "./config/config";
import { ITermInfo } from "@pnp/spfx-controls-react/node_modules/@pnp/sp/taxonomy/";
import { RequestFormTagPickerProps } from "./interfaces/RequestFormTagPickerProps";

const RequestFormTagPicker: React.FC<RequestFormTagPickerProps> = (
  props: RequestFormTagPickerProps,
) => {
  const globalContext = useContext(GlobalContext);

  const spContext = globalContext?.SpContext;
  const selectedItem = globalContext?.SelectedListItemContext;

  const initialValues = selectedItem?.Tags.map((item) => ({
    labels: [{ name: item.Label, isDefault: true, languageTag: "en-US" }],
    id: item.TermGuid,
  }));

  const onChange = (terms: ITermInfo[]): void => {
    const tagsIds: string[] = terms.map((item) => item.id);
    props.onTagsChange(tagsIds);
  };

  return (
    <>
      <ModernTaxonomyPicker
        allowMultipleSelections={true}
        termSetId={TERM_SET_ID}
        panelTitle="Select Term"
        label="Taxonomy Picker"
        context={spContext}
        onChange={onChange}
        initialValues={initialValues}
      />
    </>
  );
};

export default RequestFormTagPicker;
