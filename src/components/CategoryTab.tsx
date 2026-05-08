import "../style.css";

const CategoryTab = (props: any) => {
  let buttonClassName: string = "category";
  if (props.nowSelectedCategoryId === props.category.id) {
    buttonClassName = "category categorySelected";
  }

  return (
    <button
      className={buttonClassName}
      onMouseDown={() => {
        props.onTabChange(props.category.id);
        props.handleLongPress(props.category.id);
      }}
      onMouseUp={props.timerStop}
    >
      {props.category.name}
    </button>
  );
};

export default CategoryTab;
