import React from 'react';
import { Todo } from '../App';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </span>
      </label>
    </li>
  );
};

export default TodoItem;
