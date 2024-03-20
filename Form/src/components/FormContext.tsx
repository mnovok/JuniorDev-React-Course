// FormContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface FormData {
  contact: {
    email: string;
  };
  address: {
    firstName: string;
    address: string;
  };
}

interface FormContextType {
  formData: FormData;
  updateContact: (data: Partial<FormData['contact']>) => void;
  updateAddress: (data: Partial<FormData['address']>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    contact: {
      email: '',
    },
    address: {
      firstName: '',
      address: '',
    },
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

  return (
    <FormContext.Provider value={{ formData, updateContact, updateAddress }}>
      {children}
    </FormContext.Provider>
  );
};
