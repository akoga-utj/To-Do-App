import React from "react";
import useLimit from "./useLimit"

const useTodos = () => {
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
    }|null,
  };

  //例外的に日付バリデーションチェックのみuseLimitから持ってくる(どのデータ構造に対応しているかわかりやすくするため)
  const { checkUsableDates } = useLimit(false, null);

  const [todos, setTodos] = React.useState<Todo_item[]>([
  ]);

  const [limitChangeItemId, setLimitChangeItemId] = React.useState<number | null>(null);

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

  //アニメーション管理のため、UIに紐づくstateをこっちで扱う
  const [isLimitModalVisible, setLimitModalVisible] = React.useState(false);
  const [isLimitModalAnimate, setLimitModalAnimate] = React.useState(false);
  
  //紐づいている処理が広範となっているため、UI遷移用の一時IDstateを用意する
    const [tempId, setTempId] = React.useState<number|null>(null);
  
    React.useEffect(() => {
      if(tempId === null){
        setLimitModalAnimate(false);
        setTimeout(() => {
          setLimitModalVisible(false);
          setLimitChangeItemId(null);
        }, 600)
      }else{
        setLimitChangeItemId(tempId);
        setLimitModalVisible(true);
        setTimeout(() => {
          setLimitModalAnimate(true);
        }, 10)
      }
    }, [tempId])

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
          isLimited: todo.isLimited,
          limits: todo.limits,
        };
        
      } else {
        return todo;
      }
    });
    updateTodos(newTodos);
  };

  //期限変更モーダルウィンドウから帰ってくるときに実行される関数
  const handleLimitsChanged = (
    itemId: number|null,
    newLimits: {year: number, month: number, day: number}
  ) => {
    if(itemId === null){
      setTempId(null);
      return;
    }

    if(checkUsableDates(newLimits!.year, newLimits!.month, newLimits!.day)){
        alert("設定できない日付です");
        return;
    }

    const newTodos = todos.map((todo: Todo_item) => {
      if (todo.id === itemId) {
        return {
          id: todo.id,
          title: todo.title,
          refCategoryId: todo.refCategoryId,
          isCompleted: todo.isCompleted,
          isLimited: true,
          limits: newLimits,
          };
        
      } else {
        return todo;
      }
    });
    updateTodos(newTodos);
    setTempId(null);
  }

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
  const handleAddFormSubmit = (title: string, categoryId: number, isLimitFormDisplayed: boolean, dates:{year: number, month: number, day: number} | null) => {
    const newTodos = [...todos];
    if(isLimitFormDisplayed){
      if(checkUsableDates(dates!.year, dates!.month, dates!.day)){
        alert("設定できない日付です");
        return;
      }
      
      newTodos.push({
      id: Date.now(),
      title: title,
      refCategoryId: categoryId,
      isCompleted: false,
      isLimited: isLimitFormDisplayed,
      limits: dates,
      });
    }
    else{
      newTodos.push({
      id: Date.now(),
      title: title,
      refCategoryId: categoryId,
      isCompleted: false,
      isLimited: isLimitFormDisplayed,
      limits: null,
      });
    }
    
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
        isLimited: todo.isLimited,
        limits: todo.limits,
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

  //期限変更アイコンがクリックされた際, 期限変更ウィンドウ呼び出しのためのstate制御
  const handleDispChangeLimit = (itemId: number) => {
    setTempId(itemId)
  }

  return {
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
    isLimitModalVisible
  };
};

export default useTodos;
