import sleep from './sleep'

const waitPopstateEvent = async (ms: number) => {
    const delayPromise = sleep(ms)
    const popstatePromise = new Promise((resolve) => {
        function backEventListener() {
            resolve(null)
            window.removeEventListener('popstate', backEventListener)
        }
        window.addEventListener('popstate', backEventListener)
    })
    return Promise.race([delayPromise, popstatePromise])
}

interface UserAgentValues {
    isNaverApp: boolean
    isPayApp: boolean
    isIOS: boolean
    isAndroid: boolean
    isMobile: boolean
    isSafari: boolean
}
const backOrClose = async ({isNaverApp, isPayApp, isIOS, isAndroid, isMobile, isSafari}: UserAgentValues, ms = 500) => {
    if (isNaverApp) {
        window.history.back() // 뒤로 갈 페이지 있으면 뒤로, 없으면 탭 닫힘
        return
    }

    if (isPayApp) {
        if (isIOS) {
            window.history.back() // 뒤로 갈 페이지 있으면 뒤로, 없으면 탭 닫힘
        }

        if (isAndroid) {
            // 뒤로가기후 현재 페이지와 동일하다면 현재탭을 닫음
            const prevPageUrl = window.location.href

            window.history.back()
            await waitPopstateEvent(ms)

            const currentPageUrl = window.location.href

            if (prevPageUrl === currentPageUrl) {
                window.location.href = 'naverapp://closewindow'
            }
        }
        return
    }

    // 이하 웹브라우저에서 동작
    if (window.history.length === 1) {
        window.close()
        return
    }

    // iOS safari 에서 window.open("url") 할 때 history.length가 2부터 시작하는 이슈로 인해 예외처리
    if (window.history.length === 2 && isMobile && isSafari) {
        try {
            window.opener?.location.href === document.referrer && window.close()
            return
        } catch {
            // opener의 도메인이 다를때 cors 오류 발생하여 try-catch 사용
        }
    }

    const prevPageUrl = window.location.href

    window.history.back()
    await waitPopstateEvent(ms)

    const currentPageUrl = window.location.href

    // 뒤로가기후 현재 페이지와 동일하다면 페이지를 닫음
    if (prevPageUrl === currentPageUrl) {
        window.close()
    }
}

export default backOrClose
