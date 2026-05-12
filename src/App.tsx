import "./style.css";
import Todo from "./components/Todo.tsx";
import AddForm from "./components/AddForm.tsx";
import CategoryTab from "./components/CategoryTab.tsx";
import RenameCategoryForm from "./components/RenameCategoryForm.tsx";
import ChangeLimit from "./components/ChangeLimit.tsx";
import useTodos from "./hooks/useTodos.ts";
import useCategories from "./hooks/useCategories.ts";

const App = () => {
  type Todo_item = {
    id: number;
    title: string;
    refCategoryId: number;
    isCompleted: boolean;
    isLimited: boolean;
    limits: {
      year: number;
      month: number;
      day: number;
    } | null;
  };

  const {
    todos,
    limitChangeItemId,
    handleRefCategoryChanged,
    handlePurgeClick,
    handleAddFormSubmit,
    handleTodoChecked,
    handleTodoDeleteClick,
    handleLimitsChanged,
    handleDispChangeLimit,
  } = useTodos();

  const { 
    categories, 
    nowSelectedCategoryId, 
    nameChangeCategoryId, 
    handleCategorySelected, 
    renameCategory, 
    handleLongPress,
    timerStop,
  } = useCategories();

  //Todoアイテム要素をカテゴリー判断して描写
  const TodoItems = todos.map((todo: Todo_item) => {
    if (
      todo.refCategoryId === nowSelectedCategoryId ||
      nowSelectedCategoryId === 0
    ) {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          categories={categories}
          onCategoryChange={handleRefCategoryChanged}
          onDeleteClick={handleTodoDeleteClick}
          onCheckboxChange={handleTodoChecked}
          onLimitsChange={handleLimitsChanged}
          onIconClick={handleDispChangeLimit}
        />
      );
    }
  });

  //カテゴリータブ要素を描写
  const CategoryTabs = categories.map((category: any) => {
    return (
      <CategoryTab
        key={category.id}
        category={category}
        onTabChange={handleCategorySelected}
        nowSelectedCategoryId={nowSelectedCategoryId}
        handleLongPress = {handleLongPress}
        timerStop = {timerStop}
      />
    );
  });

  return (
    <div className="container">
      {nameChangeCategoryId !== null && 
      <RenameCategoryForm 
      nameChangeCategoryId = {nameChangeCategoryId} 
      categories = {categories} 
      onSubmit = {renameCategory}
      />}
      {limitChangeItemId !== null && 
      <ChangeLimit 
        todos = {todos}
        limitChangeItemId = {limitChangeItemId}
        onSubmit = {handleLimitsChanged}
      />}
      <h1>
        Todos
        <button onClick={handlePurgeClick}>一括削除</button>
      </h1>
      <div className="categoryTabs">{CategoryTabs}</div>
      <ul id="todos">{TodoItems}</ul>
      <AddForm
        onSubmit={handleAddFormSubmit}
        categories={categories}
        nowSelectedCategoryId={nowSelectedCategoryId}
      />
    </div>
  );
};

export default App;
