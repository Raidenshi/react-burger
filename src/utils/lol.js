const createList = (el, i) => {
  const checkInMiddle = i > 0 && i !== addedIngredients.length - 1;
  let constructorProps = {
    text: el.name,
    price: el.price,
    thumbnail: el.image,
  };
  if (i === 0) {
    constructorProps = {
      ...constructorProps,
      type: 'top',
      text: `${el.name} (верх)`,
      isLocked: true,
    };
  } else if (i === addedIngredients.length - 1) {
    constructorProps = {
      ...constructorProps,
      type: 'bottom',
      text: `${el.name} (низ)`,
      isLocked: true,
    };
  }
  return (
    <li
      className={
        checkInMiddle ? constructorStyles.item : constructorStyles.item_bun
      }
      key={`${el._id}${i}`}
    >
      {checkInMiddle && <DragIcon type="primary" />}
      <ConstructorElement {...constructorProps} />
    </li>
  );
};
