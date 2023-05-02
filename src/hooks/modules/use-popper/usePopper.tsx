import { useState } from 'react';
import { usePopper as popperUsePopper } from 'react-popper';
import { UsePopperProps } from './usePopper.types';

function usePopper({ side, position = 'fixed', offsetMargin = 0 }: UsePopperProps = {}) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = popperUsePopper(referenceElement, popperElement, {
    placement: side,
    strategy: position,
    modifiers: [
      { name: 'offset', options: { offset: [0, offsetMargin] } },
      {
        name: 'preventOverflow',
        options: {
          rootBoundary: 'viewport',
          tether: false,
          altAxis: true,
        },
      },
    ],
  });

  return { setReferenceElement, setPopperElement, styles, attributes };
}

export default usePopper;
