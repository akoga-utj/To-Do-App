import "../style.css";

const CategoryTab = (props: any) => {
  let backgroundStyle: string = "#ffffff";
  if (props.nowSelectedCategoryId === props.category.id) {
    switch(props.nowSelectedCategoryId) {
      case 0:
        backgroundStyle = "#d4e1f5";
        break;
      case 1:
        backgroundStyle = "#ffe4e1";
        break;
      case 2:
        backgroundStyle = "#e0ffe0";
        break;
      case 3:
        backgroundStyle = "#ffffe0";
        break;
    }
  }

  return (
    <button
      className="category"
      style={{backgroundColor: backgroundStyle}}
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
