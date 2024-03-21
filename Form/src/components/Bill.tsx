import { useFormContext } from './FormContext';

const Bill = () => {
    const { formData } = useFormContext();

    return (
        <div className="billWrapper">
            <h2>Bill Details</h2>
            <div className="detailsWrapper">
                <p>Email: {formData.contact.email}</p>
                <p>Name: {formData.address.name}</p>
                <p>Address: {formData.address.address}</p>
                <p>Country: {formData.address.country}</p>
                <p>Payment: {formData.payment.method}</p>
            </div>
        </div>
    );
};

export default Bill;
