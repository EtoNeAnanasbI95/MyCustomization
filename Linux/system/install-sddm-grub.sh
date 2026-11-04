#!/usr/bin/env bash
# SDDM: sddm-astronaut-theme (вариант black_hole)
# GRUB: Graphite grub2 theme (серая, 1080p)
# Запуск: sudo bash install-sddm-grub.sh
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "Запусти через sudo"; exit 1; }

SDDM_VARIANT="${SDDM_VARIANT:-black_hole}"
GRUB_COLOR="${GRUB_COLOR:-default}"   # default | nord
GRUB_SCREEN="${GRUB_SCREEN:-1080p}"   # 1080p | 2k | 4k
TS=$(date +%Y%m%d%H%M%S)
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

pacman -S --needed --noconfirm sddm qt6-svg qt6-virtualkeyboard qt6-multimedia-ffmpeg git

echo "==> SDDM"
git clone -q --depth 1 https://github.com/Keyitdev/sddm-astronaut-theme "$TMP/astro"
DST=/usr/share/sddm/themes/sddm-astronaut-theme
[[ -d $DST ]] && mv "$DST" "${DST}_bak-$TS"
mkdir -p "$DST" && cp -r "$TMP/astro"/. "$DST"/ && rm -rf "$DST/.git"
sed -i "s|^ConfigFile=.*|ConfigFile=Themes/${SDDM_VARIANT}.conf|" "$DST/metadata.desktop"
mkdir -p /usr/share/fonts/sddm-astronaut && cp -r "$DST/Fonts"/. /usr/share/fonts/sddm-astronaut/ && fc-cache -f >/dev/null
[[ -f /etc/sddm.conf ]] && cp /etc/sddm.conf "/etc/sddm.conf.bak-$TS"
printf '[Theme]\nCurrent=sddm-astronaut-theme\n' > /etc/sddm.conf
mkdir -p /etc/sddm.conf.d
printf '[General]\nInputMethod=qtvirtualkeyboard\n' > /etc/sddm.conf.d/virtualkbd.conf

echo "==> GRUB"
git clone -q --depth 1 https://github.com/vinceliuice/Graphite-gtk-theme "$TMP/graphite"
cp /etc/default/grub "/etc/default/grub.bak-$TS"
(cd "$TMP/graphite/other/grub2" && ./install.sh -t "$GRUB_COLOR" -s "$GRUB_SCREEN")

echo "Готово. Бэкапы с суффиксом .bak-$TS"
