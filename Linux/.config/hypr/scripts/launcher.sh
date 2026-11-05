#!/usr/bin/env bash
# Открыть лаунчер Noctalia на английской раскладке, после закрытия вернуть прежнюю.
# Использование: launcher.sh [id панели]   (по умолчанию launcher)
PANEL="${1:-launcher}"

layout_index() {
  hyprctl devices -j | python3 -I -c '
import json,sys
kb=[k for k in json.load(sys.stdin)["keyboards"] if k["main"]]
print(kb[0]["active_layout_index"] if kb else 0)'
}

panel_open() {
  hyprctl layers -j | python3 -I -c '
import json,sys
ns={l["namespace"] for d in json.load(sys.stdin).values() for ls in d["levels"].values() for l in ls}
sys.exit(0 if ns & {"noctalia-panel","noctalia-attached-panel"} else 1)'
}

# Лаунчер уже открыт: просто закрыть (раскладку вернёт тот запуск, который его открыл)
if panel_open; then noctalia msg panel-toggle "$PANEL"; exit 0; fi

prev=$(layout_index)
[[ $prev != 0 ]] && hyprctl switchxkblayout all 0 >/dev/null
noctalia msg panel-toggle "$PANEL" >/dev/null

[[ $prev == 0 ]] && exit 0

# Ждём, пока панель появится (до 2 с), потом пока не закроется (до 10 мин)
for _ in $(seq 20); do panel_open && break; sleep 0.1; done
for _ in $(seq 3000); do panel_open || break; sleep 0.2; done

# Вернуть раскладку, если пользователь сам её не менял
[[ $(layout_index) == 0 ]] && hyprctl switchxkblayout all "$prev" >/dev/null
