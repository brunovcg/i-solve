import { useState, useRef, useMemo } from 'react';
import StyledDrawer from './Drawer.styled';
import { ButtonIcon, Icon, Tooltip } from '../../../../components';
import { useWindowDimensions, useOnClickOutside } from '../../../../hooks';
import { CONSTANTS } from '../../../../constants';
import { DrawerProps, OptionClickCallback } from './Drawer.types';
import { jsxHelper } from '../../../../helpers';

const { conditionalClasses } = jsxHelper;

function Drawer({ title, titleInitials, menu, initialSelection }: DrawerProps) {
  const { isMobileViewport } = useWindowDimensions();

  const [isCollapsedDrawer, setIsCollapsedDrawer] = useState(true);
  const [selectedOption, setSelectedOption] = useState(initialSelection ?? '');

  const handleCollapseDrawer = () => {
    setIsCollapsedDrawer((state) => !state);
  };

  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerTitle = isMobileViewport && isCollapsedDrawer ? titleInitials : title;
  const { ARROW_FORWARD_IOS, ARROW_BACK_IOS } = CONSTANTS.GOOGLE_ICONS;
  const icon = { type: isCollapsedDrawer ? ARROW_FORWARD_IOS : ARROW_BACK_IOS, margin: isCollapsedDrawer ? '0 0 0 2px' : '0 0 0 6px' };

  const handleOptionClick = (callback: OptionClickCallback, optionText: string) => {
    callback();
    setSelectedOption(optionText);
  };

  const drawerClasses = conditionalClasses({
    'im-drawer': true,
    'im-collapsed': isCollapsedDrawer,
    'im-drawer-mobile': isMobileViewport,
  });

  const tooltipClasses = (subItemText: string) =>
    conditionalClasses({
      'im-drawer-menu-option': true,
      'im-selected': selectedOption === subItemText,
    });

  const onClickOutside = () => {
    if (isMobileViewport && !isCollapsedDrawer) {
      setIsCollapsedDrawer(true);
    }
  };

  useOnClickOutside(drawerRef, onClickOutside);

  const optionRenderer = useMemo(
    () =>
      menu
        .filter((item) => item.permit)
        .map((item) => (
          <Tooltip
            key={item.id}
            content={item.text}
            side="right"
            trigger={
              <div className={tooltipClasses(item.text)} onClick={() => handleOptionClick(item.onClick, item.text)}>
                {item.icon && <Icon size="small" icon={item.icon} />}
                <div className="im-drawer-menu-option-text">{item.text}</div>
              </div>
            }
          />
        )),
    [menu]
  );

  return (
    <StyledDrawer className={drawerClasses} ref={drawerRef}>
      <ButtonIcon
        className="im-drawer-button-icon"
        color="var(--typeface-medium-color)"
        icon={icon.type}
        margin={icon.margin}
        onClick={handleCollapseDrawer}
      />
      {drawerTitle && <h3 className="im-drawer-title">{drawerTitle}</h3>}
      <section className="im-drawer-menu">{optionRenderer}</section>
    </StyledDrawer>
  );
}

export default Drawer;
