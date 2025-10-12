import React from 'react';
import PlusIcon from '@/assets/icons/Vector.svg';

type NoteCategory = 'Все' | 'Корзина';

interface NoteHeaderProps {
  selectedCategory: NoteCategory;
  notesCount: number;
  showOptions: boolean;
  onCategoryChange: (category: NoteCategory) => void;
  onShowOptions: () => void;
  onAddNote: () => void;
  onDeleteAll: () => void;
  onRestoreAll: () => void;
  onPermanentlyDeleteAll: () => void;
}

export const NoteHeader: React.FC<NoteHeaderProps> = ({
  selectedCategory,
  notesCount,
  showOptions,
  onCategoryChange,
  onShowOptions,
  onAddNote,
  onDeleteAll,
  onRestoreAll,
  onPermanentlyDeleteAll
}) => {
  const categories: NoteCategory[] = ['Все', 'Корзина'];

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
        <button className="add-button" onClick={onAddNote}>
          <img src={PlusIcon} alt="Добавить заметку" />
        </button>
      </div>

      <div className="category-options-line">
        <h3 className="category-option">
          {`${selectedCategory} (${notesCount})`}
        </h3>
        <button className="show-options-button" onClick={onShowOptions}>
          ...
        </button>
        
        {showOptions && (
          <div className="options-buttons">
            {selectedCategory !== 'Корзина' ? (
              <button onClick={onDeleteAll}>Добавить все в корзину</button>
            ) : (
              <>
                <button onClick={onRestoreAll}>Восстановить все</button>
                <button onClick={onPermanentlyDeleteAll}>Очистить корзину</button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};