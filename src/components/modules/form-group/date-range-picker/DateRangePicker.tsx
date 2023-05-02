import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { useState, forwardRef, ForwardedRef, useImperativeHandle, useContext } from 'react';
import { CONSTANTS } from '../../../../constants';
import ButtonIcon from '../../button-icon/ButtonIcon';
import { StyledDateRangePicker } from './DateRangePicker.styled';
import { DatePickerDates, DateRangePickerProps, DateRangePickerRef } from './DateRangePicker.types';
import { jsxHelper } from '../../../../helpers';
import { FormContext } from '../form/Form';
import { Container, ErrorMessage } from '../../../../components';
import './DateRangePicker.scss';

const { CLOSE } = CONSTANTS.GOOGLE_ICONS;
const { conditionalClasses } = jsxHelper;

function DateRangePicker(
  {
    placeholder,
    onSelect,
    width = '320px',
    name,
    height,
    errorMessage,
    showAddOns = true,
    label,
    disabled,
    startDate,
    optionalLabel,
    endDate,
  }: DateRangePickerProps,
  ref?: ForwardedRef<DateRangePickerRef>
) {
  const initDates = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const hasStartOrDates = [start, end].filter(Boolean).length > 0;
    return hasStartOrDates ? [start, end] : null;
  };

  const [dates, setDates] = useState<DatePickerDates>(initDates() as DatePickerDates);
  const { setValue, errors } = useContext(FormContext);
  const [isFocused, setIsFocused] = useState(false);

  const error = (dates as Date[])?.length > 1 ? '' : errorMessage ?? (errors?.[name as keyof typeof errors]?.message as string);

  const isHookForm = !!name;

  const handleClear = () => {
    setDates(null);
    onSelect?.(null);

    if (isHookForm) {
      setValue(name, (initDates() as DatePickerDates) ?? null);
    }
  };

  const handleReset = () => {
    setDates((initDates() as DatePickerDates) ?? null);
    if (isHookForm) {
      setValue(name, (initDates() as DatePickerDates) ?? null);
    }
  };

  useImperativeHandle(ref, () => ({ resetDateRangePicker: handleReset }));

  const handleChange = (currentDates: Date[]) => {
    const isSelected = currentDates?.length > 1;

    if (isSelected || !dates) {
      onSelect?.(currentDates);
      if (isHookForm) {
        setValue(name, currentDates);
      }
    }
  };

  const dateRangePickerClasses = conditionalClasses({
    ['im-date-range-picker']: true,
    ['im-open']: isFocused,
  });

  const wrapperClasses = conditionalClasses({
    ['im-date-range-picker-wrapper']: true,
  });

  return (
    <StyledDateRangePicker className={dateRangePickerClasses} width={width}>
      <Container
        variant="light"
        hoverable
        label={label}
        height={height}
        focus={isFocused}
        error={!!error}
        disabled={disabled}
        optionalLabel={optionalLabel}
      >
        <div className={wrapperClasses}>
          <Calendar
            value={dates}
            onChange={(e: CalendarChangeEvent) => {
              handleChange((e.value as Date[])?.filter(Boolean));
              setDates((e.value as Date[])?.filter(Boolean));
            }}
            disabled={disabled}
            selectionMode="range"
            onShow={() => setIsFocused(true)}
            onHide={() => setIsFocused(false)}
            readOnlyInput
            placeholder={placeholder ?? 'Selecione as datas.'}
            className="im-date-range-picker-calendar"
          />
          <ButtonIcon icon={CLOSE} onClick={handleClear} hide={!(dates as Date[])?.length} disabled={disabled} />
        </div>
      </Container>
      {showAddOns && <ErrorMessage error={error} margin="5px 0 0 15px" />}
    </StyledDateRangePicker>
  );
}

export default forwardRef(DateRangePicker);
