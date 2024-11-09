import { errorMessage } from "@/consts/error";

export function getErrorMessage(code: number): string {
    //@ts-expect-error
    return errorMessage[code] || "An unknown error occurred";
}