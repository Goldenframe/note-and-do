import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { TodoWrapper } from '@/widgets/todos';
import { NoteWrapper } from '@/widgets/notes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='Dlist' element={<Layout />}>
          <Route path='to-do-list' element={<TodoWrapper />} />
          <Route path='note-list' element={<NoteWrapper />} />
        </Route>
        <Route path="*" element={<Navigate to={'/Dlist/to-do-list'} />} />
      </Routes>
    </BrowserRouter>
  );
};