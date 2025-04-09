import {describe, expect, it, vi, afterEach} from 'vitest'

import throttle from '../src/utils/throttle'

describe('throttle', () => {
    vi.useFakeTimers()

    afterEach(() => {
        vi.clearAllTimers()
    })

    it('should invoke the function immediately if leading is true with wait 0', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 0, {leading: true})

        throttled('first call')
        expect(fn).toHaveBeenCalledWith('first call')
    })

    it('should not invoke the function again immediately if called consecutively with wait 0', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 0, {leading: true})

        throttled('first call')
        throttled('second call')
        throttled('third call')

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('first call')
    })

    it('should invoke the function again on subsequent calls after time passes', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 0, {leading: true})

        throttled('first call')
        expect(fn).toHaveBeenCalledWith('first call')
        expect(fn).toHaveBeenCalledTimes(1)

        // Advance timers and invoke again
        vi.advanceTimersByTime(0)
        throttled('second call')
        expect(fn).toHaveBeenCalledWith('second call')
        expect(fn).toHaveBeenCalledTimes(2)
    })

    it('should invoke the function immediately if leading is true', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {leading: true})

        throttled('first call')
        expect(fn).toHaveBeenCalledWith('first call')
    })

    it('should not invoke the function immediately if leading is false', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {leading: false})

        throttled('first call')
        expect(fn).not.toHaveBeenCalled()
    })

    it('should invoke the function after the delay if trailing is true', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {trailing: true})

        throttled('first call')
        vi.advanceTimersByTime(1000)
        expect(fn).toHaveBeenCalledWith('first call')
    })

    it('should not invoke the function after the delay if trailing is false', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {trailing: false, leading: false})

        throttled('first call')
        vi.advanceTimersByTime(1000)
        expect(fn).not.toHaveBeenCalled()
    })

    it('should throttle multiple calls within the delay period', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {leading: true})

        throttled('first call')
        throttled('second call')
        throttled('third call')

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('first call')

        vi.advanceTimersByTime(1000)

        expect(fn).toHaveBeenCalledTimes(2)
        expect(fn).toHaveBeenCalledWith('third call')
    })

    it('should reset the throttle if canceled', () => {
        const fn = vi.fn()
        const {throttled, cancel} = throttle(fn, 1000, {leading: true})

        throttled('first call')
        expect(fn).toHaveBeenCalledWith('first call')

        cancel()
        vi.advanceTimersByTime(1000)
        throttled('second call')
        expect(fn).not.toHaveBeenCalledWith('second call')
    })

    it('should handle leading and trailing options correctly', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {leading: true, trailing: true})

        throttled('first call')
        expect(fn).toHaveBeenCalledWith('first call')

        throttled('second call')
        throttled('third call')

        vi.advanceTimersByTime(1000)
        expect(fn).toHaveBeenCalledWith('third call')
    })

    it('should not call the function again if canceled before delay', () => {
        const fn = vi.fn()
        const {throttled, cancel} = throttle(fn, 1000)

        throttled('first call')
        cancel()
        vi.advanceTimersByTime(1000)

        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should call the function on the trailing edge if leading is false', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {leading: false, trailing: true})

        throttled('first call')
        expect(fn).not.toHaveBeenCalled()

        vi.advanceTimersByTime(1000)
        expect(fn).toHaveBeenCalledWith('first call')
    })

    it('should not invoke the function multiple times within the delay period', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {leading: true, trailing: false})

        throttled('first call')
        throttled('second call')
        throttled('third call')

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('first call')

        vi.advanceTimersByTime(1000)
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should invoke the function immediately if maxWait is reached', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000, {leading: false, trailing: true, maxWait: 1500})

        throttled('first call')
        vi.advanceTimersByTime(1500)
        expect(fn).toHaveBeenCalledWith('first call')
    })

    it('should handle calls made after the delay correctly', () => {
        const fn = vi.fn()
        const {throttled} = throttle(fn, 1000)

        throttled('first call')
        vi.advanceTimersByTime(1000)
        throttled('second call')
        vi.advanceTimersByTime(1000)
        throttled('third call')
        vi.advanceTimersByTime(1000)

        expect(fn).toHaveBeenCalledTimes(3)
        expect(fn).toHaveBeenCalledWith('first call')
        expect(fn).toHaveBeenCalledWith('second call')
        expect(fn).toHaveBeenCalledWith('third call')
    })
})
