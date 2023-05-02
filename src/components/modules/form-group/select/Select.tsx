import StyledSelect from './Select.styled';
import {
  useContext,
  useState,
  useMemo,
  ForwardedRef,
  useImperativeHandle,
  forwardRef,
  Ref,
  useEffect,
  useRef,
  MouseEvent,
  ChangeEvent,
  MutableRefObject,
} from 'react';
import { SelectProps, SelectRef } from './Select.types';
import { FormContext } from '../form/Form';
import { ButtonIcon, Input, Chip, Icon, Container, LoadingSpinner, ErrorMessage } from '../../../../components';
import { CONSTANTS } from '../../../../constants';
import { jsxHelper } from '../../../../helpers';
import { toast } from 'react-toastify';
import Checkbox from '../checkbox/Checkbox';
import { useOnClickOutside, usePopper, useElementSize } from '../../../../hooks';

const { CLOSE, EXPAND_MORE, EXPAND_LESS, UNDO } = CONSTANTS.GOOGLE_ICONS;

const { conditionalClasses } = jsxHelper;

function Select(
  {
    label,
    placeholder,
    multiple = false,
    accessor,
    disabled = false,
    canClear = true,
    canReset = true,
    maxWidth,
    width,
    height,
    errorMessage,
    maxSelections,
    chipColor,
    options,
    className,
    initialValue,
    name,
    loading,
    canSearch = true,
    listMaxHeight,
    onChange,
    optionalLabel,
  }: SelectProps,
  ref?: ForwardedRef<SelectRef>
) {
  const [typedSearch, setTypedSearch] = useState('');
  const [onlySelectedOptions, setOnlySelectedOptions] = useState(false);
  const [outputValues, setOutputValues] = useState<object[]>(initialValue ?? ([] as object[]));
  const { styles, attributes, setReferenceElement, setPopperElement } = usePopper();
  const [showList, setShowList] = useState(false);
  const { setValue, errors } = useContext(FormContext);
  const selectionListWrapperRef = useRef<HTMLDivElement>(null);
  const isHookForm = !!name;
  const reachedMaxValuesSelected = maxSelections ? maxSelections <= outputValues.length : false;
  const hasOutputValues = !!outputValues.length;
  const outputValuesMapped: (string | number)[] = useMemo(
    () => outputValues.map((item) => item?.[accessor as keyof object]),
    [outputValues]
  );

  const isResettable = !!initialValue && JSON.stringify(initialValue) !== JSON.stringify(outputValues);

  const clearSelectValues = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setOutputValues([]);
  };

  const resetSelectValues = () => {
    setOutputValues(initialValue ?? []);
  };

  useImperativeHandle(ref, () => ({ resetSelectValues, clearSelectValues }));

  const canOpenList = showList && !disabled && !loading;

  const selectOption = (option: object) => {
    if (reachedMaxValuesSelected) {
      return toast.warn('Máximo Selecionado');
    }

    if (multiple) {
      setOutputValues((state) => [...state, option]);
      if (isHookForm) {
        setValue(name, [...outputValues, option]);
      }
      return;
    }
    setOutputValues([option]);
  };

  useOnClickOutside(selectionListWrapperRef, () => setShowList(false));

  const unselectOption = (option: object) => {
    if (multiple) {
      const updatedOptions = outputValues.filter((item) => item?.[accessor as keyof object] !== option?.[accessor as keyof object]);

      setOutputValues(updatedOptions);
      if (isHookForm) {
        setValue(name, updatedOptions);
      }
      return;
    }
    setOutputValues(() => []);
  };

  const handleClickOption = (option: object, isSelected: boolean) => (isSelected ? unselectOption(option) : selectOption(option));

  const handleSearch = (inputValue: string) => setTypedSearch(inputValue);

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => setOnlySelectedOptions(e.target.checked);

  const filteredOptions = useMemo(
    () =>
      (Array.isArray(options) ? options : []).filter((option) => {
        const currentOption = String(option[accessor as keyof typeof option]);
        const currentIsSelected = onlySelectedOptions ? outputValuesMapped.includes(currentOption) : true;

        return currentOption?.toLowerCase().includes(typedSearch?.toLowerCase()) && currentIsSelected;
      }),
    [typedSearch, options, onlySelectedOptions]
  );

  const error = outputValues.length ? '' : errorMessage ?? (errors?.[String(name)]?.message as string);

  const removeOptionFromOutput = (optionValue: string) => {
    const updatedOption = [...outputValues].filter((item) => item?.[accessor as keyof object] !== optionValue);
    setOutputValues(updatedOption);
  };

  const displayValuesClasses = conditionalClasses({
    ['im-select-display']: true,
    ['im-select-display-placeholder']: !hasOutputValues,
  });

  const selectionListWrapperClasses = conditionalClasses({
    ['im-select-option-list-wrapper']: true,
  });

  const optionClasses = (isSelected: boolean) =>
    conditionalClasses({
      ['im-select-option']: true,
      ['im-select-option-selected']: isSelected,
    });

  const selectClasses = conditionalClasses({
    ['im-select']: true,
    ['im-open']: showList,
    ['im-closed']: !showList,
    ['im-loading']: loading,
    ['im-disabled']: disabled,
    [className as string]: !!className,
  });

  const handleChipColor = useMemo(() => {
    if (typeof chipColor !== 'string') {
      return {
        custom: chipColor?.[outputValues[0]?.[accessor as keyof (typeof outputValues)[0]]] ?? 'var(--primary-color)',
      };
    } else if (chipColor) {
      return { custom: chipColor };
    }
    return 'primary';
  }, [chipColor, outputValues]);

  const displayRenderer = useMemo(() => {
    if (!hasOutputValues) {
      if (disabled) {
        return '';
      }
      if (loading) {
        return 'Carregando';
      }
      if (showList) {
        return 'Clique para selecionar';
      }
      return placeholder;
    }
    const firstOptionSelected = outputValues[0]?.[accessor as keyof object] ?? [];
    const hasTwoOrMoreSelections = outputValues.length > 1;
    const restOfOptions = outputValues.length - 1;
    const handleChipCloseButton = multiple && !disabled ? () => removeOptionFromOutput(firstOptionSelected) : undefined;

    return (
      <>
        <Chip variant={handleChipColor} size="small" text={firstOptionSelected} onCloseButton={handleChipCloseButton} disabled={disabled} />
        {hasTwoOrMoreSelections && <div className="im-select-rest-options">{`+${restOfOptions}`}</div>}
      </>
    );
  }, [outputValues, loading, disabled, showList]);

  const iconsRenderer = () => {
    if (disabled) return null;
    if (loading) return <LoadingSpinner size="small" />;
    if (showList) {
      return <Icon icon={EXPAND_LESS} />;
    }
    return <Icon icon={EXPAND_MORE} />;
  };

  const listRenderer = (option: object) => {
    const outputValueAccessor = option[accessor as keyof object];
    const isSelected = outputValuesMapped.includes(outputValueAccessor);
    return (
      <div
        key={option[accessor as keyof object]}
        onClick={() => {
          if (disabled) {
            return;
          }
          handleClickOption(option, isSelected);
          if (!multiple) {
            setShowList(false);
          }
        }}
        className={optionClasses(isSelected)}
      >
        {option[accessor as keyof object]}
      </div>
    );
  };

  useEffect(() => {
    onChange?.(outputValues);
  }, [outputValues]);

  const labelRenderer = (
    <>
      <span>{label} </span> {multiple && <span className="im-multiselect">Multiplo</span>}
    </>
  );

  const displayRef = useRef<HTMLDivElement>(null);
  const { elementSize } = useElementSize(displayRef as MutableRefObject<HTMLElement>);

  return (
    <StyledSelect
      className={selectClasses}
      canClear={canClear}
      listMaxHeight={listMaxHeight}
      width={width}
      maxWidth={maxWidth}
      listWidth={elementSize.width}
      height={height}
      ref={selectionListWrapperRef}
    >
      <Container
        ref={setReferenceElement as Ref<HTMLDivElement>}
        onClick={() => {
          if (disabled) {
            return;
          }
          setShowList((state) => !state);
        }}
        label={labelRenderer}
        hoverable={!showList}
        error={!!error}
        disabled={disabled}
        focus={showList}
        variant="white"
        optionalLabel={optionalLabel}
      >
        <div className={displayValuesClasses} ref={displayRef}>
          <div className="im-select-display-values">{displayRenderer}</div>
          <div className="im-select-display-icons">
            {canReset && (
              <ButtonIcon
                icon={UNDO}
                onClick={resetSelectValues}
                disabled={disabled}
                error={!!error}
                hide={!outputValues.length || disabled || !isResettable}
                size="small"
              />
            )}
            {canClear && (
              <ButtonIcon
                icon={CLOSE}
                onClick={clearSelectValues}
                disabled={disabled}
                error={!!error}
                hide={!outputValues.length || disabled}
                size="small"
              />
            )}
            {iconsRenderer()}
          </div>
        </div>
      </Container>
      {canOpenList && (
        <div
          className={selectionListWrapperClasses}
          ref={setPopperElement as Ref<HTMLDivElement>}
          style={styles.popper}
          {...attributes.popper}
        >
          {canSearch && (
            <div className="im-select-search-wrapper">
              <Input placeholder="Buscar" onChange={handleSearch} showAddOns={false} />
            </div>
          )}
          {multiple && (
            <div className="im-selection-checkbox-wrapper">
              <Checkbox label="Mostrar apenas selecionados" onChange={handleCheckbox} />
            </div>
          )}
          <div className="im-selection-option-list">
            {filteredOptions?.map((option) => listRenderer(option))}
            {!filteredOptions.length && <div className="im-select-no-matches">Resultados não encontrados</div>}
          </div>
        </div>
      )}
      <ErrorMessage error={error} hide={disabled} margin="5px 0 0 15px" />
    </StyledSelect>
  );
}

export default forwardRef(Select);
