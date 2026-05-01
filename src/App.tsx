import React from "react";
import "./style.css";

const Todo = (props: any) => {
        return (
          <li>
            <label>
              <input type="checkbox" 
              checked={props.todo.isCompleted}
              onChange={() => {props.onCheckboxChange(props.todo.id)}}
              />
                <span>
                  {props.todo.title}
                </span>
            </label>
            <button onClick={() => {props.onDeleteClick(props.todo.id)}}>Del</button>
          </li>
        );
      }

const AddForm = (props: any) => {
        const [title, setTitle] = React.useState('');
        const inputRef = React.useRef<HTMLInputElement | null>(null);

        const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.currentTarget.value);
        };

        const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
          //htmlのイベントリスター同様、ブラウザ制御のための引数が用意されている。
          e.preventDefault();
          props.onSubmit(title);
          setTitle('');
          inputRef.current!.focus();
        }

        return (
          <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleTextChange} ref={inputRef}/>
            <button>Add</button>
          </form>
        );
      };

const App = () => {
        type Todo_item = {
          id: number,
          title: string,
          isCompleted: boolean,
        }

        const [todos, setTodos] = React.useState<Todo_item[]          >([
          // {id: 0, title: 'aaa', isCompleted: false},
          // {id: 1, title: 'bbb', isCompleted: true},
          // {id: 2, title: 'ccc', isCompleted: false},
        ]);

        React.useEffect(() => {
          let parseTodos: Todo_item[];
          let saved = localStorage.getItem('todos') ;
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
          localStorage.setItem('todos', JSON.stringify(newTodos));
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
        const handleAddFormSubmit = (title: string) => {
          const newTodos = [...todos];
          newTodos.push({
            id: Date.now(),
            title: title,
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
              isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
            }
          });
          updateTodos(newTodos);
        };

        //Delボタンが押された際、該当Todoアイテムをリストから削除する。
        const handleTodoDeleteClick = (id: number) => {
          if(!confirm('Sure?')) {
            return;
          }
          const newTodos = todos.filter((todo: Todo_item) => {
            return todo.id !== id;
          });
          updateTodos(newTodos);
        };

        const TodoItems = todos.map((todo: Todo_item) => {
          return (
            <Todo
              key = {todo.id}
              todo = {todo}
              onDeleteClick = {handleTodoDeleteClick}
              onCheckboxChange = {handleTodoChecked}
            />
          );
        });

        return (
          <div className="container">
            <h1>
              Todos
              <button onClick={handlePurgeClick}>Purge</button>
            </h1>
            <ul id="todos">
              {TodoItems}
            </ul>
            <AddForm onSubmit={handleAddFormSubmit} />
          </div>
        );
      };
  
export default App;