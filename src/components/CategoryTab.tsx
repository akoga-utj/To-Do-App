import "../style.css";

const CategoryTab = (props: any) => {
  let buttonClassName: string = "category";
  if(props.nowSelectedCategoryId === props.category.id){
    buttonClassName = "category categorySelected";
  }
  
  return (
    <>
    <button
    className = {buttonClassName}
    onClick={() => {props.onTabChange(props.category.id)}}
    >
      {props.category.name}
    </button>
    </>
  );
}

export default CategoryTab;