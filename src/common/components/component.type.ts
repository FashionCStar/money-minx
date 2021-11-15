export interface ButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface InputType {
  value?: string | number | File;
  name: string;
  type?: string;
  title: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  classNames?: [string];
  handleChange: (e: string | any) => void;
  handleOnBlur?: (e: string | any) => void;
}

export interface OptionType {
  name: string;
  value: string | number;
}

export interface SelectProps {
  name: string;
  title: string;
  error?: boolean;
  helperText?: string;
  options: OptionType[];
  value?: string | number;
  handleChange: (e: string | any) => void;
  handleOnBlur?: (e: string | any) => void;
}

export interface TableProps {
  bodyEl: React.ReactNode;
  headerEl: React.ReactNode;
}
