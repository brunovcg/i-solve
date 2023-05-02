const routes = {
  dashboard: { path: 'dashboard' },
  notFound: { path: '*' },
  login: { path: '' },
  welcome: { path: '/dashboard' },
  accessControl: { path: '/dashboard/access-control' },
  processRunner: { path: '/dashboard/process-runner' },
  complain: { path: '/dashboard/complain' },
};

export { routes };
