import React from 'react';
import { Note } from '@/entities/notes';
import { DeletedNote } from '@/entities/notes';
import { Note as NoteType } from '@/shared/lib/types/notes';

type NoteCategory = 'Все' | 'Корзина';

interface NoteListProps {
  category: NoteCategory;
  notes: NoteType[];
  deletedNotes: NoteType[];
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onRestoreNote: (id: string) => void;
  onPermanentlyDeleteNote: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({
  category,
  notes,
  deletedNotes,
  onEditNote,
  onDeleteNote,
  onRestoreNote,
  onPermanentlyDeleteNote
}) => {
  const currentNotes = category === 'Все' ? notes : deletedNotes;
  const isEmpty = currentNotes.length === 0;

  if (isEmpty) {
    return (
      <div className="empty-list">
        <p>Список пуст</p>
      </div>
    );
  }

  return (
    <>
      {currentNotes.map((note) =>
        category === 'Все' ? (
          <Note
            key={note.id}
            {...note}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        ) : (
          <DeletedNote
            key={note.id}
            {...note}
            onRestore={onRestoreNote}
            onPermanentlyDelete={onPermanentlyDeleteNote}
          />
        )
      )}
    </>
  );
};