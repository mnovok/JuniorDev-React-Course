// FormContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface FormData {
  contact: {
    email: string;
  };
  address: {
    name: string;
    address: string;
    country: string;
  };
  payment: {
    method: string;
  };
  agreement: {
    accepted: string;
  }
}

interface FormContextType {
  formData: FormData;
  updateContact: (data: Partial<FormData['contact']>) => void;
  updateName: (firstName: string) => void;
  updateCountry: (country: string) => void;
  updateAddress: (data: Partial<FormData['address']>) => void;
  updatePayment: (data: Partial<FormData['payment']>) => void;
  updateAgreement: (data: Partial<FormData['agreement']>) => void;
  getAgreement: () => string;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return {
    ...context,
    getAgreement: () => context.formData.agreement.accepted
  };
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    contact: {
      email: '',
    },
    address: {
      name: '',
      address: '',
      country: 'Croatia',
    },
    payment: {
      method: 'Cash on Delivery',
    },
    agreement: {
      accepted: 'No',
    }
  });

  const updateContact = (data: Partial<FormData['contact']>) => {
    setFormData((prevData) => ({
      ...prevData,
      contact: { ...prevData.contact, ...data },
    }));
  };

  const updateAddress = (data: Partial<FormData['address']>) => {
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, ...data },
    }));
  };

  const updateName = (name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, name },
    }));
  };

  const updateCountry = (country: string) => {
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, country },
    }));
  };

  const updatePayment = (data: Partial<FormData['payment']>) => {
    setFormData((prevData) => ({
      ...prevData,
      payment: { ...prevData.payment, ...data },
    }));
  };

  const updateAgreement = (data: Partial<FormData['agreement']>) => {
    setFormData((prevData) => ({
      ...prevData,
      agreement: { ...prevData.agreement, ...data },
    }));
  };

  const getAgreement = () => {
    return formData.agreement.accepted;
  };

  return (
    <FormContext.Provider value={{ formData, updateContact, updateAddress, updateName, updateCountry, updatePayment, updateAgreement, getAgreement }}>
      {children}
    </FormContext.Provider>
  );
};
