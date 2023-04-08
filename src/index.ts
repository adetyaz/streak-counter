import {
	buildStreak,
	formattedDate,
	shouldIncrementOrResetStreakCount,
	Streak,
	updateStreak,
	KEY,
} from './utils'

export function streakCounter(storage: Storage, date: Date): Streak {
	const streakInLocalStorage = storage.getItem(KEY)

	if (streakInLocalStorage) {
		try {
			const streak = JSON.parse(streakInLocalStorage) as Streak
			const state = shouldIncrementOrResetStreakCount(
				date,
				streak.lastLoginDate
			)
			const SHOULD_INCREMENT = state === 'increment'
			const SHOULD_RESET = state === 'reset'

			if (SHOULD_INCREMENT) {
				const updatedStreak = buildStreak(date, {
					startDate: streak.startDate,
					currentCount: streak.currentCount + 1,
					lastLoginDate: formattedDate(date),
				})

				//store in the localstorage
				updateStreak(storage, updatedStreak)
				return updatedStreak
			}

			if (SHOULD_RESET) {
				const updatedStreak = buildStreak(date)

				//store in the localstorage
				updateStreak(storage, updatedStreak)
				return updatedStreak
			}

			return streak
		} catch (error) {
			console.error('Failed to parse streak from localStorage')
		}
	}

	const streak = buildStreak(date)
	//store in localstorage

	storage.setItem(KEY, JSON.stringify(streak))

	return streak
}
