/**
 * 자바스크립트의 쓰레드를 ms 만큼 중지(지연) 시킵니다.
 * 자바의 Thread.sleep()과 유사합니다.
 *
 * @param ms 지연시키고 싶은 시간
 * @returns
 */
export default function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
