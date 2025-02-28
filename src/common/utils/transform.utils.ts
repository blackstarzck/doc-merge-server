export const transformEmptyToNull = ({ value }) => {
  // 빈 문자열이나 공백은 null로 변환
  if (value === '-' || value === '' || value === ' ' || value === null) {
    return null;
  }
  return value;
};

export const transformIntergerOrNull = ({ value }) => {
  // undefined 또는 null 처리
  if (value === undefined || value === null) {
    return null;
  }

  // 숫자인 경우
  if (typeof value === 'number') {
    // 정수인지 확인
    if (Number.isInteger(value)) {
      return value;
    }
    // 소수점이면 null 반환
    return null;
  }

  // 문자열인 경우
  const trimmedValue = value.trim();
  if (trimmedValue === '') {
    return null;
  }

  const parsedValue = Number(trimmedValue);
  if (!isNaN(parsedValue) && Number.isInteger(parsedValue)) {
    return parsedValue;
  }

  return null;
};
