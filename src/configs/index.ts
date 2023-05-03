const configs = {
  reactQuery: {
    devTools: {
      initialIsOpen: false,
      position: 'bottom-right',
    },
  },
  permissions: {
    Customer: { complain: true, inbox: false },
    User: { complain: false, inbox: true },
  },
  toastConfigs: {
    position: 'bottom-center',
    autoClose: 6000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    pauseOnHover: true,
  },
  resolutions: {
    mobileBreakpoint: '420px', // must be set as a string using pixels e.g. '400px'
    maxResolution: '2500px', // must be set as a string using pixels e.g. '400px'
  },
  zIndexes: {
    dashboard: {
      mobileDrawer: 20,
    },
    tooltip: 200,
    autocomplete: 10,
    select: 200,
    popover: { component: 1, content: 2 },
    table: {
      thead: 10,
      tbody: -1,
    },
  },
} as const;

export { configs };
