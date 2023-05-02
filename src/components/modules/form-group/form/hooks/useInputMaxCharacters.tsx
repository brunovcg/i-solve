export default function useInputMaxCharacters(isMaxLengthSet: boolean, isDisabled: boolean, remainingCharacters = 0) {
  const renderRemainingCharacters = () => {
    if (!isMaxLengthSet) {
      return null;
    }

    const formatQuantity = (quantity: number) => (
      <p>
        <span>Caracteres</span>
        <span className={quantity === 0 ? 'im-input-no-quantity' : ''}>{quantity}</span>
      </p>
    );

    if (isDisabled) {
      return formatQuantity(0);
    }

    return formatQuantity(remainingCharacters ?? 0);
  };

  const getRemainingAmount = () => {
    if (!isMaxLengthSet) {
      return true;
    }
    if ((remainingCharacters ?? 0) > 0) {
      return true;
    }
    return false;
  };

  return { getRemainingAmount, renderRemainingCharacters };
}
