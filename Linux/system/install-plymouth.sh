#!/usr/bin/env bash
# Plymouth + тема "hyprland-mac-style" (https://www.gnome-look.org/p/2214975)
# Рассчитан на mkinitcpio (busybox-хуки base/udev) и загрузку через UKI + GRUB.
# Запуск: sudo bash install-plymouth.sh
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "Запусти через sudo"; exit 1; }

THEME=hyprland-mac-style
TS=$(date +%Y%m%d%H%M%S)
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

pacman -S --needed --noconfirm plymouth cantarell-fonts libarchive curl

echo "==> Качаю тему с gnome-look (OCS API)"
curl -sL https://api.gnome-look.org/ocs/v1/content/data/2214975 -o "$TMP/api.xml"
URL=$(grep -oE "<downloadlink[0-9]+>[^<]*${THEME}\.zip" "$TMP/api.xml" | sed -E 's/<downloadlink[0-9]+>//' | head -1)
[[ -n $URL ]] || { echo "Не нашёл ссылку на ${THEME}.zip"; exit 1; }
curl -sL "$URL" -o "$TMP/theme.zip"
mkdir "$TMP/ex" && bsdtar -xf "$TMP/theme.zip" -C "$TMP/ex"
rm -rf "/usr/share/plymouth/themes/$THEME"
cp -r "$TMP/ex/$THEME" /usr/share/plymouth/themes/

echo "==> mkinitcpio: хук plymouth после udev"
cp /etc/mkinitcpio.conf "/etc/mkinitcpio.conf.bak-$TS"
grep -qE '^HOOKS=.*\bplymouth\b' /etc/mkinitcpio.conf || sed -i -E '/^HOOKS=/ s/\budev\b/udev plymouth/' /etc/mkinitcpio.conf

echo "==> Убираю встроенную в UKI картинку Arch"
if [[ -f /etc/mkinitcpio.d/linux.preset ]]; then
  cp /etc/mkinitcpio.d/linux.preset "/etc/mkinitcpio.d/linux.preset.bak-$TS"
  sed -i -E 's|^default_options="--splash [^"]*"|#&|' /etc/mkinitcpio.d/linux.preset
fi

echo "==> Параметры ядра: quiet splash"
if [[ -f /etc/kernel/cmdline ]]; then   # UKI
  cp /etc/kernel/cmdline "/etc/kernel/cmdline.bak-$TS"
  grep -qw quiet  /etc/kernel/cmdline || sed -i -E '1 s/$/ quiet/'  /etc/kernel/cmdline
  grep -qw splash /etc/kernel/cmdline || sed -i -E '1 s/$/ splash/' /etc/kernel/cmdline
fi
cp /etc/default/grub "/etc/default/grub.bak-$TS"
grep -qE '^GRUB_CMDLINE_LINUX_DEFAULT=.*\bsplash\b' /etc/default/grub || \
  sed -i -E 's/^(GRUB_CMDLINE_LINUX_DEFAULT="[^"]*)"/\1 splash"/' /etc/default/grub

echo "==> Включаю тему, пересобираю initramfs/UKI и grub.cfg"
plymouth-set-default-theme -R "$THEME"
grub-mkconfig -o /boot/grub/grub.cfg >/dev/null 2>&1 && echo "grub.cfg ok"

echo "Готово. Бэкапы с суффиксом .bak-$TS"
