import React from 'react';
import PlusIcon from '@/assets/icons/Vector.svg';

type TodoCategory = 'Все' | 'Избранное' | 'Не выполнено' | 'Выполнено' | 'Корзина';

interface TodoHeaderProps {
  selectedCategory: TodoCategory;
  todosCount: number;
  showOptions: boolean;
  switchImportantButton: string;
  onCategoryChange: (category: TodoCategory) => void;
  onShowOptions: () => void;
  onAddTodo: () => void;
  onSwitchImportant: () => void;
  onCompleteAll: () => void;
  onDeleteAll: () => void;
  onRestoreAll: () => void;
  onPermanentlyDeleteAll: () => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  selectedCategory,
  todosCount,
  showOptions,
  switchImportantButton,
  onCategoryChange,
  onShowOptions,
  onAddTodo,
  onSwitchImportant,
  onCompleteAll,
  onDeleteAll,
  onRestoreAll,
  onPermanentlyDeleteAll
}) => {
  const categories: TodoCategory[] = [
    'Все',
    'Избранное',
    'Не выполнено',
    'Выполнено',
    'Корзина',
  ];

  const renderOptionsButtons = () => {
    if (selectedCategory === 'Корзина') {
      return (
        <>
          <button onClick={onRestoreAll}>Восстановить все</button>
          <button onClick={onPermanentlyDeleteAll}>Очистить корзину</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={onSwitchImportant}>{switchImportantButton}</button>
          <button onClick={onCompleteAll}>Отметить все "Выполнено"</button>
          <button onClick={onDeleteAll}>Добавить все в корзину</button>
        </>
      );
    }
  };

  return (
    <>
      <div className="wrapper-buttons">
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`${category === selectedCategory ? 'active' : ''} category-button`}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="add-button" onClick={onAddTodo}>
            <img src={PlusIcon} alt="Добавить задачу" />
        </button>
      </div>

      {selectedCategory !== 'Все' && selectedCategory !== 'Корзина' && (
        <div className="categories-line">
          <h3 className="category-option">
            {`${selectedCategory} (${todosCount})`}
          </h3>
        </div>
      )}

      {(selectedCategory === 'Корзина' || selectedCategory === 'Все') && (
        <div className="category-options-line">
          <h3 className="category-option">
            {selectedCategory === 'Корзина' 
              ? `${selectedCategory} (${todosCount})`
              : `Все (${todosCount})`
            }
          </h3>
          <button className="show-options-button" onClick={onShowOptions}>
            ...
          </button>
          {showOptions && (
            <div className="options-buttons">
              {renderOptionsButtons()}
            </div>
          )}
        </div>
      )}
    </>
  );
};