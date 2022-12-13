export interface Form {
  form: FormModel[];
}
export interface FormModel {
  [key: string]: any;
  display_name: string;
  name: string;
  type: string;
  required: boolean;
  description: Description | null;
  value: null | number | string | (number | string)[] | Inputs[];
  canAdd: boolean;
  inputs: null | Inputs[];
}
export interface Inputs {
  value: string | boolean | null;
  name: string;
  display_name?: string;
  completed?: boolean;
}
interface Description {
  placeholder: string;
  text: string;
}
