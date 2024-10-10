import React from 'react';

interface FooterProps {
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({ setFilter, clearCompleted }) => {
  return (
    <div className="footer">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={clearCompleted}>Clear completed</button>
    </div>
  );
};

export default Footer;
