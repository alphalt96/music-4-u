export function convertSecondToMin (secs: number) {
  const mininutes = Math.floor(secs / 60)
  const remainSecs = Math.floor(secs - mininutes * 60)
    .toString()
    .padStart(2, '0')
  return `${mininutes}:${remainSecs}`
}

export function getTimeRange (duration: number, current: number) {
  const durationLeft = duration - current
  let timeLoaded = `0:${Math.floor(current).toString().padStart(2, '0')}`,
    timeLeft = `0:${Math.floor(durationLeft).toString().padStart(2, '0')}`

  if (current > 60) {
    timeLoaded = convertSecondToMin(current)
  }

  if (durationLeft > 60) {
    timeLeft = convertSecondToMin(durationLeft)
  }

  return {
    timeLoaded,
    timeLeft
  }
}
