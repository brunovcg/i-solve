/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetFocus,
  UseFormSetValue,
} from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { IconType } from '../../icon/Icon.types';
import { ButtonProps } from '../../button/Button.type';

export type AlignmentTypes = 'start' | 'center' | 'end';

export type StyledFormProps = {
  width?: string;
  buttonsAlignment?: AlignmentTypes;
};

export type FormContextTypes = {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  reset: UseFormReset<FieldValues>;
};

export type FormDefaultSubmit = {
  text: string;
  icon: IconType;
  alignment: string;
};

export type FormButtons = (ButtonProps & { id: number })[];

export type FormProps = StyledFormProps & {
  className?: string;
  schema: ObjectSchema<any>;
  children: ReactNode;
  onSubmit: (payload: any) => void;
  exclude?: string[];
  resettable?: boolean;
  disabled?: boolean;
  initialValues?: object;
  defaultSubmit?: FormDefaultSubmit | false;
  buttons?: FormButtons;
};

export type HookFormForwardRef = {
  getValues: () => void;
};
