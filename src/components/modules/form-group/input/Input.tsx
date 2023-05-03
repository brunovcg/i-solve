import { useId, useState, useRef, useEffect, useImperativeHandle, forwardRef, useContext, ForwardedRef } from 'react';
import { ButtonIcon, Container, ErrorMessage, RemainingCharacters } from '../../../../components';
import StyledInput from './Input.styled';
import { InputForwardRef, InputProps } from './Input.types';
import { jsxHelper } from '../../../../helpers';
import { useDebounce } from '../../../../hooks';
import { CONSTANTS } from '../../../../constants';
import { FormContext } from '../form/Form';
import { RemainingCharactersRef } from '../../remaining-characters/RemainingCharacters.types';
import { IconType } from '../../icon/Icon.types';

const { VISIBILITY, VISIBILITY_OFF, CLOSE, SEARCH, UNDO } = CONSTANTS.GOOGLE_ICONS;
const { conditionalClasses } = jsxHelper;

function Input(
  {
    onChange,
    onBlur,
    name,
    label,
    placeholder,
    errorMessage,
    valid,
    className = '',
    maxLength,
    maxValue,
    minValue,
    info,
    type = 'text',
    disabled = false,
    onSearch,
    canReset = false,
    canClear = true,
    initialValue = '',
    width,
    maxWidth,
    height,
    showAddOns = true,
    showHeader = true,
    debounce = 1000,
    optionalLabel,
    value,
  }: InputProps,
  ref?: ForwardedRef<InputForwardRef>
) {
  const { register, getValues, resetField, errors, setFocus } = useContext(FormContext);
  const initialInputValue = (name ? getValues?.()[String(name) as keyof object] : value) ?? '';
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [uncontrolledError, setUncontrolledError] = useState(errorMessage);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const remainingCharactersRef = useRef<RemainingCharactersRef | null>(null);
  const error = (errors?.[String(name)]?.message as string) ?? uncontrolledError;
  const isMaxLengthSet = !!maxLength;
  const isHookForm = !!name;
  const hasAddons = showAddOns || maxLength;
  const debouncedValue = useDebounce(inputValue, debounce);

  const isResettable = canReset && initialValue != inputValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = typeof e === 'string' ? e : e.target?.value;

    remainingCharactersRef.current?.setRemainingChars((maxLength ?? 0) - typedValue?.length);

    if (type === 'number' && !typedValue) {
      setInputValue(minValue ?? 0);
    } else {
      setInputValue(typedValue);
    }

    if (type === 'number' && maxValue) {
      if (Number(typedValue) > maxValue) {
        setInputValue(maxValue);
      }
    }

    if (type === 'number' && minValue !== undefined) {
      if (Number(typedValue) < minValue) {
        setInputValue(minValue);
      }
    }

    if (!debounce) {
      onChange?.(typedValue);
    }

    setUncontrolledError('');
  };

  const isValid = typeof valid === 'boolean' ? valid : valid?.(inputValue);

  const clearInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    onSearch?.('');
    onChange?.('');
    setInputValue('');
    remainingCharactersRef.current?.setRemainingChars(maxLength ?? 0);
    setUncontrolledError('');

    if (isHookForm) {
      resetField?.(name);
      setFocus(name);
    } else {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (value && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const resetInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    onBlur?.(initialValue);

    setInputValue(initialValue ?? '');
    remainingCharactersRef.current?.setRemainingChars(value && maxLength ? maxLength - value.length : 0);
    setUncontrolledError('');
  };

  useImperativeHandle(ref, () => ({ resetInputValue, clearInputValue }));

  const handleSearch = () => onSearch?.(inputValue);
  const toggleTypePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowPassword((state) => !state);
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    onBlur?.(inputValue);
    setIsFocused(false);
  };

  const customProps = () => {
    if (isHookForm) {
      return {
        ...register?.(name, {
          onChange: handleChange,
          onBlur: handleBlur,
        }),
      };
    }

    return { value: inputValue, ref: inputRef, onChange: handleChange, onBlur: handleBlur };
  };

  const getInputTypeState = () => {
    if (type !== 'password') {
      return { type };
    }
    return {
      type: showPassword ? 'text' : 'password',
      icon: showPassword ? VISIBILITY_OFF : VISIBILITY,
    };
  };

  const inputClasses = conditionalClasses({
    ['im-input']: true,
    ['im-valid']: !!isValid,
    [`${className}`]: !!className,
  });

  useEffect(() => {
    if (debounce && !isHookForm) {
      onChange?.(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setUncontrolledError(errorMessage);
  }, [errorMessage]);

  return (
    <StyledInput height={height} width={width} maxWidth={maxWidth} className={inputClasses}>
      {hasAddons && showHeader && (
        <div className="im-input-header">
          {isMaxLengthSet && (
            <div className="im-input-remaining-characters">
              {<RemainingCharacters maxLength={maxLength} disabled={disabled} ref={remainingCharactersRef} />}
            </div>
          )}
        </div>
      )}
      <Container
        className="im-input-body"
        label={label}
        htmlFor={inputId}
        focus={isFocused}
        error={!!error}
        disabled={disabled}
        hoverable
        variant="light"
        optionalLabel={optionalLabel}
        valid={!!isValid}
      >
        <input
          className="im-input-field"
          type={getInputTypeState().type}
          id={inputId}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
          max={maxValue}
          min={minValue}
          onFocus={handleFocus}
          {...customProps()}
        />
        {type === 'password' && (
          <ButtonIcon
            icon={getInputTypeState().icon as IconType}
            onClick={toggleTypePassword}
            disabled={disabled}
            error={!!error}
            hide={disabled || !inputValue || type !== 'password'}
          />
        )}
        {onSearch && (
          <span className="im-input-search">
            <ButtonIcon icon={SEARCH} onClick={handleSearch} disabled={disabled} error={!!error} hide={!inputValue || disabled} />
          </span>
        )}
        {canReset && type !== 'password' && (
          <ButtonIcon
            icon={UNDO}
            onClick={resetInputValue}
            disabled={disabled}
            error={!!error}
            hide={!isResettable || disabled}
            size="small"
          />
        )}
        {canClear && (
          <ButtonIcon
            icon={CLOSE}
            onClick={clearInputValue}
            disabled={disabled}
            error={!!error}
            hide={!inputValue || disabled}
            size="small"
          />
        )}
      </Container>
      {hasAddons && (
        <div className="im-input-footer">
          <p className="im-input-info">{info}</p>
          <ErrorMessage error={error} hide={disabled} />
        </div>
      )}
    </StyledInput>
  );
}

export default forwardRef(Input);
