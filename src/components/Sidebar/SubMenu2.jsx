import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SubNavItem from './SubNavItem';

const SubMenu2 = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link to={item.path} onClick={item.subNav && showSubnav}>
        {item.icon}
        <span>{item.title}</span>
        {item.subNav && item.subNav.length > 0 && (
          <span>{subnav ? item.iconOpened : item.iconClosed}</span>
        )}
      </Link>
      {subnav &&
        item.subNav.map((subItem, index) => {
          return <SubNavItem subItem={subItem} key={index} />;
        })}
    </>
  );
};

export default SubMenu2;
