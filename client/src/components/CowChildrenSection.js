import React from 'react';
import { Link } from 'react-router-dom';

const CowChildrenSection = ({ children, name }) => (
  <div className="mt-4">
    <h3 className="text-center">Children</h3>
    {!children || children.length === 0 ? (
      <p>{name} does not have any children.</p>
    ) : (
      <ul className="list-group mt-4">
        {children.map(child => (
          <li className="list-group-item" key={child._id}>
            <Link to={`/farms/${child.farm}/cattle/${child._id}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CowChildrenSection;
