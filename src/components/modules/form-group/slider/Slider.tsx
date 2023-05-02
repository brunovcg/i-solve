import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState, useRef, useContext, MouseEvent } from 'react';
import { SliderProps, SliderForwardedRef } from './Slider.types';
import ButtonIcon from '../../button-icon/ButtonIcon';
import { CONSTANTS } from '../../../../constants';
import StyledSlider from './Slider.styled';
import { Container, ErrorMessage } from '../../..';
import { jsxHelper } from '../../../../helpers';
import { FormContext } from '../form/Form';
import * as RadixSlider from '@radix-ui/react-slider';

const { UNDO } = CONSTANTS.GOOGLE_ICONS;
const { conditionalClasses } = jsxHelper;

function Slider(
  {
    label,
    max,
    min,
    value,
    step = 1,
    disabled,
    valid,
    error,
    width = '100%',
    name,
    availableSum,
    maxSum,
    onChange,
    onReset,
    setAvailableSum,
    showFooter = false,
    initialValue,
  }: SliderProps,
  ref: ForwardedRef<SliderForwardedRef>
) {
  const [inputValue, setInputValue] = useState(value ?? min);
  const [isFocused, setIsFocused] = useState(false);

  const initValue = initialValue ?? min;

  const { setValue, errors } = useContext(FormContext);

  const isValid = typeof valid === 'boolean' ? valid : valid?.(inputValue);

  const isHookForm = !!name;

  const hasSumLimit = availableSum !== undefined;
  const hasAvailableSumLimit = availableSum !== undefined && availableSum > 0;

  const canReset = () => {
    if (hasSumLimit) {
      if (inputValue < initValue && maxSum) {
        return maxSum - availableSum - inputValue + initValue <= maxSum;
      }
      return availableSum > 0 || (initValue !== inputValue && initValue);
    }

    return true;
  };

  const hideReset = !canReset() || initValue === inputValue || initValue === undefined;

  const allErrors = (errors?.[String(name)]?.message as string) ?? error;

  const handleChange = (updatedValue: number) => {
    const variationDelta = updatedValue - inputValue;
    const increased = variationDelta > 0;

    if (hasSumLimit) {
      if (increased && availableSum - variationDelta < 0) {
        return;
      } else {
        setAvailableSum?.((state: number) => state - variationDelta);
      }
    }

    onChange?.(updatedValue);

    if (isHookForm) {
      setValue(name, updatedValue);
    }
    setInputValue(updatedValue);
  };

  const resetSlider = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (hasSumLimit) {
      const variationDelta = initValue ?? 0 - inputValue;
      setAvailableSum?.((state: number) => state - variationDelta);
    }
    if (isHookForm) {
      setValue(name, initValue);
    }
    setInputValue(initValue ?? 0);
    onReset?.(initValue ?? 0);
  };

  useImperativeHandle(ref, () => ({ resetSlider }));

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const CHAR_WIDTH = 10;
  const INPUT_BUTTONS_WIDTH = 25;
  const NUMBER_CHARS = max.toString().length;

  const valueDisplaySize = `${NUMBER_CHARS * CHAR_WIDTH + INPUT_BUTTONS_WIDTH}px`;

  const commonProps = {
    max,
    min,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const classes = conditionalClasses({
    ['im-slider']: true,
    ['im-error']: !!allErrors || hasAvailableSumLimit,
    ['im-disabled']: !!disabled,
    ['im-max-limit']: availableSum === 0,
    ['im-valid']: !!isValid,
  });

  return (
    <StyledSlider className={classes} valueDisplaySize={valueDisplaySize} width={width}>
      <Container
        className="im-slider-container"
        label={label}
        focus={isFocused}
        disabled={disabled}
        hoverable
        error={!!error}
        ref={containerRef}
        valid={!!isValid}
      >
        <RadixSlider.Root
          className="im-slider-root"
          disabled={disabled}
          value={[inputValue]}
          onValueChange={(updatedValue) => handleChange(updatedValue[0])}
          onValueCommit={() => handleChange(inputValue)}
          step={step}
          aria-label="Volume"
          {...commonProps}
        >
          <RadixSlider.Track className="im-slider-track">
            <RadixSlider.Range className="im-slider-range" />
          </RadixSlider.Track>
          <RadixSlider.Thumb className="im-slider-thumb" />
        </RadixSlider.Root>
        <input
          type="number"
          disabled={disabled}
          value={inputValue}
          onChange={(e) => handleChange(Number(e.target.value))}
          {...commonProps}
        />
        <ButtonIcon icon={UNDO} onClick={resetSlider} hide={hideReset} size="medium" />
      </Container>
      {showFooter && (
        <div className="im-slider-footer">
          <div className="im-slider-max-min">
            <span>Min ({min})</span> | Max ({max})
          </div>
          <ErrorMessage error={allErrors} className="im-slider-error" />
        </div>
      )}
    </StyledSlider>
  );
}

export default forwardRef(Slider);
