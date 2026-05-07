import React from "react";
import "../style.css";

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

export default AddForm;