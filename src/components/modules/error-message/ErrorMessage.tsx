import { jsxHelper } from '../../../helpers';
import StyledErrorMessage from './ErrorMessage.styled';
import { ErrorMessageProps } from './ErrorMessage.types';

const { conditionalClasses } = jsxHelper;

export default function ErrorMessage({ error, className, width, hide = false, margin }: ErrorMessageProps) {
  const classes = conditionalClasses({
    ['im-error-message']: true,
    [className as string]: !!className,
  });

  return (
    <StyledErrorMessage width={width} className={classes} margin={margin}>
      {!hide && error}
    </StyledErrorMessage>
  );
}
