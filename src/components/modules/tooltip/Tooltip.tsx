import { StyledTooltip } from './Tooltip.styled';
import { TooltipProps } from './Tooltip.types';
import { Ref, useEffect, useState } from 'react';
import { SetTimeout } from '../../../types/';
import { usePopper, useWindowDimensions } from '../../../hooks';

export default function Tooltip({ trigger, content, side, delay = 1000 }: TooltipProps) {
  const { styles, attributes, setReferenceElement, setPopperElement } = usePopper({ side, offsetMargin: 5 });
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [delayHandler, setDelayHandler] = useState<SetTimeout>(null as unknown as SetTimeout);
  const [showTooltip, setShowTooltip] = useState(false);

  const { isMobileViewport } = useWindowDimensions();

  const handleOnMouseOver = () => setMouseIsOver(true);
  const handleOnMouseOut = () => setMouseIsOver(false);

  useEffect(() => {
    if (mouseIsOver) {
      setDelayHandler(
        setTimeout(() => {
          setShowTooltip(true);
        }, delay)
      );
    } else {
      clearTimeout(delayHandler);
      setShowTooltip(false);
    }

    return () => clearTimeout(delayHandler);
  }, [mouseIsOver]);

  return (
    <StyledTooltip
      ref={setReferenceElement as Ref<HTMLDivElement>}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseOut}
      onMouseOut={handleOnMouseOut}
    >
      <div className="im-tooltip-trigger">{trigger}</div>
      {showTooltip && !isMobileViewport && (
        <div className="im-tooltip-content" ref={setPopperElement as Ref<HTMLDivElement>} style={styles.popper} {...attributes.popper}>
          {content}
        </div>
      )}
    </StyledTooltip>
  );
}
