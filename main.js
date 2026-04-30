'use strict';

    {
      const Todo = (props) => {
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

      const AddForm = (props) => {
        const [title, setTitle] = React.useState('');
        const inputRef = React.useRef(null);

        const handleTextChange = (e) => {
          setTitle(e.currentTarget.value);
        };

        const handleSubmit = (e) => {
          //htmlのイベントリスター同様、ブラウザ制御のための引数が用意されている。
          e.preventDefault();
          props.onSubmit(title);
          setTitle('');
          inputRef.current.focus();
        };

        return (
          <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleTextChange} ref={inputRef}/>
            <button>Add</button>
          </form>
        );
      };

      const App = () => {
        const [todos, setTodos] = React.useState([
          // {id: 0, title: 'aaa', isCompleted: false},
          // {id: 1, title: 'bbb', isCompleted: true},
          // {id: 2, title: 'ccc', isCompleted: false},
        ]);

        React.useEffect(() => {
          let savedTodos;
          if (localStorage.getItem('todos') === null) {
            savedTodos = [];
          } else {
            savedTodos = JSON.parse(localStorage.getItem('todos'));
          }

          setTodos(savedTodos);
        }, []);

        //Todoリスト更新時の共通処理
        const updateTodos = (newTodos) => {
          setTodos(newTodos);
          localStorage.setItem('todos', JSON.stringify(newTodos));
        };

        //Purgeボタンが押されたとき、チェックが付いているTodoアイテムをまとめて削除する。
        const handlePurgeClick = () => {
          const newTodos = todos.filter((todo) => {
            return !todo.isCompleted;
          });
          
          if (confirm("Sure?")) {
            updateTodos(newTodos);
          }
        };

        //フォームの内容を受け取り、Todoリストに追加する。
        const handleAddFormSubmit = (title) => {
          const newTodos = [...todos];
          newTodos.push({
            id: Date.now(),
            title: title,
            isCompleted: false,
          });
          updateTodos(newTodos);
        };

        //チェックボックスの入力時，stateに反映する。
        const handleTodoChecked = (id) => {
          const newTodos = todos.map((todo) => {
            return {
              id: todo.id,
              title: todo.title,
              isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
            }
          });
          updateTodos(newTodos);
        };

        //Delボタンが押された際、該当Todoアイテムをリストから削除する。
        const handleTodoDeleteClick = (id) => {
          if(!confirm('Sure?')) {
            return;
          }
          const newTodos = todos.filter((todo) => {
            return todo.id !== id;
          });
          updateTodos(newTodos);
        };

        const TodoItems = todos.map((todo) => {
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
          <>
            <h1>
              Todos
              <button onClick={handlePurgeClick}>Purge</button>
            </h1>
            <ul id="todos">
              {TodoItems}
            </ul>
            <AddForm onSubmit={handleAddFormSubmit} />
          </>
        );
      };

      const root = ReactDOM.createRoot(document.querySelector("#root"));
      root.render(
        <App />
      );
    }