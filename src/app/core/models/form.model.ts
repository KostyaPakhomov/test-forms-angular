export interface Form{
  form: FormModel[];
}
export interface FormModel {
  [key: string]: any;
  display_name: string;
  name: string;
  type: string;
  required: boolean;
  descripton: string | null;
  choices: null;
  value: null | number | string | (number | string)[];
  canAdd: boolean;
  inputs: null | Inputs[]
}
interface Inputs{
  value: string|boolean|null;
  name: string;
  display_name: string;
  completed?: boolean;
}