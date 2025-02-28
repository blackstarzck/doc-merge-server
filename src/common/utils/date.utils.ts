// excelDateToJSDate 함수는 엑셀 날짜를 JS Date로 변환합니다.
export function excelDateToJSDate(excelDate: number): Date {
  const epoch = new Date(1899, 11, 30); // 엑셀 날짜의 시작 날짜 (1900년 1월 1일 이전)
  const msPerDay = 86400000; // 1일의 밀리초
  return new Date(epoch.getTime() + excelDate * msPerDay);
}
