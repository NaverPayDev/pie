import debounce from '../src/utils/debounce'

describe('debounce', () => {
    jest.useFakeTimers()

    afterEach(() => {
        jest.clearAllTimers()
    })

    it('should debounce a function', () => {
        const func = jest.fn()
        const {debounce: debouncedFunc} = debounce(func, 100)

        debouncedFunc()
        debouncedFunc()
        debouncedFunc()

        expect(func).not.toHaveBeenCalled()

        jest.advanceTimersByTime(100)

        expect(func).toHaveBeenCalledTimes(1)
    })

    it('should call function immediately if leading is true', () => {
        const func = jest.fn()
        const {debounce: debouncedFunc} = debounce(func, 100, {leading: true})

        debouncedFunc()

        expect(func).toHaveBeenCalledTimes(1)

        jest.advanceTimersByTime(100)

        expect(func).toHaveBeenCalledTimes(1)

        debouncedFunc()

        expect(func).toHaveBeenCalledTimes(2)
    })

    it('should call function on trailing edge if trailing is true', () => {
        const func = jest.fn()
        const {debounce: debouncedFunc} = debounce(func, 100, {trailing: true})

        debouncedFunc()
        debouncedFunc()

        expect(func).not.toHaveBeenCalled()

        jest.advanceTimersByTime(100)

        expect(func).toHaveBeenCalledTimes(1)
    })

    it('should not call function on trailing edge if trailing is false', () => {
        const func = jest.fn()
        const {debounce: debouncedFunc} = debounce(func, 100, {trailing: false})

        debouncedFunc()
        debouncedFunc()

        expect(func).not.toHaveBeenCalled()

        jest.advanceTimersByTime(100)

        expect(func).not.toHaveBeenCalled()
    })

    it('should respect maxWait option', () => {
        const func = jest.fn()
        const {debounce: debouncedFunc} = debounce(func, 100, {maxWait: 150})

        debouncedFunc()
        jest.advanceTimersByTime(50)
        debouncedFunc()
        jest.advanceTimersByTime(50)
        debouncedFunc()
        jest.advanceTimersByTime(50)

        expect(func).toHaveBeenCalledTimes(1)

        jest.advanceTimersByTime(50)
        debouncedFunc()
        jest.advanceTimersByTime(100)
        debouncedFunc()

        expect(func).toHaveBeenCalledTimes(2)
    })

    it('should cancel delayed function call', () => {
        const func = jest.fn()
        const {debounce: debouncedFunc, cancel} = debounce(func, 100)

        debouncedFunc()
        cancel()

        jest.advanceTimersByTime(100)

        expect(func).not.toHaveBeenCalled()
    })

    it('should flush delayed function call', () => {
        const func = jest.fn()
        const {debounce: debouncedFunc, flush} = debounce(func, 100)

        debouncedFunc()
        flush()

        expect(func).toHaveBeenCalledTimes(1)
    })
})
