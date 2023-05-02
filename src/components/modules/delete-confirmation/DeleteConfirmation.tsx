import { useRef, useState } from 'react';
import { ButtonIcon } from '../..';
import { CONSTANTS } from '../../../constants';
import { useOnClickOutside } from '../../../hooks';
import { DeleteConfirmationProps } from './DeleteConfirmationTypes';
import './DeleteConfirmation.scss';

const { CLOSE, CHECK, DELETE } = CONSTANTS.GOOGLE_ICONS;

export default function DeleteConfirmation({ onDelete }: DeleteConfirmationProps) {
  const [selected, setSelected] = useState(false);
  const DeleteConfirmationRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(DeleteConfirmationRef, () => setSelected(false));

  const renderer = () => {
    if (selected) {
      return (
        <>
          <ButtonIcon icon={CHECK} label="Confirmar" variant="valid" onClick={onDelete} />
          <ButtonIcon icon={CLOSE} label="Cancelar" variant="error" onClick={() => setSelected(false)} />
        </>
      );
    }
    return <ButtonIcon icon={DELETE} onClick={() => setSelected(true)} variant="error" />;
  };

  return (
    <div className="im-global-centered im-delete-confirmation" ref={DeleteConfirmationRef}>
      {renderer()}
    </div>
  );
}
