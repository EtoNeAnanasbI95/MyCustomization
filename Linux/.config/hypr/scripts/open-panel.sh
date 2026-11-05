#!/usr/bin/env bash
# Открывает панель Noctalia по названию из ~/.config/noctalia/panels.tsv (для лаунчера)
title="${1%%$'\t'*}"
target=$(awk -F'\t' -v t="$title" '!/^#/ && $1==t {print $3; exit}' ~/.config/noctalia/panels.tsv)
[ -n "$target" ] || exit 0
sleep 0.15   # дать лаунчеру закрыться
case "$target" in
  ipc:*) noctalia msg ${target#ipc:} ;;
  *)     noctalia msg panel-toggle "$target" ;;
esac
