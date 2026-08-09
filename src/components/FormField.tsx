import { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

type SharedFieldProps = {
  id: string;
  label: string;
  error?: string;
};

type FormFieldProps = SharedFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, error, className = "", ...inputProps }, ref) => {
    const errorId = `${id}-error`;

    return (
      <div>
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
        <input
          {...inputProps}
          ref={ref}
          id={id}
          className={`form-control ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : inputProps["aria-describedby"]}
        />
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

type SelectFieldProps = SharedFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "children"> & {
    options: readonly string[];
    placeholder: string;
  };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id,
      label,
      error,
      options,
      placeholder,
      className = "",
      ...selectProps
    },
    ref,
  ) => {
    const errorId = `${id}-error`;

    return (
      <div>
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
        <select
          {...selectProps}
          ref={ref}
          id={id}
          className={`form-control ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : selectProps["aria-describedby"]}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
