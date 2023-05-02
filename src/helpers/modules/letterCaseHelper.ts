const letterCaseHelper = {
  snakeToCapitalize(string?: string | null) {
    if (!string) {
      return '';
    }
    return string
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
  capitalize(string?: string) {
    if (!string) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};

export default letterCaseHelper;
