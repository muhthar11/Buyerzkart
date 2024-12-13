// src/react-google-autocomplete.d.ts
declare module "react-google-autocomplete" {
  import { Component, ChangeEventHandler, InputHTMLAttributes } from "react";

  export interface ReactGoogleAutocompleteInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    apiKey: string;
    onPlaceSelected: (place: any) => void;
    options?: {
      types?: string[];
      componentRestrictions?: {
        country?: string;
      };
    };
    value?: string; // Add the value prop here
    onChange?: ChangeEventHandler<HTMLInputElement>; // Add the onChange prop here
  }

  export default class ReactGoogleAutocomplete extends Component<ReactGoogleAutocompleteInputProps> {}
}
