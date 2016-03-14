import urllib
import datetime

# Takes information from main about which sensor is being requested
# For data, and returns an output string.
def writeEntry(sensorID, serviceID, variable, sensorType):

	# Create HTTP request
	http_request = "http://137.22.30.188/port_3480/data_request?id=variableget&DeviceNum=%s&serviceId=urn:micasaverde-com:serviceId:%s&Variable=%s"%(sensorID,serviceID,variable)
	http_return = urllib.urlopen(http_request)
	value = http_return.read()
	http_return.close()

	# Information required for .log file
	timeStamp = datetime.datetime.now().strftime("%H:%M:%S:%f")[:-3]
	outputString = "%s\t%s\t%s\t%s\n"%(timeStamp,sensorType,sensorID,value)

	return outputString

def main():

	# Output file is called filtered.log...can be changed
	outputFile = open("filtered.log", "w")

	while True:

		# Sherri
		entry = writeEntry("1","DistanceSensor1","CurrentDistance","Distance")
		# Jeff
		entry = writeEntry("2","DistanceSensor1","CurrentDistance","Distance")
		# Andy
		entry = writeEntry("3","DistanceSensor1","CurrentDistance","Distance")
		# Dave
		entry = writeEntry("4","DistanceSensor1","CurrentDistance","Distance")
		# Goldfeather
		entry = writeEntry("5","DistanceSensor1","CurrentDistance","Distance")

		# Not sure which names correspond to color vs. sound sensor?
		# Layla
		entry = writeEntry("21","VContainer1","Variable1","Color")
		# DLN
		entry = writeEntry("2","VContainer2","Variable","Sound")

		# Queue stuff should go here....
		outputFile.write(entry)

	outputFile.close()
	

if __name__ == "__main__":
	main()


