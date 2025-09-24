/* eslint-disable no-console */
import {execSync} from 'child_process'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname)

// 파일 경로들
const tsconfigPath = path.join(projectRoot, 'tsconfig.json')
const svgUniqueIdPath = path.join(projectRoot, 'src/SvgUniqueID.tsx')

// 백업 파일 경로들
const tsconfigBackupPath = path.join(projectRoot, 'tsconfig.json.backup')
const svgUniqueIdBackupPath = path.join(projectRoot, 'src/SvgUniqueID.tsx.backup')

console.log('🔄 React 17 타입 생성 시작...')

try {
    // 1. 원본 파일들 백업
    console.log('📋 원본 파일 백업 중...')
    fs.copyFileSync(tsconfigPath, tsconfigBackupPath)
    fs.copyFileSync(svgUniqueIdPath, svgUniqueIdBackupPath)

    // 2. tsconfig.json 수정
    console.log('⚙️  tsconfig.json 수정 중...')
    const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8')
    const tsconfig = JSON.parse(tsconfigContent)

    // jsx 옵션을 react로 변경
    tsconfig.compilerOptions = tsconfig.compilerOptions || {}
    tsconfig.compilerOptions.jsx = 'react'
    tsconfig.compilerOptions.jsxFactory = 'React.createElement'
    tsconfig.compilerOptions.jsxFragmentFactory = 'React.Fragment'

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2))

    // 3. SvgUniqueID.tsx에 React import 추가
    console.log('📝 SvgUniqueID.tsx에 React import 추가 중...')
    const svgContent = fs.readFileSync(svgUniqueIdPath, 'utf8')

    // 이미 React import가 있는지 확인
    if (!svgContent.includes("import React from 'react'")) {
        // 첫 번째 import 문 앞에 React import 추가
        const modifiedContent = svgContent.replace(/^(import.*)/m, "import React from 'react'\n$1")
        fs.writeFileSync(svgUniqueIdPath, modifiedContent)
    }

    // 4. tsup 실행
    console.log('🔨 tsup으로 타입 생성 중...')
    execSync('npx tsup --config tsup.config.react17.ts', {
        stdio: 'inherit',
        cwd: projectRoot,
    })

    console.log('✅ React 17 타입 생성 완료!')
} catch (error) {
    console.error('❌ 오류 발생:', error.message)
} finally {
    // 5. 원본 파일들 복원
    console.log('🔄 원본 파일 복원 중...')

    try {
        if (fs.existsSync(tsconfigBackupPath)) {
            fs.copyFileSync(tsconfigBackupPath, tsconfigPath)
            fs.unlinkSync(tsconfigBackupPath)
        }

        if (fs.existsSync(svgUniqueIdBackupPath)) {
            fs.copyFileSync(svgUniqueIdBackupPath, svgUniqueIdPath)
            fs.unlinkSync(svgUniqueIdBackupPath)
        }

        console.log('✅ 원본 파일 복원 완료!')
    } catch (restoreError) {
        console.error('❌ 원본 파일 복원 실패:', restoreError.message)
        console.log('💡 수동으로 .backup 파일들을 원본으로 복사해주세요.')
    }
}

console.log('🎉 React 17 타입 빌드 프로세스 완료!')
