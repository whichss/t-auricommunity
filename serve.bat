@echo off
echo Serving static files from out directory...
echo Open your browser to: http://localhost:3000

cd out
python -m http.server 3000

rem If Python is not installed, you can use Node.js instead:
rem npx serve -s . -l 3000
