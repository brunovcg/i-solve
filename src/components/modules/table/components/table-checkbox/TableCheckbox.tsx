/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useRef, useEffect, RefObject } from 'react';
import { Checkbox } from '../../../../../components';
import { TableCheckboxProps } from '../../root-component/Table.types';

const TableCheckbox = forwardRef(({ indeterminate, label, ...rest }: TableCheckboxProps, ref) => {
  const defaultRef = useRef<HTMLInputElement>();
  const resolvedRef: any = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <Checkbox label={label} ref={resolvedRef as RefObject<HTMLInputElement>} {...rest} />;
});

TableCheckbox.displayName = 'Checkbox';

export default TableCheckbox;
