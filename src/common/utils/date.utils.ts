export function transformDate({ value }): Date | null {
  // 입력값이 undefined, null, 빈 문자열이면 null 반환
  if (value === undefined || value === null || value === '') {
    return null;
  }

  // 문자열로 변환 후 Date 객체 생성 시도
  const strValue = String(value).trim();
  const date = new Date(strValue);

  // 유효한 Date인지 확인 (Invalid Date 체크)
  if (isNaN(date.getTime())) {
    return null; // 변환 불가능하면 null
  }

  return date; // 유효한 경우 Date 객체 반환
}
