import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth';
import { useSwipeGesture } from '@/shared/lib/hooks/useSwipeGesture';
import { Note as NoteType, NoteActions } from '@/shared/lib/types/notes';

interface DeletedNoteProps extends NoteType, Required<Pick<NoteActions, 'onRestore' | 'onPermanentlyDelete'>> {
  className?: string;
}

export const DeletedNote: React.FC<DeletedNoteProps> = ({
  id,
  text,
  theme,
  timestampMonth,
  timestampTime,
  onRestore,
  onPermanentlyDelete,
  className = ''
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 492;

  const swipeGestures = useSwipeGesture({
    onSwipe: () => onPermanentlyDelete(id)
  });

  const renderNoteContent = () => (
    <div className={`note ${className}`}>
      <h3 className="note-month">{timestampMonth}</h3>
      <div className="note-body">
        <div className="note-time">
          <p>{timestampTime}</p>
        </div>
        <div className="note-buttons">
          <FontAwesomeIcon
            className="rotate-left"
            onClick={() => onRestore(id)}
            icon={faRotateLeft}
          />
          {!isMobile && (
            <FontAwesomeIcon
              icon={faTrashCan}
              className="trash-can"
              onClick={() => onPermanentlyDelete(id)}
            />
          )}
        </div>
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