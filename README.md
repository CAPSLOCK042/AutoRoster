# AutoRoster
## Description
Automatic roster maker for the Phillipian's Graphic Design section! Manually copy-pasting player details from the Andover Athletics website is NOT graphic NOR design. Therefore, it shouldn't be done by graphic, or a human at all.

James Xiao '25 CXLVII

## Setup and Instructions
1. Clone this repository or download and unzip it.
2. Create a copy of the ```Roster TEMPLATE.ai``` Adobe Illustrator file and place it in where you would usually house your graphic design files. Do not modify the file.
3. Copy the Andover Athletics roster link for the roster you want to create.
4. **For Windows users:**
    1. Open ```roster_scraping_WINDOWS.exe``` and follow instructions in terminal.
5. **For macOS users:**  
Unfortunately, .exe files compatible with Windows cannot be executed by macOS. Furthermore, macOS-compatible .exe files, once pushed to GitHub and redownloaded will be detected as malware. Because of this, it is easier to just create the .exe file from the Python file locally on your device. If anyone knows other workarounds to this, let me know!  
    1. Open up Terminal and navigate to the folder that AutoRoster resides in.
    2. Type in ```pip install pyinstaller==5.1``` in the terminal.
    3. Type in ```pyinstaller --onefile roster_scraping.py```
        - It is possible that PyInstaller will return an error regarding pathlib. This may be because you installed pyinstaller as the latest version, and not version 5.1.
    4. After loading, you will see a folder named ```dist``` in the AutoRoster folder. Inside should be a ```roster_scraping``` executable file. Move this file into the outer AutoRoster folder, in the same folder as json2.js and the other files.
    5. Execute the file. It may take a while to load, but once it does, follow the instructions in terminal. **The processes above for macOS users only need to be done once! Once you have the executable, you can use it for all other rosters created.**
6. Once the program closes, you should see a newly-created/updated ```data.json``` file in the AutoRoster folder. 
7. Navigate to your copied roster template Illustrator file. Go to File>>Scripts>>Other Script and click on ```auto_roster_script.jsx```. The file should autopopulate with all players, captains, and managers
8. After some rearranging and formatting of players and adding graphics, you should be all set!

## Details
A Python file (```roster_scraping.py```) is responsible for scraping the Andover Athletics roster webpage using BeautifulSoup. This data is then processed and stored to a JSON file.

A Python executable was created with PyInstaller for both Windows and MacOS, so users will not need to install dependencies to run the script.

Python cannot effectively interact with Adobe Illustrator on its own, but Illustrator has an automation tool called scripting. A JavaScript file (```auto_roster_script.jsx```) is run in an .ai document that reads from the JSON file and copies the data onto the artboard.

The ```json2.js``` file is used so ```auto_roster_script.jsx``` can read from the JSON data file.
