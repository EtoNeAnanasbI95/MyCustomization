#!/usr/bin/env bash
# Двойное SUPER+C: выделенный текст открывается в лаунчере с переводом на русский (плагин Translator, /tr).
# Копировать заранее не нужно: берётся текущее выделение (primary selection), если его нет - буфер обмена.
STATE="${XDG_RUNTIME_DIR:-/tmp}/translate-copy.last"
now=$(date +%s%3N)
last=$(cat "$STATE" 2>/dev/null || echo 0)
echo "$now" > "$STATE"
(( now - last < 450 )) || exit 0
rm -f "$STATE"

clean() { tr '\n\t' '  ' | sed 's/  */ /g; s/^ //; s/ $//' | head -c 500; }
text=$(wl-paste -n --primary --type text 2>/dev/null | clean)
[ -n "$text" ] || text=$(wl-paste -n --type text 2>/dev/null | clean)
[ -n "$text" ] || exit 0
noctalia msg panel-open launcher "/tr $text" >/dev/null
