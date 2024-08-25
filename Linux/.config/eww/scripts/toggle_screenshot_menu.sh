#!/bin/bash

state=$(eww get open_screenshot_menu)

open_screenshot_menu() {
    if [[ -z $(eww list-windows | grep "*screenshot_menu") ]]; then
        eww open screenshot_menu
    fi
    eww update open_screenshot_menu=true
}

close_screenshot_menu() {
    eww update open_screenshot_menu=false
}

toggle_screenshot_menu() {
    if [[ $state == "true" ]]; then
        close_screenshot_menu
    else
        open_screenshot_menu
    fi
}

case $1 in
--toggle)
    toggle_screenshot_menu
    exit 0 ;;
--screenshot)
    case $2 in
    all) 
        toggle_screenshot_menu
        sleep 0.16
        hyprshot -o ~/Pictures/Screenshots -z -m output &
        ;;
    window)
        toggle_screenshot_menu
        sleep 0.16
        hyprshot -o ~/Pictures/Screenshots -z -m window &
        ;;
    area)
        toggle_screenshot_menu
        sleep 0.16
        hyprshot -o ~/Pictures/Screenshots -z -m region &
        ;;
    esac
    ;;
esac
