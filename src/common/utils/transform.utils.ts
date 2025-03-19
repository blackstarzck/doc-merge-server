export const transformEmptyToNull = ({ value }): any => {
  // 빈 문자열이나 공백은 null로 변환
  if (value === '-' || value === '' || value === ' ' || value === null) {
    return null
  }
  return value
}

export const transformIntegerOrNull = ({ value }) => {
  // undefined 또는 null 처리
  if (value === undefined || value === null) {
    return null
  }

  // 숫자인 경우
  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return value
    }
    return null
  }

  // 문자열인 경우
  const trimmedValue = value.trim()
  if (trimmedValue === '') {
    return null
  }

  // 쉼표 제거 후 파싱
  const cleanValue = trimmedValue.replace(/,/g, '')
  const parsedValue = Number(cleanValue)

  if (!isNaN(parsedValue) && Number.isInteger(parsedValue)) {
    return parsedValue
  }

  return null
}

export const transformNumber = ({ value }) => {
  // undefined, null, 빈 문자열, 공백, '-'는 null로 변환
  if (value === undefined || value === null || value === '' || value === ' ' || value === '-') {
    return null
  }

  // 숫자 타입이면 그대로 반환
  if (typeof value === 'number' && !isNaN(value)) {
    return value
  }

  // 문자열 처리
  let strValue = String(value).trim() // 공백 제거

  // 퍼센트 기호 제거
  if (strValue.endsWith('%')) {
    strValue = strValue.slice(0, -1).trim()
  }

  // 쉼표 제거
  strValue = strValue.replace(/,/g, '') // 모든 쉼표 제거

  // 숫자로 변환 시도
  const numValue = Number(strValue)

  // 유효한 숫자인지 확인 (NaN이 아니고 유한 값)
  if (!isNaN(numValue) && isFinite(numValue)) {
    return numValue // 숫자로 변환 성공
  }

  // 그 외는 null
  return null
}

export const transformBoolean = ({ value }) => {
  // 빈 문자열, 공백, null, undefined는 null로 변환
  if (value === '' || value === ' ' || value === null || value === undefined) {
    return false
  }

  // 문자열로 변환 후 소문자로 통일
  const strValue = String(value).toLowerCase().trim() // 공백 제거

  // 'true' 또는 'false'만 변환
  if (strValue === 'true') return true
  if (strValue === 'false') return false

  // 나머지는 그대로 반환 (검증에서 실패 처리)
  return false
}

export function transformDate({ value }): Date | null {
  // 입력값이 undefined, null, 빈 문자열이면 null 반환
  if (value === undefined || value === null || value === '') {
    return null
  }

  // 문자열로 변환 후 Date 객체 생성 시도
  const strValue = String(value).trim()
  const date = new Date(strValue)

  // 유효한 Date인지 확인 (Invalid Date 체크)
  if (isNaN(date.getTime())) {
    return null // 변환 불가능하면 null
  }

  return date // 유효한 경우 Date 객체 반환
}

export const transformString = ({ value }): string => {
  // null 또는 undefined는 빈 문자열로 변환
  if (value === null || value === undefined) {
    return ''
  }

  // 이미 문자열인 경우
  if (typeof value === 'string') {
    const trimmedValue = value.trim() // 앞뒤 공백 제거

    // 공백만 있는 문자열이거나 특수문자만 있는 경우 빈 문자열 반환
    if (trimmedValue === '' || trimmedValue === '-' || trimmedValue === '/') {
      return ''
    }

    // 유효한 문자열은 그대로 반환
    return trimmedValue
  }

  // 문자열로 변환 가능한 경우
  try {
    const strValue = String(value).trim() // String 변환 후 공백 제거
    if (strValue === '' || strValue === '-' || strValue === '/') {
      return '' // 변환 후에도 공백/특수문자면 빈 문자열
    }
    return strValue // 변환된 문자열 반환
  } catch (e) {
    // 변환 불가능한 경우 (예: Symbol 등)
    return ''
  }
}

export const columnRateTransformers = {
  to: (value): number | null => {
    return value
  },
  from: (value: number | null): string => {
    return value !== null ? `${value}%` : ''
  }
}

export const transStringRateToFloat = ({ value }): number | null => {
  // null, undefined, 빈 문자열은 null로 변환
  if (value === null || value === undefined || value === '') {
    return null
  }

  // 문자열로 변환 후 공백 제거
  let strValue = String(value).trim()

  // %가 있으면 제거
  if (strValue.endsWith('%')) {
    strValue = strValue.slice(0, -1).trim()
  }

  // 단위(% 제외) 및 특수문자 제거 (숫자, 소수점만 남김)
  const cleanStr = strValue.replace(/[^0-9.]/g, '')

  // 숫자로 변환 시도
  const numValue = Number(cleanStr)

  // 유효한 숫자인지 확인 (NaN이 아니고 유한 값)
  if (isNaN(numValue) || !isFinite(numValue) || cleanStr === '') {
    return null // 변환 불가능하면 null
  }

  // 소수점 여러 개 있는 경우 (예: "1.2.3")는 null
  if ((cleanStr.match(/\./g) || []).length > 1) {
    return null
  }

  return numValue // 성공 시 숫자 반환
}
