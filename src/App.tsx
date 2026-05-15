import "./style.css";
import Todo from "./components/Todo.tsx";
import AddForm from "./components/AddForm.tsx";
import CategoryTab from "./components/CategoryTab.tsx";
import RenameCategoryModal from "./components/RenameCategoryModal.tsx";
import ChangeLimitModal from "./components/ChangeLimitModal.tsx";
import CalendarModal from "./components/CalendarModal.tsx";
import useTodos from "./hooks/useTodos.ts";
import useCategories from "./hooks/useCategories.ts";
import useCalendar from "./hooks/useCalendar.ts";

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
    isLimitModalAnimate,
    isLimitModalVisible,
  } = useTodos();

  const {
    categories,
    nowSelectedCategoryId,
    nameChangeCategoryId,
    handleCategorySelected,
    renameCategory,
    handleLongPress,
    timerStop,
    isRenameModalAnimate,
    isRenameModalVisible,
  } = useCategories();

  const {
    dispPeriod,
    dispCategory,
    calendarRefs,
    thisMonthHolidays,
    handleCalendarDisp,
    handleDispPeriodChange,
    handleDispCategoryChange,
    isCalendarModalAnimate,
    isCalendarModalVisible,
  } = useCalendar();

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
        handleLongPress={handleLongPress}
        timerStop={timerStop}
      />
    );
  });

  return (
    <div className="container">
      {isRenameModalVisible && (
        <RenameCategoryModal
          nameChangeCategoryId={nameChangeCategoryId}
          categories={categories}
          onSubmit={renameCategory}
          isOpen={isRenameModalAnimate}
        />
      )}
      {isLimitModalVisible && (
        <ChangeLimitModal
          todos={todos}
          limitChangeItemId={limitChangeItemId}
          onSubmit={handleLimitsChanged}
          isOpen={isLimitModalAnimate}
        />
      )}
      {isCalendarModalVisible && (
        <CalendarModal
          isOpen={isCalendarModalAnimate}
          onClose={handleCalendarDisp}
          dispPeriod={dispPeriod}
          onArrowClicked={handleDispPeriodChange}
          categories={categories}
          dispCategory={dispCategory}
          onCheckboxChange={handleDispCategoryChange}
          calendarRefs={calendarRefs}
          thisMonthHolidays={thisMonthHolidays}
          todos={todos}
        />
      )}
      <h1>
        <div className="header-title">Todos</div>
        <button onClick={handleCalendarDisp}>カレンダーを表示</button>
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
