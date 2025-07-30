@echo off
echo GitHub에 프로젝트 업로드를 시작합니다...

REM GitHub 저장소 URL을 여기에 입력하세요
set REPO_URL=https://github.com/your-username/nonprofit-website-dev.git

REM Git 초기화 (이미 되어있으면 무시됨)
git init

REM 원격 저장소 추가 (이미 있으면 오류 무시)
git remote add origin %REPO_URL% 2>nul

REM 모든 파일 추가
git add .

REM 커밋
git commit -m "Update project with mobile menu for all pages"

REM 메인 브랜치 설정
git branch -M main

REM GitHub에 푸시
git push -u origin main

echo.
echo 업로드가 완료되었습니다!
echo GitHub Pages 주소: https://your-username.github.io/nonprofit-website-dev
pause
