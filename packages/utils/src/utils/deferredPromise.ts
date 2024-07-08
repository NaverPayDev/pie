/**
 * pending 상태의 promise 객체를 생성하여, 외부에서 resolve, reject 할 수 있는 유틸.
 * Promise 인터페이스를 구현해서 Promise로 취급할 수 있음. (then, catch 지원 및 await 지원)
 *
 * @example
 * const deferredPromise = new DeferredPromise<string>()
 * async function waitAndPrint() {
 *   const name = await deferredPromise // 일반적인 promise로 취급 가능
 *   console.log(`hello, ${name}!`)
 * }
 * waitAndPrint()
 * waitAndPrint()
 * waitAndPrint() // 이 시점에는 console.log가 출력되지 않음
 *
 * deferredPromise.resolve('world')
 * // 이 시점에서 "hello, world!"가 3번 출력됨
 *
 * @example
 * class SomeClass {
 *   private deferredInitialized = new DeferredPromise()
 *
 *   async init() {
 *     // ... await 이런저런 초기화 로직
 *     this.deferredInitialized.resolve()
 *   }
 *
 *   waitUntilInit(): Promise<void> { // Promise 타입으로 리턴 가능
 *     return this.deferredInitialized
 *   }
 * }
 * const instance = new SomeClass()
 * async function someFunction() {
 *   await instance.waitUntilInit() // 다른 어디에선가 초기화를 호출해서 완료할 때 까지 대기
 *   // ... instance를 사용하는 로직
 * }
 */
class DeferredPromise<T = void> implements Promise<T> {
    private readonly promise: Promise<T>

    private _resolve!: (_value: T | PromiseLike<T>) => void

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _reject!: (_reason?: any) => void

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve
            this._reject = reject
        })
    }

    then<TResult1 = T, TResult2 = never>(
        onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): Promise<TResult1 | TResult2> {
        return this.promise.then(onFulfilled, onRejected)
    }

    catch<TResult = never>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): Promise<T | TResult> {
        return this.promise.catch(onRejected)
    }

    finally(onfinally?: (() => void) | null): Promise<T> {
        return this.promise.finally(onfinally)
    }

    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get [Symbol.toStringTag]() {
        return 'DeferredPromise'
    }

    get resolve() {
        return this._resolve
    }

    get reject() {
        return this._reject
    }
}

export default DeferredPromise
