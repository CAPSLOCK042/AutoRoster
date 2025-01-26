# -*- coding: utf-8 -*-
"""
@author: james x '25

This file scrapes the roster of an Andover Athletics website team roster page and saves approprite players,
captains, and managers to a JSON file in the parent folder.
"""

import requests
from bs4 import BeautifulSoup
import re
import json
import os
import time
import sys

# os.chdir(sys._MEIPASS)

# roster type of 3 is 3 columns: name, class, hometown
# roster type of 4 is 4 columns: name, class, hometown, number
# roster type of 5 is 5 columns: name, class, hometown, position, number
roster = {"roster_type" : 3, "captains": [], "players" : [], "managers" : []}
roster_type = 3

# default dictionaries for players (includes captains) and managers
player_dict_default = {"name" : "", "year" : "", "hometown" : "", "number" : ""}
manager_dict_default = {"name" : "", "year" : "", "hometown" : ""}

# make a get request with an input link
link = input("Provide the link to the sport roster on the Andover Athletics page: ")
print("Loading...")
r = requests.get(link)

# use BeautifulSoup library to scrape Andover Althetics roster page
soup = BeautifulSoup(r.content, 'html.parser')
table = soup.find('table', class_='is-responsive sortable')

# locate table of players and header of that table
players = table.find("tbody").find_all('tr')
header = table.find("thead").find_all('th')

# roster type is declared from guide above, using length of header
roster_type = len(header)

# function to clean up whitespace in text
def clean(text):
    return re.sub(r'\s+', ' ', text.strip())

# function to remove middle initials of a name
def remove_middle_initial(name):
    name_list = name.split()
    for n in name_list:
        if len(n) == 2 and n[-1] == '.':
            name_list.remove(n)
            continue
    return " ".join(name_list)

# function to add a player to the player dictionary
def add_player(p):
    stats = p.find_all("td")
    player_dict = player_dict_default.copy()
    # get the first 3 columns of name, class, hometown
    player_dict["name"] = remove_middle_initial(clean(stats[0].text))
    player_dict["year"] = clean(stats[1].text)[2:]
    player_dict["hometown"] = clean(stats[2].text)
    # if only 3 columns are necessary (roster_type = 0), then return dictionary
    if roster_type == 3:
        return player_dict
    # else, add the player number according to the roster type. for type 4, number is at index 3. for type 5, number is at index 4
    else:
        player_dict["number"] = clean(stats[roster_type - 1].text)
        return player_dict
    
# function to add a manager, similar code to add_player but uses manager dictionary and defaults to 3 items
def add_manager(m):
    stats = m.find_all("td")
    manager_dict = manager_dict_default.copy()
    # get the first 3 columns of name, class, hometown
    manager_dict["name"] = remove_middle_initial(clean(stats[0].text))
    manager_dict["year"] = clean(stats[1].text)[2:]
    manager_dict["hometown"] = clean(stats[2].text)
    return manager_dict

# if the player is a manager or captain, "manager" or "captain" will be attached to the end of their name
# this function removes it
def remove_last(d):
    name = d["name"].split()
    del name[-1]
    d["name"] = " ".join(name)
    return d

# main loop through the roster
for player in players:
    role = player.find("span", class_="player__role")
    if role:
        if role.text == "Manager":
            roster["managers"].append(remove_last(add_manager(player)))
        elif role.text == "Captain":
            roster["captains"].append(remove_last(add_player(player)))
    else:
        roster["players"].append(add_player(player))
print(roster)

# set roster_type in dictionary to roster type
roster["roster_type"] = roster_type

# dumps roster dictionary as JSON file in parent folder
if getattr(sys, 'frozen', False):
    app_path = sys.executable
    # folder where executable is located
    exe_folder = os.path.dirname(app_path)
else:
    # when running as a normal python script, get the path of script
    exe_folder = os.path.dirname(os.path.realpath(__file__))

json_file_path = os.path.join(exe_folder, 'data.json')

with open(json_file_path, 'w') as outfile:
    json.dump(roster, outfile, indent = 4)

print("\n\nRoster successfully saved to data.json.")
print("Open up Roster TEMPLATE.ai in Adobe Illustrator, and execute the script auto_roster_script.jsx.")
time.sleep(7);