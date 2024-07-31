#!/bin/bash

read battery <<< $(echo "$(upower -i /org/freedesktop/UPower/devices/battery_BATT | grep percentage | awk '{print int($2)}')")
read battery_state <<< $(echo "$(upower -i /org/freedesktop/UPower/devices/battery_BATT | grep state | awk '{print $2}')")

total_output=""

if [ $battery_state = "charging" ]
then
total_output=""
elif [ $battery -lt 5 ]
then
total_output=""
elif [ $battery -lt 35 ]
then
total_output=""
elif [ $battery -lt 65 ]
then
total_output=""
elif [ $battery -lt 85 ]
then
total_output=""
else
total_output=""
fi

echo "$total_output ${battery}%"