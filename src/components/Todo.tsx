import "../style.css";

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

export default Todo;