import { useController, UseControllerProps } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps &
  Partial<ReactDatePickerProps>;

export default function DateInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });

  return (
    <div className="mb-3 block">
      <DatePicker
        {...props}
        {...field}
        onChange={(value) => field.onChange(value)}
        selected={field.value}
        placeholderText={props.label}
        className={`
            flex w-[100%] flex-col rounded-lg ${
              fieldState.error
                ? "border-red-500 bg-red-50 text-red-900"
                : !fieldState.invalid && fieldState.isDirty
                  ? "border-green-500 bg-green-50 text-green-900"
                  : ""
            }
        `}
      />
      {fieldState.error && (
        <div className="text-sm text-red-500">{fieldState.error.message}</div>
      )}
    </div>
  );
}
