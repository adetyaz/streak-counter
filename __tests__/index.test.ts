import { streakCounter } from '../src'
import { JSDOM } from 'jsdom'
import { formattedDate } from '../src/utils'

describe('streakCounter', () => {
	let mockLocalStorage: Storage

	beforeEach(() => {
		const mockJSDom = new JSDOM('', { url: 'http://localhost' })

		mockLocalStorage = mockJSDom.window.localStorage
	})

	afterEach(() => {
		mockLocalStorage.clear()
	})

	it('should return a streak object with currentCount, startDate and lastLogin', () => {
		const date = new Date()
		const streak = streakCounter(mockLocalStorage, date)

		expect(streak.hasOwnProperty('currentCount')).toBe(true)
		expect(streak.hasOwnProperty('startDate')).toBe(true)
		expect(streak.hasOwnProperty('lastLoginDate')).toBe(true)
	})

	it('should return a streak starting at 1 and keep track of lastLoginDate', () => {
		const date = new Date()
		const streak = streakCounter(mockLocalStorage, date)

		const dateFormatted = formattedDate(date)

		expect(streak.currentCount).toBe(1)
		expect(streak.lastLoginDate).toBe(dateFormatted)
	})

	it('should store the streak in localStorage', () => {
		const date = new Date()
		const key = 'streak'

		streakCounter(mockLocalStorage, date)

		const streakAsString = mockLocalStorage.getItem(key)
		expect(streakAsString).not.toBeNull()
	})

	it('should return the streak from localStorage', () => {
		const date = new Date()
		const streak = streakCounter(mockLocalStorage, date)

		// Should match the dates used to set up the tests
		expect(streak.startDate).toBe('3/21/2023')
	})
})
