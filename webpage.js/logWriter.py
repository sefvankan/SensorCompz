import datetime
import time
from pytz import timezone
import random

def getTime():
	central = timezone('US/Central')
	ctTime = datetime.datetime.now(central)
	return ctTime

delay = 3

sensorList = ['Distance', 'Motion', 'Color']

while True:
	curTime = getTime()
	with open('logFileUpdating.txt', 'w') as f:
		numEntries = random.randint(0,delay)
		timeList = []
		entryList = []
		for i in xrange(0,numEntries+1):
			secOffset = random.randint(0,delay-1)
			millisOffset = random.randint(0,999)
			newTime = curTime + datetime.timedelta(seconds = secOffset)
			newTime += datetime.timedelta(milliseconds = millisOffset)
			timeList.append(newTime)
		timeList.sort()
		if len(timeList) > 0:
			for indx, t in enumerate(timeList):
				timeToWrite = t.strftime('%H:%M:%S:%f')[:-3]
				sensorID = random.randint(0,len(sensorList)-1)
				if indx != len(timeList)-1:
					entry = timeToWrite+'    '+sensorList[sensorID]+'    '+'100'+'\n'
				else:
					entry = timeToWrite+'    '+sensorList[sensorID]+'    '+'100'
				entryList.append(entry)
			for e in entryList:
				print e
				f.write(e)
	time.sleep(delay)