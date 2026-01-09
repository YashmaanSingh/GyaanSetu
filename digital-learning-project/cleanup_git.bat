@echo off
echo Cleaning up git index...
git rm -r --cached .
echo Adding files back (respecting .gitignore)...
git add .
echo Done! You can now commit your changes.
pause
