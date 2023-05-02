import { ForwardedRef, Fragment, createContext, forwardRef, useImperativeHandle, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components';
import { StyledForm } from './Form.styled';
import { AlignmentTypes, FormContextTypes, FormProps, HookFormForwardRef } from './Form.types';
import i18next from 'i18next';
import { IconType } from '../../icon/Icon.types';

export const FormContext = createContext<FormContextTypes>({} as FormContextTypes);

function Form(
  {
    schema,
    children,
    className,
    onSubmit,
    exclude = [],
    defaultSubmit = { text: i18next.t('Components.Form.Submit'), icon: '' as IconType, alignment: 'center' },
    resettable = false,
    disabled,
    width,
    buttons,
  }: FormProps,
  ref: ForwardedRef<HookFormForwardRef>
) {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setFocus,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  useImperativeHandle(ref, () => ({ getValues }));

  const action = ({ ...all }) => {
    const data = { ...all };

    if (exclude.length) {
      for (const key of exclude) {
        delete data[String(key)];
      }
    }

    onSubmit(data);
    if (resettable) reset();
  };

  const mapDefaultSubmit = () => {
    if (defaultSubmit) {
      return defaultSubmit;
    }
    return { alignment: '', icon: '', text: '' };
  };

  const providerValue = useMemo(
    () => ({ register, getValues, resetField, errors, setFocus, setValue, reset }),
    [register, getValues, resetField, errors, setFocus, setValue, reset]
  );

  const hasButtons = defaultSubmit || buttons?.length;

  return (
    <StyledForm
      onSubmit={handleSubmit(action)}
      className={`im-form ${className}`}
      width={width}
      buttonsAlignment={mapDefaultSubmit()?.alignment as AlignmentTypes}
    >
      <FormContext.Provider value={providerValue}>{children}</FormContext.Provider>

      {hasButtons && (
        <div className="im-form-buttons">
          {defaultSubmit && (
            <Button text="Submeter" icon={mapDefaultSubmit()?.icon as IconType} variant="primary" type="submit" disabled={disabled} />
          )}
          {buttons?.map((button) => (
            <Fragment key={button.id}>
              <Button {...button} />
            </Fragment>
          ))}
        </div>
      )}
    </StyledForm>
  );
}

export default forwardRef(Form);
