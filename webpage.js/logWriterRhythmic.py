import datetime
import time
from pytz import timezone
import random

def getTime():
	central = timezone('US/Central')
	ctTime = datetime.datetime.now(central)
	return ctTime

delay = 3

sensorList = ['Distance', 'Distance', 'Distance', 'Distance', 'Motion', 'Color']

while True:
	curTime = getTime()
	print '\nNOW: '+curTime.strftime('%H:%M:%S:%f')[:-3]+'\n'

	with open('logFileUpdating.txt', 'w') as f:
		# numEntries = random.randint(0,delay)
		numEntries = delay
		timeList = []
		entryList = []
		for i in xrange(0,numEntries):
			# secOffset = random.randint(0,delay-1)
			secOffset = i;
			# millisOffset = random.randint(0,999)
			millisOffset = 0;
			newTime = curTime + datetime.timedelta(seconds = secOffset)
			newTime += datetime.timedelta(milliseconds = millisOffset)
			timeList.append(newTime)
		timeList.sort()
		if len(timeList) > 0:
			for indx, t in enumerate(timeList):
				sensorValue = str(random.randint(0,99))
				timeToWrite = t.strftime('%H:%M:%S:%f')[:-3]
				sensorType = random.randint(0,len(sensorList)-1)
				sensor = sensorList[sensorType]
				if sensor == 'Distance':
					sensorID = str(random.randint(1,3))
				else:
					sensorID = '1'
				sensorValue = str(random.randint(0,300))
				if indx != len(timeList)-1:
					entry = timeToWrite+'    '+sensor+'    '+sensorID+'    '+sensorValue+'\n'
				else:
					entry = timeToWrite+'    '+sensor+'    '+sensorID+'    '+sensorValue
				entryList.append(entry)
			for e in entryList:
				print e
				f.write(e)
	time.sleep(delay)