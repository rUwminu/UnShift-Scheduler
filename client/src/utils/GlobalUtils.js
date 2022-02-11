import dayjs from 'dayjs'

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year()
  const firstDayOftheMonth = dayjs(new Date(year, month, 1)).day()

  let currentMonthCount = 0 - firstDayOftheMonth
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, month, currentMonthCount))
    })
  })

  return daysMatrix
}

export const getFirstCharaterOfUsername = (username) => {
  const FC = username.split(' ')

  if (FC.length >= 2) {
    return FC[0].slice(0, 1) + FC[1].slice(0, 1)
  }

  return FC[0].slice(0, 1)
}

export const getFirstName = (username) => {
  const firstName = username.split(' ')

  return firstName[0]
}
