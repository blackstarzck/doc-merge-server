import { ValidationArguments } from 'class-validator';

export const dateValidationMessage = (args: ValidationArguments) => {
  return `"${args.property}"은 날짜로 입력해주세요.`;
};
