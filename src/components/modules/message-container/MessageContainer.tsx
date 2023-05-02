import { Icon, Container } from '../..';
import { CONSTANTS } from '../../../constants';
import { MessageContainerProps, MessageContainerVariants } from './MessageContainer.types';
import { jsxHelper } from '../../../helpers';
import StyledMessageContainer from './MessageContainer.styled';

const { INFO, WARNING, CANCEL, CHECK_CIRCLE } = CONSTANTS.GOOGLE_ICONS;
const { conditionalClasses } = jsxHelper;

export default function MessageContainer({ text, variant = 'info', className, width = '100%', fontSize }: MessageContainerProps) {
  const icon = {
    info: INFO,
    valid: CHECK_CIRCLE,
    warning: WARNING,
    error: CANCEL,
  };

  const isError = variant === 'error';
  const isValid = variant === 'valid';
  const isWarning = variant === 'warning';
  const isInfo = variant === 'info';

  const classes = conditionalClasses({
    ['im-container-info']: true,
    ['im-valid']: isValid,
    ['im-info']: isInfo,
    ['im-warning']: isWarning,
    ['im-error']: isError,
    [String(className)]: !!className,
  });

  const handleFontSize = () => {
    if (typeof fontSize === 'number') {
      return fontSize + 'px';
    }

    const sizes = {
      small: '11px',
      medium: '15px',
      large: '20px',
    };

    return sizes[(fontSize as keyof typeof sizes) ?? 'small'];
  };

  return (
    <StyledMessageContainer width={width} fontSize={handleFontSize()}>
      <Container className={classes} variant="light" error={isError} valid={isValid} warning={isWarning} primary={isInfo}>
        <div className="im-container-info-icon">
          <Icon icon={icon[String(variant) as MessageContainerVariants]} />
        </div>
        <div className="im-container-info-text">{text}</div>
      </Container>
    </StyledMessageContainer>
  );
}
