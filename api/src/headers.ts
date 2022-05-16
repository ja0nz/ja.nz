import type { IObjectOf } from '@thi.ng/api'

export function header(sma: number | string): IObjectOf<string> {
  return {
    Expires: typeof sma === 'string' ? sma : '',
    'Cache-Control':
      typeof sma === 'number' ? `max-age=0, s-maxage=${sma}` : '',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Content-Security-Policy': `default-src 'none'`,
  }
}

export function nearestHalfHourUTC(date: Date) {
  const minutes = date.getMinutes()
  return new Date(date.setMinutes(minutes < 30 ? 29 : 59, 59, 0)).toUTCString()
}
