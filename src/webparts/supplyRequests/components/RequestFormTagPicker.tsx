// import * as React from "react";
// import { useContext } from "react";

// import {
//   TagPicker,
//   ITag,
//   IInputProps,
//   IBasePickerSuggestionsProps,
// } from "@fluentui/react/lib/Pickers";
// import { mergeStyles } from "@fluentui/react/lib/Styling";

// import { GlobalContext } from "./SupplyRequests";

// const rootClass = mergeStyles({
//   maxWidth: 500,
// });

// const inputProps: IInputProps = {
//   onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
//     console.log("onBlur called"),
//   onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
//     console.log("onFocus called"),
// };

// const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
//   suggestionsHeaderText: "Suggested tags",
//   noResultsFoundText: "No color tags found",
// };

// const defaultSelected: ITag[] = ["rose", "red"].map((item) => ({
//   key: item,
//   name: item,
// }));
// const getTextFromItem = (item: ITag) => item.name;

// const RequestFormTagPicker: React.FC = () => {
//   const globalContext = useContext(GlobalContext);

//   const availableTags = globalContext?.AvailableTagsContext ?? [];
//   const selectedItem = globalContext?.SelectedListItemContext;

//   console.log(selectedItem);

//   const listContainsTagList = (tag: ITag, tagList?: ITag[]): boolean => {
//     if (!tagList || !tagList.length || tagList.length === 0) {
//       return false;
//     }
//     return tagList.some((compareTag) => compareTag.key === tag.key);
//   };

//   const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
//     return filterText
//       ? availableTags.filter(
//           (tag) =>
//             tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 &&
//             !listContainsTagList(tag, tagList),
//         )
//       : [];
//   };

//   return (
//     <div className={rootClass}>
//       <label htmlFor="picker1">Tags</label>
//       <TagPicker
//         defaultSelectedItems={defaultSelected}
//         removeButtonAriaLabel="Remove"
//         selectionAriaLabel="Selected colors"
//         onResolveSuggestions={filterSuggestedTags}
//         getTextFromItem={getTextFromItem}
//         pickerSuggestionsProps={pickerSuggestionsProps}
//         inputProps={{
//           ...inputProps,
//           id: "picker1",
//         }}
//       />
//     </div>
//   );
// };

// export default RequestFormTagPicker;
