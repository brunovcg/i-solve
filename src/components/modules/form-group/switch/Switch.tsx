import { SwitchProps } from './Switch.types';
import { useState, useContext } from 'react';
import { FormContext } from '../form/Form';
import * as RadixSwitch from '@radix-ui/react-switch';
import { jsxHelper } from '../../../../helpers';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import './Switch.scss';

const { conditionalClasses } = jsxHelper;

export default function Switch({ checked, name, onChange, loading, className, leftLabel, rightLabel, disabled }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);
  const { setValue } = useContext(FormContext);

  const isHookForm = !!name;

  const handleChange = () => {
    setIsChecked((state) => !state);
    onChange(!isChecked);

    if (isHookForm) {
      setValue(name, !isChecked);
    }
  };

  const switchClasses = conditionalClasses({
    ['im-switch']: true,
    ['im-disabled']: disabled,
    [className as string]: !!className,
  });

  const renderer = () => {
    if (loading) {
      return <div className={switchClasses}>{<LoadingSpinner size="small" />}</div>;
    }

    return (
      <RadixSwitch.Root disabled={disabled} checked={isChecked} className="im-switch-root" onClick={handleChange}>
        <RadixSwitch.Thumb className="im-switch-thumb" />
      </RadixSwitch.Root>
    );
  };

  return (
    <div className={switchClasses}>
      {leftLabel && <div className="im-switch-label">{leftLabel}</div>}
      {renderer()}
      {rightLabel && <div className="im-switch-label">{rightLabel}</div>}
    </div>
  );
}
