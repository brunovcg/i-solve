import { useId, useState, useRef, useEffect, useImperativeHandle, forwardRef, useContext, ForwardedRef } from 'react';
import { ButtonIcon, Container, ErrorMessage, RemainingCharacters } from '../../..';
import StyledTextArea from './TextArea.styled';
import { TextAreaForwardRef, TextAreaProps } from './TextArea.types';
import { jsxHelper } from '../../../../helpers';
import { useDebounce } from '../../../../hooks';
import { CONSTANTS } from '../../../../constants';
import { FormContext } from '../form/Form';
import { RemainingCharactersRef } from '../../remaining-characters/RemainingCharacters.types';

const { CLOSE } = CONSTANTS.GOOGLE_ICONS;
const { conditionalClasses } = jsxHelper;

function TextArea(
  {
    value,
    onChange,
    name,
    label,
    placeholder,
    errorMessage,
    className = '',
    maxLength,
    info,
    disabled = false,
    width,
    maxWidth,
    height,
    showAddOns = true,
    showHeader = true,
    debounce = 1000,
    optionalLabel,
  }: TextAreaProps,
  ref?: ForwardedRef<TextAreaForwardRef>
) {
  const { register, getValues, resetField, errors, setFocus } = useContext(FormContext);
  const initialTextAreaValue = (name ? getValues?.()[String(name) as keyof object] : value) ?? '';
  const [textareaValue, setTextAreaValue] = useState(initialTextAreaValue);
  const [uncontrolledError, setUncontrolledError] = useState(errorMessage);
  const textareaId = useId();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const remainingCharactersRef = useRef<RemainingCharactersRef | null>(null);
  const error = (errors?.[String(name)]?.message as string) ?? uncontrolledError;
  const isMaxLengthSet = !!maxLength;
  const isHookForm = !!name;
  const hasAddons = showAddOns || maxLength;
  const debouncedValue = useDebounce(textareaValue, debounce);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const typedValue = typeof e === 'string' ? e : e.target?.value;

    remainingCharactersRef.current?.setRemainingChars((maxLength ?? 0) - typedValue?.length);
    setTextAreaValue(typedValue);

    if (!debounce) {
      onChange?.(typedValue);
    }
    setUncontrolledError('');
  };

  const clearTextAreaValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onChange?.('');
    setTextAreaValue('');
    remainingCharactersRef.current?.setRemainingChars(maxLength ?? 0);
    setUncontrolledError('');

    if (isHookForm) {
      resetField?.(name);
      setFocus(name);
    } else {
      textareaRef.current?.focus();
    }
  };

  const resetTextAreaValue = () => {
    setTextAreaValue(value ?? '');
    remainingCharactersRef.current?.setRemainingChars(value && maxLength ? maxLength - value.length : 0);
    setUncontrolledError('');
  };

  useImperativeHandle(ref, () => ({ resetTextAreaValue: () => resetTextAreaValue() }));

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const customProps = () => {
    if (isHookForm) {
      return {
        ...register?.(name, {
          onChange: handleChange,
          onBlur: handleBlur,
        }),
      };
    }

    return { value: textareaValue, ref: textareaRef, onChange: handleChange, onBlur: handleBlur };
  };

  const textareaClasses = conditionalClasses({
    ['im-textarea']: true,
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
    <StyledTextArea height={height} width={width} maxWidth={maxWidth} className={textareaClasses}>
      {hasAddons && showHeader && (
        <div className="im-textarea-header">
          {isMaxLengthSet && (
            <div className="im-textarea-remaining-characters">
              {<RemainingCharacters maxLength={maxLength} disabled={disabled} ref={remainingCharactersRef} />}
            </div>
          )}
        </div>
      )}
      <Container
        className="im-textarea-body"
        label={label}
        htmlFor={textareaId}
        focus={isFocused}
        error={!!error}
        disabled={disabled}
        hoverable
        variant="light"
        optionalLabel={optionalLabel}
      >
        <textarea
          className="im-textarea-field"
          id={textareaId}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={handleFocus}
          {...customProps()}
        />
        <ButtonIcon
          className="im-textarea-clear-button"
          icon={CLOSE}
          onClick={clearTextAreaValue}
          disabled={disabled}
          error={!!error}
          hide={!textareaValue || disabled}
        />
      </Container>
      {hasAddons && (
        <div className="im-textarea-footer">
          <p className="im-textarea-info">{info}</p>
          <ErrorMessage error={error} hide={disabled} margin="5px 0 0 15px" />
        </div>
      )}
    </StyledTextArea>
  );
}

export default forwardRef(TextArea);
