import "../style.css";
import React from "react";

const RenameCategoryForm = (props: any) => {
  if (props.nameChangeCategoryId === null) {
    setTimeout(() => {
      return null;
    }, 500);
  }
  const oldCategoryName: string =
    props.categories[props.nameChangeCategoryId].name;
  const [newCategoryName, setNewCategoryName] = React.useState<string | null>(oldCategoryName);

  const handleFormContent = (e: React.ChangeEvent<HTMLInputElement | null>) => {
    setNewCategoryName(e.currentTarget.value);
  };
  return (
    <>
      <div className="modal">
        <div className={`modal-msgspace ${props.isOpen ? "open" : ""}`}>
          新しいカテゴリー名を入力してください
          <input
            type="text"
            value={newCategoryName ?? ""}
            onChange={handleFormContent}
          ></input>
          <div className="form-button-place">
          <button id="cancel"
            onClick={() => {
              props.onSubmit("", 0);
            }}
          >
            キャンセル
          </button>
          <button id="save"
            onClick={() => {
              props.onSubmit(newCategoryName, props.nameChangeCategoryId);
            }}
          >
            保存
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenameCategoryForm;
