import { useTabs } from '../../../hooks';
import { DashboardLayoutProps } from './DashboardLayout.types';
import './DashboardLayout.scss';

export default function DashboardLayout({ modules }: DashboardLayoutProps) {
  const { tabsRenderer, tabContainerRenderer } = useTabs({ modules });

  return (
    <div className="im-dashboard-layout">
      {tabsRenderer}

      <div className="im-dashboard-layout-content"> {tabContainerRenderer}</div>
      <div id="im-dashboard-footer" />
    </div>
  );
}
