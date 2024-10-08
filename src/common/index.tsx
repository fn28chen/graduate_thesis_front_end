import {
  loginDefaultValue,
  loginSchema,
  registerDefaultValue,
  registerSchema,
} from "@/components/ui/FormConfig/Schema";

export const DefaultValue = (pathname: string) => {
  if (pathname === "/signup") {
    return registerDefaultValue;
  } else {
    return loginDefaultValue;
  }
};

export const FormSchema = (pathname: string) => {
  if (pathname === "/signup") {
    return registerSchema;
  } else {
    return loginSchema;
  }
};
