import type { IconKey } from '../icons'
import type { AnyObj } from './Types'

export const ICON_KEY = (s?: string | null): IconKey => (s as IconKey) || 'eye'

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const parseTime = (time?: string) => {
  const match = time?.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i)
  if (!match) return null

  const [, hourRaw, minuteRaw = '0', periodRaw] = match
  const period = periodRaw.toUpperCase()
  let hour = Number(hourRaw)
  const minute = Number(minuteRaw)

  if (period === 'PM' && hour !== 12) hour += 12
  if (period === 'AM' && hour === 12) hour = 0

  return {
    value: hour + minute / 60,
    label: `${Number(hourRaw)}:${minuteRaw.padStart(2, '0')} ${period}`,
  }
}

const parseHours = (hours?: string) => {
  if (!hours || /closed/i.test(hours)) return null

  const [openRaw, closeRaw] = hours.split(/\s*-\s*/)
  const open = parseTime(openRaw)
  const close = parseTime(closeRaw)

  if (!open || !close) return null
  return { open, close }
}

export const getTodayStatus = (settings?: AnyObj) => {
  const d = new Date()
  const key = DAY_KEYS[d.getDay()]
  const todayHours = parseHours(settings?.[key])
  const now = d.getHours() + d.getMinutes() / 60
  const open = !!todayHours && now >= todayHours.open.value && now < todayHours.close.value

  return {
    open,
    closeLabel: todayHours?.close.label,
  }
}

export const getNextAvailableLabel = (settings?: AnyObj) => {
  const now = new Date()
  const currentDay = now.getDay()
  const currentTime = now.getHours() + now.getMinutes() / 60

  for (let offset = 0; offset < 7; offset += 1) {
    const day = (currentDay + offset) % 7
    const hours = parseHours(settings?.[DAY_KEYS[day]])
    if (!hours) continue

    if (offset === 0) {
      if (currentTime < hours.open.value) return `Today, ${hours.open.label}`
      if (currentTime < hours.close.value) return null
    }
    if (offset > 0) {
      const label = offset === 1 ? 'Tomorrow' : DAY_KEYS[day][0].toUpperCase() + DAY_KEYS[day].slice(1)
      return `${label}, ${hours.open.label}`
    }
  }

  return null
}
