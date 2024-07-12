import {
  ChangeEvent,
  CSSProperties,
  FocusEventHandler,
  ReactNode,
} from "react";

export type AutocompleteProps = {
  placeholder?: string;
  fetchSuggesions: (query: string) => Promise<any[]>;
  dataKey: string;
  customLoading: ReactNode;
  onSelect: Function;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onChange: Function;
  customStyles?: CSSProperties;
  staticData?: any[];
};

export type ChangeEventType = ChangeEvent<HTMLInputElement>;

export type SuggestionListProps = {
  suggestions: any[];
  highlight: string;
  dataKey: string;
  onSuggestionClick: Function;
};
