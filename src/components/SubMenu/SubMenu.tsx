import { Link } from 'react-router-dom';

const SubMenu = ({ elements }) => {
  return (
    <li className="w-full px-4 flex items-start text-left">
      <ul className="py-1 px-4">
        {elements.map((element, index) => (
          <li key={index} className=" dark:text-white py-2 flex items-center">
            {element.svg && <span className="mr-2">{element.svg}</span>}
            <Link to={`/${element.path}`}>{element.text}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SubMenu;
