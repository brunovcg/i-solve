import { CONSTANTS } from '../../../constants';
import * as RadixPopover from '@radix-ui/react-popover';
import { StyledPopoverContent, StyledPopoverTrigger, StyledPopover } from './Popover.styled';
import { PopoverProps } from './Popover.types';
import { configs } from '../../../configs';
import Icon from '../icon/Icon';

const { CLOSE } = CONSTANTS.GOOGLE_ICONS;
const { zIndexes } = configs;

export default function Popover({
  title,
  trigger,
  content,
  width,
  contentStyle,
  showBorder = true,
  side = 'bottom',
  align = 'end',
}: PopoverProps) {
  return (
    <StyledPopover width={width} className="im-popover" style={{ zIndex: zIndexes.popover.component }}>
      <RadixPopover.Root>
        <RadixPopover.Trigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <StyledPopoverTrigger className="im-popover-trigger" showBorder={showBorder} aria-label="Update dimensions">
            <div>{trigger}</div>
          </StyledPopoverTrigger>
        </RadixPopover.Trigger>

        <RadixPopover.Content
          style={{ zIndex: zIndexes.popover.content }}
          sideOffset={3}
          align={align}
          side={side}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <StyledPopoverContent className="im-popover-content-wrapper" contentStyle={contentStyle}>
            <RadixPopover.Close asChild>
              <div className="im-popover-close-button" aria-label="Close" style={{ cursor: 'pointer' }}>
                <Icon icon={CLOSE} color="var(--typeface-medium-color)" className="im-popover-close-icon" />
              </div>
            </RadixPopover.Close>
            {title && <div className="im-popover-title">{title}</div>}
            <div className="im-popover-content">{content}</div>
          </StyledPopoverContent>
        </RadixPopover.Content>
      </RadixPopover.Root>
    </StyledPopover>
  );
}
