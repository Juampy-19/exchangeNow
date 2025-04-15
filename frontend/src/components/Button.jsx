import { Link } from 'react-router-dom';

const Button = ({to, onClick, children, ...props}) => {
  const baseClass = 'w-60 bg-emerald-700 text-white hover:bg-emerald-400 hover:text-slate-800 py-2 border-none rounded-xl cursor-pointer transition duration-500';

  if (to) {
    return (
      <Link to={to}>
        <button className={baseClass} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  return (
      <button className={baseClass} onClick={onClick} {...props}>
        {children}
      </button>
  );
}

export default Button;
