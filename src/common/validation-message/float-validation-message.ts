import { ValidationArguments } from 'class-validator';

export const floatValidationMessage = (args: ValidationArguments) => {
  return `"${args.property}"은 숫자로 입력해주세요.`;
};
