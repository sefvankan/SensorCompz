import subprocess
import sys
import os

start = sys.argv[1]
location = sys.argv[2]
try: 
	mp3 = sys.argv[3]
except IndexError:
	mp3 = 0

if start == "Cmin":
	scales = ["Bfmin", "Dmin", "Gmin"]
	pitches = ["-200", "+200", "+700"]
elif start == "Cmaj":
	scales = ["Fsmaj", "Dmaj", "Gmaj"]
	pitches = ["-600", "+200", "+700"]

# if mp3 == 'mp3':
# 	for filename in os.listdir(start):
# 		components = filename.split('_')
# 		name = filename.split('.')[0]
# 		note = components[1]
# 		subprocess.call(['ffmpeg', '-i', start+"/"+filename, '-f', 'mp3', start+"/"+name+'.mp3'])
# 	subprocess.call('rm', '*.wav')

for i in xrange(0,3):
	for filename in os.listdir(start):
		components = filename.split('_')
		name = filename.split('.')[0]
		note = components[1]
		newFilename = scales[i]+"/"+scales[i]+"_"+note+"_"+location+".mp3"
		if mp3 == 'mp3':
			subprocess.call(['ffmpeg', '-i', start+"/"+filename, '-f', 'mp3', start+"/"+name+'.mp3'])
		subprocess.call(['sox', start+"/"+filename, newFilename, "pitch", pitches[i]])