import dayjs from 'dayjs';

const dateFormats = {
  dateAndHour: 'MM/DD/YYYY - hh:MM A',
  dateUrl: 'MM-DD-YYYY',
};

const dateHelper = {
  formatDate(date?: string | Date, format?: [keyof typeof dateFormats]) {
    if (!date) {
      return '';
    }
    const day = dayjs(date);
    return day.format(dateFormats?.[format as unknown as keyof typeof dateFormats] ?? dateFormats.dateAndHour);
  },
  subtractDays(date: string, days: number) {
    const day = dayjs(date);

    return day.subtract(days, 'days').format('MM-DD-YYYY');
  },
};

export default dateHelper;
