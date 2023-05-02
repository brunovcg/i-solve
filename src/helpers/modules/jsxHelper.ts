const jsxHelper = {
  conditionalClasses(object: object) {
    const keys = Object.keys(object);
    return keys.reduce((acc: string, current: string) => {
      if (object[current as keyof object]) {
        acc += acc ? ` ${current}` : `${current}`;
      }
      return acc;
    }, '');
  },
};

export default jsxHelper;
