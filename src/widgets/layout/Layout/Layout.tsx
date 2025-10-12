import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => 
    isActive ? 'active' : '';

  return (
    <div className="container-fluid no-margin no-padding">
      <header>
        <nav>
          <h3 className="logo">DList</h3>
          <div className='links'>
            <NavLink 
              to='to-do-list' 
              end 
              className={getNavLinkClass}
            >
              Список задач
            </NavLink>
            <NavLink 
              to='note-list' 
              className={getNavLinkClass}
            >
              Заметки
            </NavLink>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};