import { ValidationArguments } from 'class-validator';

export const integerValidationMessage = (args: ValidationArguments) => {
  return `"${args.property}"은 정수로 입력해주세요. (현재 값: ${args.value})`;
};
