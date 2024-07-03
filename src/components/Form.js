import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import { v4 } from 'uuid';

const Form = () => {
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState('');

  const addTodoHandler = () => {
    const todo = {
      id: v4(),
      text: todoValue,
      isComplete: false,
    };
    dispatch(addTodo(todo));
    setTodoValue('');
  };

  return (
    <form className="w-full flex" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        placeholder="Type something..."
        className="text-black w-full p-1 focus:outline-none focus:border-lime-500 focus: border-2 placeholder:text-sm"
      />
      <button
        type="submit"
        onClick={addTodoHandler}
        className="shrink-0 bg-lime-500  hover:bg-lime-400 transition-all px-3 text-sm"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
