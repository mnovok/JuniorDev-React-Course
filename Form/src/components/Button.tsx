import { useFormContext } from './FormContext';
import Bill from "./Bill";
import { useState } from 'react';

const Button = () => {
  const { getAgreement } = useFormContext();
  const [showBill, setShowBill] = useState(false);


  const handleOrder = () => {
    if (getAgreement() === 'Yes') {
        setShowBill(true);
      console.log('Order placed successfully!');
    } else {
      alert('Please accept the terms of the order.');
    }
  };

  return (
    <>
    <button type="button" onClick={handleOrder}>
      Order
    </button>
    {showBill && <Bill />}
    </>
  );
};

export default Button;
