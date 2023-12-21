import * as React from "react";

import {
  TagPicker,
  ITag,
  IInputProps,
  IBasePickerSuggestionsProps,
} from "@fluentui/react/lib/Pickers";
import { mergeStyles } from "@fluentui/react/lib/Styling";

const rootClass = mergeStyles({
  maxWidth: 500,
});

const inputProps: IInputProps = {
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
    console.log("onBlur called"),
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
    console.log("onFocus called"),
};

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested tags",
  noResultsFoundText: "No color tags found",
};

const testTags: ITag[] = [
  "black",
  "blue",
  "brown",
  "cyan",
  "green",
  "magenta",
  "mauve",
  "orange",
  "pink",
  "purple",
  "red",
  "rose",
  "violet",
  "white",
  "yellow",
].map((item) => ({ key: item, name: item }));

const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
  if (!tagList || !tagList.length || tagList.length === 0) {
    return false;
  }
  return tagList.some((compareTag) => compareTag.key === tag.key);
};

const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
  return filterText
    ? testTags.filter(
        (tag) =>
          tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 &&
          !listContainsTagList(tag, tagList),
      )
    : [];
};

const getTextFromItem = (item: ITag) => item.name;

const RequestFormTagPicker: React.FC = () => {
  return (
    <div className={rootClass}>
      <label htmlFor="picker1">Tags</label>
      <TagPicker
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected colors"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        inputProps={{
          ...inputProps,
          id: "picker1",
        }}
      />
    </div>
  );
};

export default RequestFormTagPicker;
