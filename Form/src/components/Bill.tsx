import { useFormContext } from './FormContext';

const Bill = () => {
    const { formData } = useFormContext();

    return (
        <div className="billWrapper">
            <h2>Bill</h2>
            <p>Contact Email: {formData.contact.email}</p>
        </div>
    );
};

export default Bill;
