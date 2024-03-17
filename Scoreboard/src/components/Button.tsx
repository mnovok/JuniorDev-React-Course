import React from 'react';

interface ButtonProps {
  sign: string;
  action: () => void;
}

const Button: React.FC<ButtonProps> = ({ sign, action }) => {
  const handleClick = () => {
    action();
  };

  return (
    <div className='buttonWrapper'>
      <button className="btn" onClick={handleClick}>
        {sign}
      </button>
    </div>
  );
}

export default Button;
