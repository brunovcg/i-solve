import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';

const routesFormatted = () => {
  const keys = Object.keys(routes);

  return keys.reduce((acc, current: string) => {
    const currentRoute = routes[current as keyof typeof routes];

    if (typeof currentRoute === 'string') {
      acc.push({ path: currentRoute });
      return acc;
    }
    const { path } = currentRoute;
    acc.push({ path });
    return acc;
  }, [] as { path: string }[]);
};

export default function useRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  // Router dom does not provide this type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [{ route }]: any = matchRoutes(routesFormatted(), location);

  const addRouteSearch = (hash: string) => navigate(`${location.pathname}?${hash}`);
  const removeRouteSearch = () => navigate(location.pathname);
  const getRouteSearch = () => window.location.search.replace('?', '');

  return { addRouteSearch, removeRouteSearch, currentRoutePath: route.path, getRouteSearch };
}
