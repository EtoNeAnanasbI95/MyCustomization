#!/usr/bin/env bash
# Скриншоты, OCR и пипетка.
#   capture.sh region   - область -> редактор satty
#   capture.sh window   - активное окно -> satty
#   capture.sh screen   - монитор под курсором -> satty
#   capture.sh quick    - область сразу в буфер и в ~/Pictures/Screenshots, без редактора
#   capture.sh ocr      - текст из области -> буфер
#   capture.sh color    - пипетка, HEX -> буфер
#   capture.sh record [region|focused|portal] - начать запись экрана, либо остановить, если уже идёт
#   capture.sh menu     - меню со всем этим
set -euo pipefail

DIR="$HOME/Pictures/Screenshots"
mkdir -p "$DIR"
notify() { notify-send -a "Скриншот" "$@" 2>/dev/null || true; }

region()  { slurp -d -b '#00000066' -c '#f39959ff' -w 2; }
edit()    { satty --filename - ; }

# Заморозка экрана на время выделения (wayfreeze рисует снимок оверлеем).
# Без wayfreeze просто работаем по живому экрану.
FZ=
freeze()   { command -v wayfreeze >/dev/null || return 0; wayfreeze >/dev/null 2>&1 & FZ=$!; sleep 0.15; }
unfreeze() { [[ -n $FZ ]] && kill "$FZ" 2>/dev/null || true; FZ=; }
# Область -> PNG-файл (с заморозкой), оверлей снимается сразу после grim
grab_region() {
  freeze
  local g; g=$(region) || { unfreeze; return 1; }
  grim -g "$g" "$1"; unfreeze
}

active_window_geom() {
  hyprctl activewindow -j | python3 -I -c '
import json,sys
w=json.load(sys.stdin)
x,y=w["at"]; W,H=w["size"]
print(f"{x},{y} {W}x{H}")'
}

focused_monitor() {
  hyprctl monitors -j | python3 -I -c '
import json,sys
print(next(m["name"] for m in json.load(sys.stdin) if m["focused"]))'
}

REC="noctalia msg plugin noctalia/screen_recorder:service all"
recording() { pgrep -f '^(/usr/bin/)?gpu-screen-recorder' >/dev/null; }

case "${1:-region}" in
  record)
    if recording; then $REC stop >/dev/null
    else $REC start "${2:-region}" >/dev/null; fi ;;
  region)
    t=$(mktemp --suffix=.png); trap 'rm -f "$t"' EXIT
    grab_region "$t" || exit 0
    edit < "$t" ;;
  window) grim -g "$(active_window_geom)" - | edit ;;
  screen) grim -o "$(focused_monitor)" - | edit ;;
  quick)
    f="$DIR/$(date +%Y-%m-%d_%H-%M-%S).png"
    grab_region "$f" || exit 0
    wl-copy < "$f" && notify -i "$f" "Скопировано в буфер" "$f" ;;
  ocr)
    t=$(mktemp --suffix=.png); trap 'rm -f "$t"' EXIT
    grab_region "$t" || exit 0
    text=$(tesseract "$t" - -l rus+eng --psm 6 2>/dev/null | sed -e 's/[[:space:]]*$//' | sed -e :a -e '/^\n*$/{$d;N;ba' -e '}')
    if [[ -n $text ]]; then printf '%s' "$text" | wl-copy; notify "Текст скопирован" "$(printf '%s' "$text" | head -c 200)"
    else notify "Текст не найден"; fi ;;
  color)
    c=$(hyprpicker -a -f hex 2>/dev/null) || exit 0
    [[ -n $c ]] && notify "Цвет скопирован" "$c" ;;
  menu)
    choice=$(printf '%s\n' \
      "󰩭  Область → редактор" \
      "󰖯  Окно → редактор" \
      "󰍹  Весь экран → редактор" \
      "󰆏  Область → сразу в буфер" \
      "󰊄  Текст с экрана (OCR)" \
      "󰈊  Пипетка" \
      "󰑋  Записать область" \
      "󰑋  Записать экран" \
      "󰉋  Открыть папку скриншотов" |
      rofi -dmenu -i -no-custom -p "Захват" -theme-str 'window {width: 26em;} listview {lines: 9;}') || exit 0
    sleep 0.2   # дать rofi закрыться, чтобы он не попал в кадр
    case "$choice" in
      *"Область → редактор"*) exec "$0" region ;;
      *"Окно"*)               exec "$0" window ;;
      *"Весь экран"*)         exec "$0" screen ;;
      *"сразу в буфер"*)      exec "$0" quick ;;
      *"OCR"*)                exec "$0" ocr ;;
      *"Пипетка"*)            exec "$0" color ;;
      *"Записать область"*)   exec "$0" record region ;;
      *"Записать экран"*)     exec "$0" record focused ;;
      *"папку"*)              xdg-open "$DIR" ;;
    esac ;;
  *) echo "usage: $0 {region|window|screen|quick|ocr|color|record|menu}" >&2; exit 1 ;;
esac
