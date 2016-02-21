# parses LuaUPnP.log for sensor output data

# Call shell script to pull LuaUpNP.log file from Vera
import time
import subprocess
import datetime
from collections import deque
import os
import json
import requests

# global variable
stopTime = datetime.datetime.now().strftime("%H:%M:%S:%f")[:-3]
stopLine = ""

def initSensorMap():
	sensorMap = dict()
	
	# Sherri
	sensorMap['1'] = 'Distance'
	# Jeff
	sensorMap['2'] = 'Distance'
	# Andy
	sensorMap['3'] = 'Distance'
	# Dave
	sensorMap['4'] = 'Distance'
	# DLN
	sensorMap['31'] = 'Sound'
	
	# Other ones

	return sensorMap

def initValueTypes():
	valueTypes = []
	valueTypes.append('CurrentDistance,')
	valueTypes.append('Variable2,')

	return valueTypes


def writeEntry(inFile, outFile, sensorMap, valueTypes, entryDeque):
	global stopTime
	global stopLine

	for curLine in reversed(inFile.readlines()):
		# if any of value type keywords (e.g. "CurrentDistance, "") are in the line
		# then read the line as an entry
		# if any(valType in curLine for valType in valueTypes):
		fields = [field.lstrip() for field in curLine.split(",")]
		sensorID = fields[3].split(" ")[0].strip()
		sensorValue = fields[2].strip()
		sensorType = sensorMap[sensorID]
		timeStamp = fields[0].split("\t")[1].split(" ")[1].replace(".", ":")

		entry = timeStamp+"\t"+sensorType+"\t"+sensorID+"\t"+sensorValue+"\n"

		# to avoid reading in duplicates
		if entry == stopLine:
			print "SAAAAAMESIES BREAAAAK"
			break

		if int(timeStamp.replace(":", "")) < int(stopTime.replace(":","")):
			# *** to fix??: theoretically we could end up with a sensor trip that is never acknowledged
			if int(timeStamp.replace(":", "")) == int(stopTime.replace(":","")):
				raise StandardError("Skipped a sensor reading")
			print "BREAK"
			print "timestamp", timeStamp
			print "stoptime", stopTime
			break

		entryDeque.append(entry)

	# # peek first item in queue (newest time)
	if entryDeque:
		stopTime = entryDeque[0].split("\t")[0]
		stopLine = entryDeque[0]

		# while deque is not empty:
		while entryDeque:
			curEntry = entryDeque.pop()
			print "****WRITTEN:   ", curEntry

			outFile.write(curEntry)

	return

sensorMap = initSensorMap()
valueTypes = initValueTypes()

while True:
	print "--------------------------------------"
	print datetime.datetime.now().strftime("%m-%d_%H.%M.%S.%f")[:-3]
	print

	subprocess.call(['./rsync.sh'])

	entryDeque = deque()

	with open("filtered.log", "r") as fullLog:
	# with open("LuaUPnP.log", "r") as fullLog:

		# Set the title of the output file to the current time
		now = datetime.datetime.now()
		output_title = now.strftime("%m-%d_%H.%M.%S.%f")[:-3]

		# Creates output file
		# with open("log_"+output_title+".log", "w") as outLog:
		with open("webpage.js/logFileUpdating.txt", "w") as outLog:
			writeEntry(fullLog, outLog, sensorMap, valueTypes, entryDeque)