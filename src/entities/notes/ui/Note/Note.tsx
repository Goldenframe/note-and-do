import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth';
import { useSwipeGesture } from '@/shared/lib/hooks/useSwipeGesture';
import { Note as NoteType, NoteActions } from '@/shared/lib/types/notes';

interface NoteProps extends NoteType, Omit<NoteActions, 'onRestore' | 'onPermanentlyDelete'> {
  className?: string;
}

export const Note: React.FC<NoteProps> = ({
  id,
  text,
  theme,
  timestampMonth,
  timestampTime,
  onEdit,
  onDelete,
  className = ''
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 492;

  const swipeGestures = useSwipeGesture({
    onSwipe: () => onDelete(id),
    onTap: isMobile ? () => onEdit(id) : undefined
  });

  const renderNoteContent = () => (
    <div className={`note ${className}`}>
      <h3 className="note-month">{timestampMonth}</h3>
      <div className="note-body">
        <div className="note-time">
          <p>{timestampTime}</p>
        </div>
        {!isMobile && (
          <div className="note-buttons">
            <FontAwesomeIcon
              icon={faPen}
              className="pen"
              onClick={() => onEdit(id)}
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              className="trash-can"
              onClick={() => onDelete(id)}
            />
          </div>
        )}
      </div>
      {theme && <div className="note-theme">{theme}</div>}
      <div className="note-text">{text}</div>
    </div>
  );

  if (isMobile) {
    return <div {...swipeGestures}>{renderNoteContent()}</div>;
  }

  return renderNoteContent();
};