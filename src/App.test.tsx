import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('ToDo App', () => {

  it('should allow users to add a new todo', () => {
    render(<App />);

    // Найдем поле ввода
    const input = screen.getByPlaceholderText('What needs to be done?');

    // Добавляем новую задачу
    fireEvent.change(input, { target: { value: 'Test the app' } });
    fireEvent.submit(input);

    // Проверяем, что новая задача появилась в списке
    expect(screen.getByText('Test the app')).toBeInTheDocument();
  });

  it('should toggle todo completed status', () => {
    render(<App />);

    // Добавим задачу
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Test toggle' } });
    fireEvent.submit(input);

    // Проверим, что задача добавлена
    const todoItem = screen.getByText('Test toggle');
    expect(todoItem).toBeInTheDocument();

    // Найдем checkbox с помощью getByRole
    const checkbox = screen.getByRole('checkbox', { name: /Test toggle/i });
    fireEvent.click(checkbox);

    // Проверим, что задача теперь отмечена как выполненная (через класс completed)
    expect(todoItem).toHaveClass('completed');
  });

  it('should filter active and completed todos', () => {
    render(<App />);

    // Добавляем две задачи
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Active task' } });
    fireEvent.submit(input);
    fireEvent.change(input, { target: { value: 'Completed task' } });
    fireEvent.submit(input);

    // Отмечаем вторую задачу как выполненную
    const completedCheckbox = screen.getByRole('checkbox', { name: /Completed task/i });
    fireEvent.click(completedCheckbox);

    // Проверяем фильтр активных задач
    const activeButton = screen.getByText('Active');
    fireEvent.click(activeButton);
    expect(screen.getByText('Active task')).toBeInTheDocument();
    expect(screen.queryByText('Completed task')).toBeNull();

    // Проверяем фильтр выполненных задач
    const completedButton = screen.getByText('Completed');
    fireEvent.click(completedButton);
    expect(screen.getByText('Completed task')).toBeInTheDocument();
    expect(screen.queryByText('Active task')).toBeNull();
  });

  it('should clear completed todos', () => {
    render(<App />);

    // Добавляем задачу
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Task to complete' } });
    fireEvent.submit(input);

    // Отмечаем задачу как выполненную
    const completedCheckbox = screen.getByRole('checkbox', { name: /Task to complete/i });
    fireEvent.click(completedCheckbox);

    // Нажимаем на "Clear completed"
    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    // Проверяем, что задача удалена
    expect(screen.queryByText('Task to complete')).toBeNull();
  });

});
