import React from "react";

interface InputProps {
  label: string;
  id: string;
  placeholder: string;
  type: string;
  value: string | number;
  maxLength?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export interface FormData {
  name : string;
  mobileNumber: string;
  physicsMarks: number;
  chemistryMarks: number;
  mathsMarks: number;
  course: string;
  community : string;
}

const Input = ({
  label,
  id,
  placeholder,
  type,
  value,
  onChange,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-base font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        type={type === 'tel' ? 'text' : type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value !== undefined ? value.toString() : ''}
        onChange={onChange}
        className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-base focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default Input;
