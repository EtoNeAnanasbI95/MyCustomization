#!/bin/bash

state=$(eww get open_record_menu)

open_record_menu() {
    if [[ -z $(eww list-windows | grep "*record_menu") ]]; then
        eww open record_menu
    fi
    eww update open_record_menu=true
}

close_record_menu() {
    eww update open_record_menu=false
}

toggle_record_menu() {
    if [[ $state == "true" ]]; then
        close_record_menu
    else
        open_record_menu
    fi
}

case $1 in
--toggle)
    toggle_record_menu
    exit 0 ;;
--record)
    case $2 in
    all) 
        toggle_record_menu
        sleep 0.11
        hyprshot -o ~/Pictures/Records -z -m output &
        ;;
    area)
        toggle_record_menu
        sleep 0.11
        wf-recorder -o ~/Pictures/Records -f "$($(date) + '.mp4')" -g $(slurp) &
        ;;
    esac
    ;;
esac
