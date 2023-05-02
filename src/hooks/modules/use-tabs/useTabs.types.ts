type UseTabsModule = {
  name: string;
  component: JSX.Element;
};

export type UseTabsModules = UseTabsModule[];

export type StyledTabContainerRendererProps = { width?: string; height?: string };

export type UseTabsProps = {
  modules: UseTabsModules;
  initialSelection?: string;
  tabContainerSize?: StyledTabContainerRendererProps;
  tabsClassName?: string;
  tabsContainerClassName?: string;
};
