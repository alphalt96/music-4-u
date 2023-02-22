export function getTimeRange (duration: number, current: number) {
  const durationLeft = duration - current
  let timeLoaded = `0:${Math.floor(current).toString().padStart(2, '0')}`,
    timeLeft = `0:${Math.floor(durationLeft).toString().padStart(2, '0')}`

  if (current > 60) {
    const mininutesLoaded = Math.floor(current / 60)
    const secondsLoaded = Math.floor(current - mininutesLoaded * 60)
      .toString()
      .padStart(2, '0')
    timeLoaded = `${mininutesLoaded}:${secondsLoaded}`
  }

  if (durationLeft > 60) {
    const mininutesLeft = Math.floor(durationLeft / 60)
    const secondsLeft = Math.floor(durationLeft - mininutesLeft * 60)
      .toString()
      .padStart(2, '0')
    timeLeft = `${mininutesLeft}:${secondsLeft}`
  }

  return {
    timeLoaded,
    timeLeft
  }
}
