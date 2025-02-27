export const transformEmptyToNull = ({ value }) => {
  // 빈 문자열이나 공백은 null로 변환
  if (value === '' || value === ' ' || value === null) {
    return null;
  }
  return value;
};
