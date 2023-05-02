import { useMemo, useState } from 'react';
import { jsxHelper } from '../../../helpers';
import { StyledTabContainerRenderer, StyledTabsRenderer } from './useTabs.styled';
import { UseTabsModules, UseTabsProps } from './useTabs.types';

const { conditionalClasses } = jsxHelper;

const initialModule = (modules: UseTabsModules, initialSelection?: string) => {
  if (initialSelection) {
    return modules.find((module) => module.name === initialSelection)?.name;
  }

  return modules[0].name;
};

export default function useTabs({ modules, initialSelection, tabContainerSize, tabsClassName, tabsContainerClassName }: UseTabsProps) {
  const [selectedModule, setSelectedModule] = useState(initialModule(modules, initialSelection) as string);

  const selectedModuleContainer = modules.find((module) => module.name === selectedModule)?.component;

  const tabsClasses = conditionalClasses({
    ['im-tabs']: true,
    [tabsClassName as string]: !!tabsClassName,
  });

  const tabsOptionClasses = (name: string) =>
    conditionalClasses({
      ['im-tabs-module-option']: true,
      ['im-selected']: name === selectedModule,
    });

  const tabsRendererContainerClasses = conditionalClasses({
    ['im-tabs-renderer-container']: true,
    [tabsContainerClassName as string]: !!tabsContainerClassName,
  });

  const tabsRenderer = (
    <StyledTabsRenderer className={tabsClasses}>
      {modules.map((module) => (
        <div className={tabsOptionClasses(module.name)} key={module.name} onClick={() => setSelectedModule(module.name)}>
          {module.name}
        </div>
      ))}
    </StyledTabsRenderer>
  );

  const tabContainerRenderer = (
    <StyledTabContainerRenderer width={tabContainerSize?.width} height={tabContainerSize?.height} className={tabsRendererContainerClasses}>
      {selectedModuleContainer}
    </StyledTabContainerRenderer>
  );

  return useMemo(() => ({ tabsRenderer, tabContainerRenderer }), [{ tabsRenderer, tabContainerRenderer }]);
}
