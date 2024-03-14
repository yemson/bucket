export function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function getPinName(pinId: string) {
  const pinObject: { [key: string]: string } = {
    daily: '일상',
    study: '공부',
    work: '일',
    hobby: '취미',
    etc: '기타',
  }

  return pinObject[pinId] || '알 수 없음'
}
