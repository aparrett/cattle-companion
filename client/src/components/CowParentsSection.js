import React from 'react';
import { Link } from 'react-router-dom';

const CowParentsSection = ({ mother, father, name }) => (
  <div className="mt-4">
    <h3 className="text-center">Parents</h3>
    {!mother && !father 
      ? <p>{name} does not have any parents.</p>
      : <ul className="list-group mt-4">
          {mother && 
            <li className="list-group-item" key={mother._id}>
              <Link to={`/farms/${mother.farm}/cattle/${mother._id}`}>
                {mother.name}
              </Link>
              &nbsp;- Mother
            </li>
          }
          {father && 
            <li className="list-group-item" key={father._id}>
              <Link to={`/farms/${father.farm}/cattle/${father._id}`}>
                {father.name}
              </Link>
              &nbsp;- Father
            </li>
          }
        </ul>
    }
  </div>
);

export default CowParentsSection;