#!/usr/bin/env bash
# Xft.dpi для X11-приложений (force_zero_scaling) по текущим мониторам.
# У XWayland один DPI на все экраны → берём максимальный масштаб среди включённых мониторов.
# Уже открытые X11-окна размер не меняют — нужен перезапуск приложения.
sleep "${1:-0}"
export DISPLAY="${DISPLAY:-:1}"
scale=$(hyprctl monitors -j | jq '[.[] | select(.disabled | not) | .scale] | max // 1')
dpi=$(awk -v s="$scale" 'BEGIN { printf "%d", 96 * s + 0.5 }')
# Курсор НЕ умножаем на масштаб: Hyprland сам растягивает X-курсор.
cur=${XCURSOR_SIZE:-24}
xrdb -merge ~/.Xresources 2>/dev/null
printf 'Xft.dpi: %s\nXcursor.size: %s\n' "$dpi" "$cur" | xrdb -merge
echo "xwayland-dpi: scale=$scale dpi=$dpi cursor=$cur"
