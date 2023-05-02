import { StyledDoubleLogoAnimation, StyledSingleLogoAnimation } from './ImLogoAnimation.styled';
import BLUE_GEAR from '../../../assets/images/small_gear.png';
import RED_GEAR from '../../../assets/images/big_gear.png';
import { ImLogoAnimationProps } from './ImLogoAnimationProps.types';
import { jsxHelper } from '../../../helpers';

const { conditionalClasses } = jsxHelper;

export default function ImLogoAnimation({ size = 'medium' }: ImLogoAnimationProps) {
  const doubleGearClasses = conditionalClasses({
    ['im-double-gear-animation']: true,
    ['im-double-gear-large']: size === 'large',
    ['im-double-gear-medium']: size === 'medium',
  });

  const doubleGearAnimation = (
    <StyledDoubleLogoAnimation className={doubleGearClasses}>
      <img className=" im-small-gear" src={BLUE_GEAR} alt="" />
      <img className=" im-large-gear" src={RED_GEAR} alt="" />
    </StyledDoubleLogoAnimation>
  );

  const singleGearAnimation = (
    <StyledSingleLogoAnimation className="im-single-gear-animation">
      <img className="im-single-gear" src={RED_GEAR} alt="" />
    </StyledSingleLogoAnimation>
  );

  return size === 'small' ? singleGearAnimation : doubleGearAnimation;
}
