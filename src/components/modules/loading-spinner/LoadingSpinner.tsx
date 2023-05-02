import StyledLoadingSpinner from './LoadingSpinner.styled';
import { LoadingSpinnerProps } from './LoadingSpinner.types';
import ImLogoAnimation from '../im-logo-animation/ImLogoAnimation';
import { jsxHelper } from '../../../helpers';

const { conditionalClasses } = jsxHelper;

export default function LoadingSpinner({ message, size = 'medium', className }: LoadingSpinnerProps) {
  const classes = conditionalClasses({
    ['im-loading-spinner']: true,
    [className as string]: !!className,
  });

  return (
    <StyledLoadingSpinner className={classes}>
      <ImLogoAnimation size={size} />
      {message && <div className="im-loading-spinner-message">Carregando</div>}
    </StyledLoadingSpinner>
  );
}
