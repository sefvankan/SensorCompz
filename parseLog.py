# parses LuaUPnP.log for sensor output data

# Call shell script to pull LuaUpNP.log file from Vera
import subprocess
subprocess.call(['./scpLua.sh'])

# TODO: put all file processing in while loop for real-time logging

f = open("LuaUPnP.log", "r")

# Set the title of the output file to the current time
import datetime
now = datetime.datetime.now()
output_title = now.strftime("%m-%d_%H.%M.%S")

# Creates output file
nf = open("log_"+output_title+".log", "w")

# Takes most recent time from previous log file
r = open("most_recent_time.txt", "r")
stopTime = r.readline()
r.close()

# Locates triggered sensor lines
# Writes: timestamp, sensor ID and distance information to outputted log file
for line in reversed(f.readlines()):

	# Motion Sensor 1:
	if "1, 115" in line[102:111]:
		sensorID = "115"
		timeStamp = ""
		if line[19] == ".":
			timeStamp = line[12:22]
		else:
			timeStamp = line[12:23]
		# Checks if we have overlapped with previous log file
		if int(timeStamp.replace(":", "")) < int(stopTime.replace(":","")):
			break
		sensorType = "Motion"
		nf.write(timeStamp + "    " + sensorType + "    " + sensorID + "\n")

	# Distance Sensor 1:
	elif ", 117" in line[111:119]:
		sensorID = "117"
		timeStamp = ""
		if line[19] == ".":
			timeStamp = line[12:22]
		else:
			timeStamp = line[12:23]
		# Checks if we have overlapped with previous log file
		if int(timeStamp.replace(":", "")) < int(stopTime.replace(":","")):
			break
		sensorType = "Distance"
		i=110
		distance = ""
		while line[i] != ",":
			distance += line[i]
			i += 1
		nf.write(timeStamp+"    "+sensorType+"    "+sensorID+"    "+distance+"\n")

	# Distance Sensor 2:
	elif ", 118" in line[111:119]:
		sensorID = "118"
		timeStamp = ""
		if line[19] == ".":
			timeStamp = line[12:22]
		else:
			timeStamp = line[12:23]
		# Checks if we have overlapped with previous log file
		if int(timeStamp.replace(":", "")) < int(stopTime.replace(":","")):
			break
		sensorType = "Distance"
		i=110
		distance = ""
		while line[i] != ",":
			distance += line[i]
			i += 1
		nf.write(timeStamp+"    "+sensorType+"    "+sensorID+"    "+distance+"\n")

f.close()
nf.close()

# Save most recent time
s = open("log_"+output_title+".log", "r")
ntLine = s.readline()
s.close()

newTime = ntLine.split("    ")
t = open("most_recent_time.txt", "w")
t.write(newTime[0])
t.close()













