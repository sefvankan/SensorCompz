# parses LuaUPnP.log for sensor output data

import subprocess
subprocess.call(['./scpLua.sh'])

#TODO: put all file processing in while loop for real-time logging

# Takes file that we SCP from Vera called "50s.log"
f = open("LuaUPnP.log", "r")

import datetime
# Creates output file
nf = open("logAsOf "+str(datetime.datetime.now())+".log", "w")

for line in reversed(f.readlines()):
    # Locates triggered distance sensor lines and saves index of
    # distance sensor string within line so we can locate distance value

    if "1, 115" in line[102:111]:
        sensorID = "115"
        timeStamp = ""
        if line[19] == ".":
        	timeStamp = line[12:19]
        else:
        	timeStamp = line[12:20]
        sensorType = "Motion"
        nf.write(timeStamp + "    " + sensorType + "    " + sensorID + "\n")
    
    elif ", 117" in line[111:119]:
		sensorID = "117"
		timeStamp = ""
		if line[19] == ".":
			timeStamp = line[12:19]
		else:
			timeStamp = line[12:20]
		sensorType = "Distance"

		i=110
		distance = ""
		while line[i] != ",":
			distance += line[i]
			i += 1
		nf.write(timeStamp+"    "+sensorType+"    "+sensorID+"    "+distance+"\n")

    elif ", 118" in line[111:119]:
        sensorID = "118"
        timeStamp = ""
        if line[19] == ".":
        	timeStamp = line[12:19]
        else:
        	timeStamp = line[12:20]
        sensorType = "Distance"

        i=110
        distance = ""
        while line[i] != ",":
            distance += line[i]
            i += 1
        nf.write(timeStamp+"    "+sensorType+"    "+sensorID+"    "+distance+"\n")
        

f.close()
nf.close()