import { useId, ForwardedRef, forwardRef, useContext, ChangeEvent } from 'react';
import StyledCheckbox from './Checkbox.styled';
import { CheckboxProps } from './Checkbox.types';
import { jsxHelper } from '../../../../helpers';
import { FormContext } from '../form/Form';

function Checkbox({ label, onChange, checked, name, disabled, ...rest }: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) {
  const inputId = useId();
  const { setValue } = useContext(FormContext);
  const isHookForm = !!name;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    if (isHookForm) {
      setValue(name, e);
    }
  };

  const classes = jsxHelper.conditionalClasses({
    ['im-checkbox']: true,
    ['im-checked']: checked,
    ['im-disabled']: disabled,
  });

  return (
    <StyledCheckbox className={classes}>
      <input id={inputId} disabled={disabled} type="checkbox" checked={checked} onChange={handleChange} ref={ref} {...rest} />
      {label && <label htmlFor={inputId}>{label}</label>}
    </StyledCheckbox>
  );
}

export default forwardRef(Checkbox);
