export interface Streak {
	currentCount: number
	startDate: string
	lastLoginDate: string
}

export function formattedDate(date: Date): string {
	// returns date as 11/11/2021
	// other times it returns 11/11/2021, 12:00:00 AM
	// which is why we call the .split at the end
	return date.toLocaleDateString('en-US')
}

function differenceInDays(dateLeft: Date, dateRight: Date): number {
	const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime())
	const differenceInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	return differenceInDays
}

export function shouldIncrementOrResetStreakCount(
	currentDate: Date,
	lastLoginDate: string
): 'increment' | 'reset' | 'none' {
	// We get 11/5/2021
	// so to get 5, we use our helper function

	const difference =
		currentDate.getDate() - parseInt(lastLoginDate.split('/')[1])

	//Same day login, do nothing
	if (difference === 0) {
		return 'none'
	}

	// This means they logged in the day after the currentDate
	if (difference === 1) {
		return 'increment'
	}

	// Otherwise they logged in after a day, which would
	// break the streak
	return 'reset'
}

export function buildStreak(
	date: Date,
	overrideDefaults?: Partial<Streak>
): Streak {
	const defaultStreak = {
		currentCount: 1,
		startDate: formattedDate(date),
		lastLoginDate: formattedDate(date),
	}

	return {
		...defaultStreak,
		...overrideDefaults,
	}
}
