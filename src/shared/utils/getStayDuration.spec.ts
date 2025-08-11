import { getStayDuration } from './getStayDuration'

const mockDate = (dateString: string) => {
  const originalDate = Date
  const mockedDate = new Date(dateString)

  global.Date = jest.fn().mockImplementation((dateInput?: string) => {
    if (dateInput) {
      return new originalDate(dateInput)
    }
    return mockedDate
  }) as any

  global.Date.now = jest.fn(() => mockedDate.getTime())
  Object.setPrototypeOf(global.Date, originalDate)
}

const restoreDate = () => {
  global.Date = Date
}

describe('getStayDuration', () => {
  afterEach(() => {
    restoreDate()
    jest.clearAllMocks()
  })

  describe('Edge Cases', () => {
    it('should return "0 min" when entryTime is null', () => {
      const result = getStayDuration(null)
      expect(result).toBe('0 min')
    })

    it('should return "0 min" when entryTime is undefined', () => {
      const result = getStayDuration(undefined as any)
      expect(result).toBe('0 min')
    })

    it('should return "0 min" when entryTime is empty string', () => {
      const result = getStayDuration('')
      expect(result).toBe('0 min')
    })

    it('should return "0 min" when entry time is in the future', () => {
      mockDate('2024-01-01T12:00:00Z')

      const futureTime = '2024-01-01T13:00:00Z'
      const result = getStayDuration(futureTime)

      expect(result).toBe('0 min')
    })

    it('should return "0 min" when entry time equals current time', () => {
      const currentTime = '2024-01-01T12:00:00Z'
      mockDate(currentTime)

      const result = getStayDuration(currentTime)

      expect(result).toBe('0min')
    })
  })

  describe('Minutes Only (Less than 1 hour)', () => {
    beforeEach(() => {
      mockDate('2024-01-01T12:00:00Z')
    })

    it('should return minutes for 1 minute duration', () => {
      const entryTime = '2024-01-01T11:59:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('1min')
    })

    it('should return minutes for 30 minutes duration', () => {
      const entryTime = '2024-01-01T11:30:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('30min')
    })

    it('should return minutes for 59 minutes duration', () => {
      const entryTime = '2024-01-01T11:01:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('59min')
    })

    it('should return 0min for duration less than 1 minute', () => {
      const entryTime = '2024-01-01T11:59:30Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('0min')
    })

    it('should handle seconds correctly (floor to minutes)', () => {
      const entryTime = '2024-01-01T11:58:30Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('1min')
    })
  })

  describe('Hours and Minutes (1+ hours)', () => {
    beforeEach(() => {
      mockDate('2024-01-01T15:30:00Z')
    })

    it('should return hours and minutes for exactly 1 hour', () => {
      const entryTime = '2024-01-01T14:30:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('1h 0min')
    })

    it('should return hours and minutes for 1 hour 15 minutes', () => {
      const entryTime = '2024-01-01T14:15:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('1h 15min')
    })

    it('should return hours and minutes for 2 hours 30 minutes', () => {
      const entryTime = '2024-01-01T13:00:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('2h 30min')
    })

    it('should return hours and minutes for multiple hours', () => {
      const entryTime = '2024-01-01T10:45:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('4h 45min')
    })

    it('should handle exactly multiple hours (0 minutes)', () => {
      const entryTime = '2024-01-01T12:30:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('3h 0min')
    })
  })

  describe('Long Durations', () => {
    beforeEach(() => {
      mockDate('2024-01-02T10:00:00Z')
    })

    it('should handle 24+ hours correctly', () => {
      const entryTime = '2024-01-01T08:30:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('25h 30min')
    })

    it('should handle very long durations', () => {
      const entryTime = '2023-12-30T10:00:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('72h 0min')
    })
  })

  describe('Date Format Handling', () => {
    beforeEach(() => {
      mockDate('2024-01-01T12:00:00Z')
    })

    it('should handle ISO string format', () => {
      const entryTime = '2024-01-01T11:00:00.000Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('1h 0min')
    })

    it('should handle different timezone format', () => {
      const entryTime = '2024-01-01T11:00:00+00:00'
      const result = getStayDuration(entryTime)

      expect(result).toBe('1h 0min')
    })
  })

  describe('Boundary Cases', () => {
    it('should handle transition from minutes to hours correctly', () => {
      mockDate('2024-01-01T13:00:00Z')

      const entryTime59min = '2024-01-01T12:01:00Z'
      expect(getStayDuration(entryTime59min)).toBe('59min')

      const entryTime60min = '2024-01-01T12:00:00Z'
      expect(getStayDuration(entryTime60min)).toBe('1h 0min')
    })

    it('should handle milliseconds precision correctly', () => {
      mockDate('2024-01-01T12:01:00.500Z')

      const entryTime = '2024-01-01T12:00:00.000Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('1min')
    })

    it('should handle leap seconds and edge timing', () => {
      mockDate('2024-01-01T12:00:59.999Z')

      const entryTime = '2024-01-01T12:00:00.000Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('0min')
    })
  })

  describe('Real-world Scenarios', () => {
    it('should handle typical office hours duration', () => {
      mockDate('2024-01-01T17:00:00Z')

      const entryTime = '2024-01-01T09:00:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('8h 0min')
    })

    it('should handle lunch break scenario', () => {
      mockDate('2024-01-01T13:30:00Z')

      const entryTime = '2024-01-01T12:15:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('1h 15min')
    })

    it('should handle overnight stay', () => {
      mockDate('2024-01-02T08:00:00Z')

      const entryTime = '2024-01-01T23:00:00Z'
      const result = getStayDuration(entryTime)

      expect(result).toBe('9h 0min')
    })
  })
})
