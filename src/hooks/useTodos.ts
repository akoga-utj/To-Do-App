import React from "react";

const useTodos = () => {
  type Todo_item = {
    id: number;
    title: string;
    refCategoryId: number;
    isCompleted: boolean;
  };

  const [todos, setTodos] = React.useState<Todo_item[]>([
    // {id: 0, title: 'aaa', isCompleted: false, refCategoryId: 0},
  ]);

  React.useEffect(() => {
    let parseTodos: Todo_item[];
    let saved = localStorage.getItem("todos");
    // jsonParseの引数としてlocalStorage.getItem('todos')を渡しても、ifの条件文と別物と見なされるため、わざわざ変数を別個で用意することが必要

    if (saved === null) {
      parseTodos = [];
    } else {
      parseTodos = JSON.parse(saved);
    }

    setTodos(parseTodos);
  }, []);

  //Todoリスト更新時の共通処理
  const updateTodos = (newTodos: Todo_item[]) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  //Todoアイテムの参照先カテゴリーを変更し、Todoアイテムリストを更新
  const handleRefCategoryChanged = (
    ItemId: number,
    newRefCategoryId: number,
  ) => {
    const newTodos = todos.map((todo: Todo_item) => {
      if (todo.id === ItemId) {
        return {
          id: todo.id,
          title: todo.title,
          refCategoryId: newRefCategoryId,
          isCompleted: todo.isCompleted,
        };
      } else {
        return todo;
      }
    });
    updateTodos(newTodos);
  };

  //Purgeボタンが押されたとき、チェックが付いているTodoアイテムをまとめて削除する。
  const handlePurgeClick = () => {
    const newTodos = todos.filter((todo: Todo_item) => {
      return !todo.isCompleted;
    });

    if (confirm("Sure?")) {
      updateTodos(newTodos);
    }
  };

  //フォームの内容を受け取り、Todoリストに追加する。
  const handleAddFormSubmit = (title: string, categoryId: number) => {
    const newTodos = [...todos];
    newTodos.push({
      id: Date.now(),
      title: title,
      refCategoryId: categoryId,
      isCompleted: false,
    });
    updateTodos(newTodos);
  };

  //チェックボックスの入力時，stateに反映する。
  const handleTodoChecked = (id: number) => {
    const newTodos = todos.map((todo: Todo_item) => {
      return {
        id: todo.id,
        title: todo.title,
        refCategoryId: todo.refCategoryId,
        isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
      };
    });
    updateTodos(newTodos);
  };

  //Delボタンが押された際、該当Todoアイテムをリストから削除する。
  const handleTodoDeleteClick = (id: number) => {
    if (!confirm("Sure?")) {
      return;
    }
    const newTodos = todos.filter((todo: Todo_item) => {
      return todo.id !== id;
    });
    updateTodos(newTodos);
  };

  return {
    todos,
    handleRefCategoryChanged,
    handlePurgeClick,
    handleAddFormSubmit,
    handleTodoChecked,
    handleTodoDeleteClick,
  };
};

export default useTodos;
