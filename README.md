# AutoRoster
## Description
Automatic roster maker for the Phillipian's Graphic Design section! Manually copy-pasting player details from the Andover Athletics website is NOT graphic NOR design. Therefore, it shouldn't be done by graphic, or a human at all.
James Xiao '25 CXLVII

## Setup and Instructions
1. Create a copy of the ```Roster TEMPLATE.ai``` Adobe Illustrator file and place it in where you would usually house your graphic design files. Do not modify the file.
2. Copy the Andover Athletics roster link for the roster you want to create.
3. Open ```roster_scraping_WINDOWS.exe``` or ```roster_scraping_MacOS.exe``` depending on whether you are using the Windows or macOS operating system. Follow instructions in terminal.
4. Once the program closes, navigate to your copied roster template Illustrator file. Go to File>>Scripts>>Other Script and click on ```auto_roster_script.jsx```.
5. After some rearranging and formatting of players and adding graphics, you should be all set!

## Details
A Python file (```roster_scraping.py```) is responsible for scraping the Andover Athletics roster webpage using BeautifulSoup. This data is then processed and stored to a JSON file.
A Python executable was created with PyInstaller for both Windows and MacOS, so users will not need to install dependencies to run the script.
Python cannot effectively interact with Adobe Illustrator on its own, but Illustrator has an automation tool called scripting. A JavaScript file (```auto_roster_script.jsx```) is run in an .ai document that reads from the JSON file and copies the data onto the artboard.
the ```json2.js``` file is used so ```auto_roster_script.jsx``` can read from the JSON data file.
