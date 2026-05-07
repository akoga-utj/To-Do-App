import "./style.css";
import Todo from "./components/Todo.tsx";
import AddForm from "./components/AddForm.tsx";
import CategoryTab from "./components/CategoryTab.tsx";
import useTodos from "./hooks/useTodos.ts";
import useCategories from "./hooks/useCategories.ts";

const App = () => {
  type Todo_item = {
    id: number;
    title: string;
    refCategoryId: number;
    isCompleted: boolean;
  };

  const {
    todos,
    handleRefCategoryChanged,
    handlePurgeClick,
    handleAddFormSubmit,
    handleTodoChecked,
    handleTodoDeleteClick,
  } = useTodos();

  const { categories, nowSelectedCategoryId, handleCategorySelected } =
    useCategories();

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
      />
    );
  });

  return (
    <div className="container">
      <h1>
        Todos
        <button onClick={handlePurgeClick}>Purge</button>
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
