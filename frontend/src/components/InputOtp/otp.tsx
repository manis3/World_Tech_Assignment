import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/otp/otp";
import { useState } from "react";

interface InputOTPCodeProps {
    value?: string;
    onChange?: (value: string) => void;
}

export function InputOTPCode({ value = "", onChange, ...props }: InputOTPCodeProps) {
    const [otpValues, setOtpValues] = useState(Array(6).fill(""));

    const handleInputChange = (index: number, newValue: string) => {
        const updatedOtp = [...otpValues];
        updatedOtp[index] = newValue.slice(0, 1);
        setOtpValues(updatedOtp);

        const combinedOtp = updatedOtp.join("");
        onChange && onChange(combinedOtp);
    };

    return (
        <InputOTP {...props} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup>
                {otpValues.map((otpValue, index) => (
                    <input
                        key={index}
                        type="text"
                        value={otpValue}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        maxLength={1}
                        className="otp-input-slot"
                    />
                ))}
            </InputOTPGroup>
        </InputOTP>
    );
}
