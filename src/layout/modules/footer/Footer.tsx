import StyledFooter from './Footer.styled';

import { useWindowDimensions} from '../../../hooks';

export default function Footer() {
  const { isMobileViewport } = useWindowDimensions();

  return (
    <StyledFooter className="im-footer">
      <span>iSolve</span>
      {!isMobileViewport && <span>&nbsp;|&nbsp;</span>}
      <span>iSolve Participação Ltda.</span>
    </StyledFooter>
  );
}
