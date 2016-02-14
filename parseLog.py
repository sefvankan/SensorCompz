# parses LuaUPnP.log for sensor output data

# Call shell script to pull LuaUpNP.log file from Vera
import time
import subprocess
import datetime
from collections import deque
import os

# global variable
stopTime = datetime.datetime.now().strftime("%H:%M:%S:%f")[:-3]
stopLine = ""

def initSensorMap():
	sensorMap = dict()
	sensorMap['34'] = 'Distance'
	# sensorMap['31'] = 'Distance'
	sensorMap['33'] = 'Distance'

	return sensorMap

def initValueTypes():
	valueTypes = []
	valueTypes.append('CurrentDistance,')

	return valueTypes


def writeEntry(inFile, outFile, sensorMap, valueTypes, entryDeque):
	global stopTime
	global stopLine

	for curLine in reversed(inFile.readlines()):
		if any(valType in curLine for valType in valueTypes):
			fields = [field.lstrip() for field in curLine.split(",")]
			sensorID = fields[3].split(" ")[0].strip()
			if sensorID == '31':
				continue
			sensorValue = fields[2].strip()
			sensorType = sensorMap[sensorID]
			timeStamp = fields[0].split("\t")[1].split(" ")[1].replace(".", ":")

			entry = timeStamp+"\t"+sensorType+"\t"+sensorID+"\t"+sensorValue+"\n"
			print entry

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
			curEntry = entryDeque.popleft()
			print "****WRITTEN:   ", curEntry

			outFile.write(curEntry)

	return

# subprocess.call(['./openMaster.sh'])


sensorMap = initSensorMap()
valueTypes = initValueTypes()

while True:
	print "--------------------------------------"
	print datetime.datetime.now().strftime("%m-%d_%H.%M.%S.%f")[:-3]
	print

	#subprocess.call(['./scpLua.sh'])
	subprocess.call(['./rsync.sh'])

	entryDeque = deque()

	with open("LuaUPnP.log", "r") as fullLog:

		# Set the title of the output file to the current time
		now = datetime.datetime.now()
		output_title = now.strftime("%m-%d_%H.%M.%S.%f")[:-3]

		# Creates output file
		# with open("log_"+output_title+".log", "w") as outLog:
		with open("webpage.js/logFileUpdating.txt", "w") as outLog:
			writeEntry(fullLog, outLog, sensorMap, valueTypes, entryDeque)