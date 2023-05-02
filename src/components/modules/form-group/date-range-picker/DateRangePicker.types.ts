export type DatePickerDates = string | Date | Date[] | null | undefined;

export type StyledDateRangePickerProps = {
  height?: string;
  width?: string;
};

export type DateRangePickerProps = StyledDateRangePickerProps & {
  placeholder?: string;
  onSelect: (dates: DatePickerDates) => void;
  name?: string;
  errorMessage?: string;
  showAddOns?: boolean;
  label?: string;
  disabled?: boolean;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  optionalLabel?: boolean;
};

export type DateRangePickerRef = {
  resetDateRangePicker: () => void;
};
