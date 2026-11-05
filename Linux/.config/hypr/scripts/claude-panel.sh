#!/usr/bin/env bash
# Выдвижная панель справа с Claude Code (kitty + tmux, сессия живёт между открытиями).
# Первый вызов запускает, дальше показывает/прячет.
CLASS="claude-panel"
if hyprctl clients -j | grep -q "\"class\": \"$CLASS\""; then
  hyprctl dispatch 'hl.dsp.workspace.toggle_special("claude")' >/dev/null
else
  # tmux держит сессию: закрыл панель - Claude продолжает работать, открыл - всё на месте
  kitty --class "$CLASS" --title "Claude" --directory "$HOME" \
    -e tmux new-session -A -s claude-panel claude &
fi
