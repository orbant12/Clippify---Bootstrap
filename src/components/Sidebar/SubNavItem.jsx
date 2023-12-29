import React from 'react';
import { Link } from 'react-router-dom';

const SubNavItem = ({ subItem }) => {
  return (
    <Link to={subItem.path} className={subItem.cName}>
      {subItem.icon}
      <span>{subItem.title}</span>
    </Link>
  );
};

export default SubNavItem;
