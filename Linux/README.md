# Моя кастомизация Arch Linux

Текущий сетап: **Hyprland (Lua-конфиг) + Noctalia Shell**. Почти всё, что раньше собиралось из десятка программ (бар, виджеты, уведомления, лаунчер, локскрин, скриншоты, буфер обмена, OSD), теперь делает Noctalia, а Hyprland отвечает только за окна и хоткеи.

> Старый сетап (eww / ags / dunst / wlogout / hyprland.conf) лежит в [legacy](./legacy).

# Описание

| Что | Чем |
|---|---|
| WM / композитор | [Hyprland](https://hypr.land) 0.57+, конфиг на Lua |
| Оболочка (бар, уведомления, лаунчер, локскрин, OSD, скриншоты, буфер обмена) | [Noctalia](https://github.com/noctalia-dev/noctalia) |
| Цвета | Noctalia из обоев (Material You, `vibrant`) + шаблоны для kitty, btop, cava, GTK, Qt, Hyprland |
| Терминал | kitty |
| Шрифты | JetBrainsMono Nerd Font, эмодзи Apple Color Emoji (`ttf-apple-emoji`) |
| Проводник | nautilus, yazi (TUI) |
| Скриншоты | grim + slurp → редактор [satty](https://github.com/gabm/Satty), OCR через tesseract, пипетка hyprpicker |
| Шпаргалка по хоткеям | плагин Keybind Cheatsheet (`SUPER + /`), описания берутся из `description` у биндов |
| Заметки | Quill (markdown в `~/obsidian-storage/publish/Quick Notes`) и стикеры Noctes на рабочем столе |
| Перевод | плагин Translator: двойное `SUPER + C` переводит выделенное на русский |
| Телефон | KDE Connect + плагин Phone Connect |
| Запись экрана | плагин Noctalia Screen Recorder (gpu-screen-recorder) |
| Анимированные обои | плагин Noctalia Video Wallpaper (mpvpaper): GIF, mp4, webm |
| Редактор кода | Zed (vim mode, Catppuccin, агент Claude Code через ACP) |
| VPN | Happ (xray) в трее, рабочий OpenVPN через NetworkManager |
| DNS | systemd-resolved: рабочие домены → рабочий DNS, всё остальное → через Happ |
| Отпечаток пальца | Goodix 550A через libfprint-tod + драйвер Lenovo; локскрин и `sudo` |
| sudo | [sudo-rs](https://github.com/trifectatechfoundation/sudo-rs) (реализация на Rust) вместо обычного sudo |
| Загрузчик | GRUB + [Graphite grub2 theme](https://github.com/vinceliuice/Graphite-gtk-theme/tree/main/other/grub2) |
| Сплэш при загрузке | Plymouth + [hyprland-mac-style](https://www.gnome-look.org/p/2214975) |
| Менеджер входа | SDDM + [sddm-astronaut-theme](https://github.com/Keyitdev/sddm-astronaut-theme) (вариант `black_hole`) |
| Оболочка терминала | zsh + oh-my-zsh (установка плагинов в [корневом README](../README.md)) |

# Структура

```
Linux/
├── .config/
│   ├── hypr/
│   │   ├── hyprland.lua        # основной конфиг: хоткеи, анимации, ввод, правила окон
│   │   ├── hyprland-gui.lua    # настройки, которые пишет HyprMod (мониторы и т.п.)
│   │   ├── noctalia.lua        # цвета рамок, генерирует Noctalia
│   │   ├── scripts/translate-copy.sh # двойное SUPER + C → перевод выделенного
│   │   ├── scripts/capture.sh  # скриншоты, запись, OCR, пипетка, меню захвата (через `noctalia dmenu`)
│   │   ├── scripts/launcher.sh # лаунчер на английской раскладке, потом возврат прежней
│   │   ├── scripts/claude-panel.sh # старая панель Claude Code в kitty (сейчас SUPER + A — плагин, см. ниже)
│   │   ├── scripts/open-panel.sh   # открыть панель Noctalia по названию из лаунчера
│   │   ├── scripts/xwayland-dpi.sh # Xft.dpi для X11-программ (TrueConf) по масштабу мониторов
│   │   ├── cursor-plugin/      # мост между плагином Cursor и Lua-конфигом
│   │   └── hyprmod/            # профиль HyprMod
│   ├── noctalia/config.toml    # конфиг Noctalia (экспорт, см. ниже)
│   ├── noctalia/panels.tsv     # панели для поиска в лаунчере по названию
│   ├── spotify-launcher.conf   # Spotify на нативном Wayland
│   ├── satty/config.toml       # редактор скриншотов
│   ├── fontconfig/fonts.conf   # эмодзи Apple вместо Noto
│   ├── xdg-desktop-portal/hyprland-portals.conf # диалог выбора файлов = Nautilus через прослойку
│   ├── systemd/user/portal-strip-x11-parent.service # автозапуск прослойки
│   ├── systemd/user/xdg-desktop-portal-gnome.service.d/wayland.conf # XDG_SESSION_TYPE для GNOME-портала
│   ├── gtk-3.0/gtk.css         # необязательно: GTK3-диалоги под Nautilus, цвета Noctalia (см. «Выбор файлов»)
│   ├── zed/                    # settings.json, keymap.json
│   ├── kitty/ btop/ yazi/ cava/ ...
├── .tmux.conf                  # tmux: vim-копирование в системный буфер, Alt-бинды для панелей
├── .local/bin/speedtest         # speedtest в формате Ookla поверх speed.cloudflare.com (для Speedtest Meter)
├── .local/bin/trueconf          # обёртка TrueConf: XWayland + диалог файлов через портал
├── .local/bin/portal-strip-x11-parent # прослойка FileChooser-портала (см. «Выбор файлов»)
├── .local/bin/zed-sudoedit      # `zed-sudoedit [-p порт] <host> /etc/файл`: правка root-файла на сервере через sudoedit в локальном Zed
├── .local/share/xdg-desktop-portal/portals/stripx11.portal # описание бэкенда прослойки
├── .local/share/applications/org.telegram.desktop.desktop # Telegram: диалоги файлов через портал
├── .local/share/applications/trueconf.desktop # TrueConf из лаунчера идёт через обёртку (@HOME@ → $HOME при установке)
├── .Xresources                  # базовый Xft.dpi/курсор для XWayland (скрипт xwayland-dpi.sh перебивает)
├── system/
│   ├── install-sddm-grub.sh    # темы SDDM и GRUB
│   ├── install-plymouth.sh     # Plymouth + тема
│   ├── NetworkManager/         # DNS через systemd-resolved и Happ (см. «DNS: systemd-resolved»)
│   └── pam.d/sudo              # sudo по отпечатку пальца, пароль — запасной (см. «Отпечаток пальца и sudo-rs»)
├── bin/                        # мои скрипты
└── legacy/                     # старый сетап
```

# Установка

## 1. Пакеты

```sh
sudo pacman -S hyprland kitty tmux nautilus yazi btop playerctl telegram-desktop ttf-jetbrains-mono-nerd kdeconnect sshfs
sudo pacman -S grim slurp wl-clipboard libnotify satty tesseract tesseract-data-rus tesseract-data-eng hyprpicker
sudo pacman -S noctalia gpu-screen-recorder mpv socat jq bitwarden-cli spotify-launcher python-wand zenity
sudo pacman -S xdg-desktop-portal-gnome xorg-xrdb python-gobject sushi
yay -S mpvpaper happ-desktop-bin ttf-apple-emoji win2xcur
```

## 2. Конфиги

```sh
git clone https://github.com/EtoNeAnanasbI95/MyCustomization
cd MyCustomization/Linux

cp -r .config/hypr ~/.config/
mkdir -p ~/.config/noctalia && cp .config/noctalia/config.toml .config/noctalia/panels.tsv ~/.config/noctalia/
cp .config/spotify-launcher.conf ~/.config/
mkdir -p ~/.local/share/applications && cp .local/share/applications/Happ.desktop ~/.local/share/applications/
cp .tmux.conf ~/
cp .Xresources ~/
mkdir -p ~/.local/bin && cp .local/bin/speedtest .local/bin/trueconf .local/bin/portal-strip-x11-parent .local/bin/zed-sudoedit ~/.local/bin/
chmod +x ~/.local/bin/trueconf ~/.local/bin/portal-strip-x11-parent ~/.local/bin/zed-sudoedit
sed "s|@HOME@|$HOME|g" .local/share/applications/trueconf.desktop > ~/.local/share/applications/trueconf.desktop
mkdir -p ~/.config/xdg-desktop-portal ~/.config/systemd/user ~/.local/share/xdg-desktop-portal/portals
cp .config/xdg-desktop-portal/hyprland-portals.conf ~/.config/xdg-desktop-portal/
cp .config/systemd/user/portal-strip-x11-parent.service ~/.config/systemd/user/
cp -r .config/systemd/user/xdg-desktop-portal-gnome.service.d ~/.config/systemd/user/
cp .local/share/xdg-desktop-portal/portals/stripx11.portal ~/.local/share/xdg-desktop-portal/portals/
cp .local/share/applications/org.telegram.desktop.desktop ~/.local/share/applications/
systemctl --user daemon-reload && systemctl --user enable --now portal-strip-x11-parent.service
cp -r .config/kitty .config/btop .config/yazi .config/satty .config/zed .config/fontconfig ~/.config/
fc-cache -f
xdg-mime default org.gnome.Nautilus.desktop inode/directory

# обои: Noctalia берёт их из ~/Pictures/Wallpapers, это симлинк на папку из репозитория
mkdir -p ~/Pictures && ln -s "$(realpath ../wallpapers)" ~/Pictures/Wallpapers
```

После этого `hyprctl reload` (или перелогиниться).

### Про конфиг Noctalia

Noctalia читает настройки из двух мест:
- `~/.config/noctalia/*.toml` — пользовательский конфиг (его и кладём из репозитория);
- `~/.local/state/noctalia/settings.toml` — то, что меняется через окно настроек. Эти значения перекрывают конфиг.

Чтобы обновить конфиг в репозитории после изменений в настройках:

```sh
noctalia config export > Linux/.config/noctalia/config.toml
noctalia config validate Linux/.config/noctalia/config.toml
```

В конфиге прописаны абсолютные пути к обоям (`/home/notkirilov/Pictures/Wallpapers/...`) и раскладка виджетов локскрина под мои мониторы (`eDP-1`, `DP-6`). На другой машине обои и виджеты проще поправить через настройки Noctalia (`SUPER + ,`).

### Плагины Noctalia

Ставятся сами при первом запуске из `[plugins].enabled` в `config.toml`, настройки лежат там же в `[plugin_settings]`:

| Плагин | Зачем |
|---|---|
| `noctalia/screen_recorder` | запись экрана, виджет в баре |
| `noctalia/mpvpaper` | видео- и GIF-обои (папка `~/Pictures/Wallpapers`) |
| `fel/quill` | Markdown-заметки и туду (`SUPER + N`, быстрая запись `SUPER + SHIFT + N` / `/nt`) |
| `remo/noctes` | стикеры на рабочем столе, видны на всех воркспейсах (`SUPER + ALT + N`) |
| `noctalia/translator` | перевод в лаунчере (`/tr`), язык по умолчанию — русский |
| `icefish/phone-connect` | телефон через KDE Connect: заряд, буфер, файлы |
| `kenn/keybind-cheatsheet` | шпаргалка по хоткеям (`SUPER + /`) |
| `nilsonlinux/speedtest-meter` | спидтест с живым спидометром; меряет через Cloudflare благодаря `~/.local/bin/speedtest` |
| `thaer99ob/default-apps` | приложения по умолчанию |
| `noctalia/bitwarden` | пароли из Bitwarden (`bw login` один раз) |
| `0rgl/ask-claude` | `/ai вопрос` в лаунчере → ответ Claude Code |
| `pvs/ai-usage` | лимиты AI-подписок в баре — свой плагин, подключается локальным источником (`[[plugins.source]] kind = "path"`), в репозитории его нет |
| `notkirilov/system-ai-agent` | ИИ-агент в панели (`SUPER + A`) — свой плагин, тоже локальный источник |
| `pvs/kanban` | канбан-доска в панели, карточки-стикеры, хранение в markdown формата Obsidian Kanban. Локальный источник — клон [klopopop/kanban-noctalia-plugin](https://github.com/klopopop/kanban-noctalia-plugin): `noctalia msg plugins source add kanban-dev path <клон>` и `noctalia msg plugins enable pvs/kanban` (нужен `imagemagick`) |
| `vn1k/cursor` | выбор и сборка тем курсора. Тему в Hyprland передаёт `hypr/cursor-plugin/cursor.conf`, его читает `hyprland.lua` |

Ещё в конфиге: переключатель окон по последнему использованию (`shell.window_switcher.mru`), навигация в списках `Ctrl + J / K` (`[keybinds]`), город для погоды (`[location]`).

`~/.config/hypr/noctalia.lua` и темы в `kitty/themes`, `btop/themes`, `cava/themes` Noctalia генерирует сама при смене обоев.

## 3. SDDM, GRUB, Plymouth

```sh
sudo bash system/install-sddm-grub.sh
sudo bash system/install-plymouth.sh
```

- Скрипты сами качают темы, ставят зависимости и делают бэкапы изменённых конфигов (`*.bak-<дата>`).
- Вариант SDDM и цвет GRUB можно поменять переменными: `sudo SDDM_VARIANT=pixel_sakura GRUB_COLOR=nord bash system/install-sddm-grub.sh`.
- `install-plymouth.sh` рассчитан на mkinitcpio. Если система грузится через UKI (`/etc/kernel/cmdline`), он добавит `quiet splash` туда, а если через обычные пункты GRUB, то в `GRUB_CMDLINE_LINUX_DEFAULT`.

Проверить тему SDDM без выхода из сессии:

```sh
sddm-greeter-qt6 --test-mode --theme /usr/share/sddm/themes/sddm-astronaut-theme
```

# Хоткеи

`SUPER` — основной модификатор. Полный список всегда под рукой: **`SUPER + /`**.

| Клавиши | Действие |
|---|---|
| `SUPER + T` | Терминал (kitty) |
| `SUPER + E` | Файловый менеджер (nautilus) |
| `SUPER + SHIFT + T` | Telegram |
| `SUPER + R` / `ALT + Space` | Лаунчер приложений (сразу на английской раскладке) |
| `SUPER + S` | Центр управления |
| `SUPER + ,` | Настройки Noctalia |
| `SUPER + Escape` | Меню сессии (выход, перезагрузка, выключение) |
| `SUPER + Tab` | Переключатель окон как в macOS/Windows: держишь SUPER, листаешь Tab, отпускаешь |
| `SUPER + SHIFT + 4` | Скриншот области → редактор satty |
| `SUPER + SHIFT + S` | Меню захвата: область / окно / экран → редактор, область сразу в буфер, OCR, пипетка |
| `SUPER + SHIFT + O` | Текст с экрана (OCR, rus+eng) → буфер |
| `SUPER + SHIFT + C` | Пипетка → HEX в буфер |
| `SUPER + SHIFT + R` | Запись области экрана / остановить |
| `SUPER + SHIFT + V` | История буфера обмена |
| `SUPER + Space` | Сменить раскладку EN/RU |
| `SUPER + A` | Панель Claude Code справа (ещё раз — спрятать) |
| `SUPER + /` | Шпаргалка (плагин) |
| `SUPER + N` | Заметки Quill |
| `SUPER + SHIFT + N` | Быстрая заметка / туду |
| `SUPER + ALT + N` | Новый стикер на рабочий стол |
| `SUPER + C` дважды | Перевести выделенный текст на русский |
| `SUPER + Q` | Закрыть окно |
| `SUPER + F` | Полный экран |
| `SUPER + V` | Плавающее / тайлинг |
| `SUPER + M` | Спрятать окно (для приложений без трея) |
| `SUPER + SHIFT + M` | Показать / скрыть спрятанные окна |
| `SUPER + ←↓↑→` / `H J K L` | Фокус на соседнее окно |
| `SUPER + SHIFT + H J K L` | Поменять окна местами |
| `SUPER + ALT + H J K L` | Изменить размер окна |
| `SUPER + 1…0` | Перейти на воркспейс |
| `SUPER + SHIFT + 1…0` | Перенести окно на воркспейс (кроме 4: там скриншот) |
| `SUPER + колёсико` / свайп 3 пальцами | Листать воркспейсы |
| `Ctrl + J / K` | Вниз / вверх в лаунчере, буфере обмена и других списках Noctalia |

## Скриншоты

В satty: `Enter` — скопировать в буфер и сохранить в `~/Pictures/Screenshots/`, `Ctrl + S` — только сохранить, `Esc` — закрыть. Инструменты: стрелка, линия, прямоугольник, эллипс, текст, маркер, размытие, кисть, обрезка.

## Панели из лаунчера

Чтобы не держать виджет каждого плагина в баре, панели ищутся в лаунчере просто по названию: `курсор`, `видеообои`, `заметки`, `лимиты`, `буфер`… Список лежит в `noctalia/panels.tsv` (название, ключевые слова, id панели), провайдер — `[shell.launcher.dmenu.entry.panels]` в конфиге Noctalia. Встроенный `/pan` тоже работает.

## Масштабирование

На ноутбуке масштаб 1.2, и всё, что идёт через XWayland, получалось мыльным. Поэтому:
- Electron-приложения переведены на Wayland (`ELECTRON_OZONE_PLATFORM_HINT=auto`);
- Spotify запускается с `--ozone-platform=wayland` (`spotify-launcher.conf`);
- Happ — с `QT_QPA_PLATFORM=wayland` (автозапуск и `Happ.desktop`);
- оставшиеся X11-программы не растягиваются (`xwayland.force_zero_scaling`): чёткие, но чуть мельче на ноутбуке.

## Выбор файлов и TrueConf

Диалог «Открыть / Сохранить» везде один — Nautilus (`xdg-desktop-portal-gnome`), красится темой Noctalia. Маршрут задан в `~/.config/xdg-desktop-portal/hyprland-portals.conf` (`FileChooser=stripx11`).

Зачем прослойка `stripx11` (`portal-strip-x11-parent`, сервис `systemd --user`): Qt-программы в XWayland (TrueConf) передают порталу родительское окно `x11:<id>`, а Nautilus-портал с ним падает и диалог просто не открывается. Прослойка принимает вызов, подменяет `x11:…` на пустого родителя и пересылает в GNOME-бэкенд, остальное идёт как есть. Если она упадёт, выбор файлов везде перестанет работать. Откат: в `hyprland-portals.conf` поставить `FileChooser=gnome` и `systemctl --user disable --now portal-strip-x11-parent`.

Для GNOME-портала вне GNOME нужен `XDG_SESSION_TYPE=wayland` в его окружении, иначе он стартует в режиме «только настройки»: это прописано в drop-in сервиса `xdg-desktop-portal-gnome` (`~/.config/systemd/user/xdg-desktop-portal-gnome.service.d/wayland.conf`).

- **TrueConf** запускается через `~/.local/bin/trueconf` в XWayland (нативный Wayland ломает его меню «Upload file»: оно открывается как огромное окно и сразу закрывается). Масштаб на 4K даёт `Xft.dpi` из `scripts/xwayland-dpi.sh` (запускается при старте Hyprland и при смене мониторов) + `xwayland.force_zero_scaling`. Нативный Wayland: `TRUECONF_WAYLAND=1 trueconf`.
- **Telegram** сам идёт мимо портала с `QT_QPA_PLATFORMTHEME=gtk3`, поэтому в его `.desktop` стоит `TDESKTOP_USE_PORTAL=1` и `QT_QPA_PLATFORMTHEME=xdgdesktopportal`; глобально `hyprland.lua` задаёт `xdgdesktopportal` для всех Qt-программ.
- `gtk-3.0/gtk.css` остался от попытки сделать GTK3-диалоги похожими на Nautilus (шрифт Adwaita Sans, скругления, цвета из `noctalia.css`). Для выбора файлов он не нужен, хватает прослойки. Хранится на всякий случай; без него Noctalia обходится одной строкой `@import url("noctalia.css");`.
- **Правила окон** (`hyprland.lua`): `file-picker` — окно диалога плавающее, по центру, с затемнением остального; `sushi-float` — Quick Look по пробелу в Nautilus, тоже модальный. Регулярки в правилах Hyprland должны совпадать со **всей** строкой (`^(Choose|Open).*`, а не просто `^Choose`).

## Эффекты

- **Желейные окна** (`decoration.wobble`, Hyprland 0.57+): окна гнутся и колышутся, когда их таскаешь. Сила настраивается в `hyprland.lua`: `intensity`, `stiffness`, `damping`.
- **Полупрозрачность с размытием** для Telegram, Zed, DataGrip и окна настроек Noctalia: правила `*-opacity` в `hyprland.lua`.

## Мониторы

Внешний монитор `DP-1` (2560×1440 @ 165 Гц) справа от ноутбука и основной: воркспейсы 1–5 на нём, 6–10 на ноутбуке. Настраивается в начале `hyprland.lua`, под другой монитор надо поменять `output` и `mode` (`hyprctl monitors all` покажет доступные режимы).

## VPN

- **Happ** запускается из автозапуска Hyprland свёрнутым в трей (`Happ --autostart`). Автоподключение и «запускать свёрнутым» включаются в настройках самого Happ.
- **Рабочий OpenVPN** импортирован в NetworkManager из `.ovpn` (`nmcli connection import type openvpn file <профиль>.ovpn`), профиль с ключами в репозиторий не кладётся.
- Чтобы рабочий VPN не забирал весь трафик (и Telegram с Happ продолжали работать), у подключения выключен маршрут по умолчанию, а рабочие домены заданы отдельно:
  ```sh
  nmcli connection modify "<имя подключения>" ipv4.never-default yes ipv4.dns-search "<рабочий-домен>,~<ещё-домен>" ipv6.method disabled
  ```
  В туннель тогда идут только сети, которые присылает сервер, остальное — через Happ. Тильда в `~<домен>` значит «этот домен резолвить только через DNS VPN» — это работает благодаря systemd-resolved (ниже).

## DNS: systemd-resolved

**Зачем.** Одновременно подняты два туннеля — рабочий OpenVPN и Happ — плюс обычный Wi-Fi, и у каждого свой DNS. Классический `/etc/resolv.conf` — это один общий список серверов: какой ответил первым, тот и прав. С ним рабочие имена резолвятся, только если запрос попал на рабочий DNS, а все остальные запросы уходят рабочему DNS или провайдеру мимо Happ. systemd-resolved держит DNS **для каждого интерфейса отдельно** и направляет запрос по домену:

| Запрос | Куда идёт |
|---|---|
| рабочие домены (`~<рабочий-домен>` в `ipv4.dns-search` у OpenVPN) | DNS рабочего VPN, через tun0 |
| всё остальное (`~.` на `happ-xray`) | `1.1.1.1` через туннель Happ |
| Happ выключен | DNS роутера по Wi-Fi |

Проверить, кто что резолвит: `resolvectl status`, `resolvectl query <имя>`.

**Как устроено:**
- `/etc/resolv.conf` — симлинк на заглушку resolved `/run/systemd/resolve/stub-resolv.conf` (все программы спрашивают `127.0.0.53`, а resolved уже раскидывает).
- `system/NetworkManager/conf.d/90-happ-resolved.conf` — NetworkManager отдаёт DNS каждого подключения в resolved, а не пишет resolv.conf сам.
- `system/NetworkManager/dispatcher.d/90-happ-dns-ipv4` — Happ поднимает свой TUN мимо NetworkManager и DNS на нём не задаёт. Скрипт при поднятии `happ-xray` вешает на него `1.1.1.1` и домен `~.` (маршрут DNS по умолчанию), а ещё, пока Happ поднят, запрещает глобальный IPv6 (правило `pref 10990`): туннель IPv6 не возит, и программы иначе подвисают на попытках по IPv6.

**Установка:**
```sh
sudo systemctl enable --now systemd-resolved
sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
sudo install -m 644 system/NetworkManager/conf.d/90-happ-resolved.conf /etc/NetworkManager/conf.d/
sudo install -m 755 system/NetworkManager/dispatcher.d/90-happ-dns-ipv4 /etc/NetworkManager/dispatcher.d/
sudo systemctl enable --now NetworkManager-dispatcher
sudo systemctl restart NetworkManager
```

## Отпечаток пальца и sudo-rs

Ноутбук — Lenovo ThinkBook 16 G6 IRL, сканер Goodix `27c6:550a`. Штатный `libfprint` его не поддерживает (в списке «Known unsupported devices»), работает закрытый драйвер Lenovo из Ubuntu-пакета для ThinkPad E14 Gen 4 через форк `libfprint-tod`, который умеет грузить драйверы производителей:

```sh
yay -S libfprint-tod libfprint-2-tod1-goodix   # libfprint-tod заменяет libfprint
sudo pacman -S fprintd
fprintd-enroll -f right-index-finger            # и left-index-finger
fprintd-verify                                  # должно быть verify-match
```

Бинарник драйвера (0.0.9) из AUR-пакета совпадает с архивом Lenovo `r1slg01w.zip`. Известная особенность: после проверки пальца `fprintd` падает внутри драйвера при освобождении сканера (`ReleaseDevice failed`). На работу не влияет: fprintd поднимается заново при следующем обращении.

- **Локскрин Noctalia** спрашивает fprintd сам (`fingerprint = true` в настройках локскрина), PAM для него не нужен.
- **sudo** — через PAM: `system/pam.d/sudo`, первая строка `auth sufficient pam_fprintd.so`. `sufficient` значит «палец подошёл — пускаем, нет — идём дальше к паролю», так что без пальца sudo просто спросит пароль. Вход в SDDM оставлен по паролю: иначе не разблокируется связка ключей GNOME.

  ```sh
  sudo install -m 644 system/pam.d/sudo /etc/pam.d/sudo
  ```
  Правило в sudoers при этом обычное, с паролем (`<user> ALL=(ALL) ALL`) — с `NOPASSWD` палец бессмыслен.

**sudo-rs** — та же sudo, переписанная на Rust (меньше кода, нет классов ошибок с памятью). Ставится рядом с обычной под именами `sudo-rs`, `sudoedit-rs` и т.д., читает тот же `/etc/sudoers` и PAM-файл `sudo`. Чтобы `sudo` в терминале вызывал её, ссылки в `/usr/local/bin` (он в `PATH` раньше `/usr/bin`):

```sh
sudo pacman -S sudo-rs
sudo ln -sf /usr/bin/sudo-rs /usr/local/bin/sudo
sudo ln -sf /usr/bin/sudoedit-rs /usr/local/bin/sudoedit
```
Обычный `/usr/bin/sudo` остаётся запасным (на нём `base-devel`/makepkg); откат — удалить две ссылки. Чего в sudo-rs нет: `logfile` (логи только в syslog) и `INTERCEPT`.

## pacman

В `/etc/pacman.conf`, секция `[options]`: `Color`, `ILoveCandy` (Пакман вместо полоски прогресса), `ParallelDownloads = 5`.

## ИИ-агент в панели

`SUPER + A` открывает панель плагина `notkirilov/system-ai-agent` (ещё раз — спрятать). Старый вариант — kitty с Claude Code в tmux (`scripts/claude-panel.sh`, спецворкспейс `special:claude`) — остался в репозитории, но к хоткею не привязан.

## Фокус в панелях Noctalia

Пока открыта панель Noctalia с вводом (лаунчер, агент, буфер обмена…), `hyprland.lua` ставит `follow_mouse = 0`, после закрытия возвращает `1`. Иначе дрогнувшая мышь уводит клавиатуру в окно под курсором и набор обрывается: лаунчер берёт клавиатуру в режиме `on_demand`, своей настройки на это у Noctalia нет.

## Мелочи

- Мини-плеер Spotify (окно `chromium-browser`) без рамки, тени и блюра Hyprland: у него своя карточка с отступами, рамка вокруг всего окна выглядит криво.
- rofi больше не нужен: меню захвата (`SUPER + SHIFT + S`) показывает `noctalia dmenu`. Его старые темы лежат в `legacy/.config/rofi`.

## tmux

| Клавиши | Действие |
|---|---|
| `Alt + y` | режим копирования (vim) |
| `v` / `V` / `Ctrl + v` | выделение: посимвольно / строкой / прямоугольником |
| `y` или `Enter` | скопировать в системный буфер и выйти |
| `Esc` | снять выделение, второй раз — выйти |
| `Alt + h j k l` | переключение между панелями |
| `Alt + v` / `Alt + s` | разделить вертикально / горизонтально |
| `Alt + x` | закрыть панель |
| `Ctrl + b` + `H J K L` | изменить размер панели |

## Раскладка

`us,ru(mac)`: русская раскладка как на MacBook. На ней запятая стоит на `Shift + 6`, точка на `Shift + 7`, `ё` на клавише `\`.

Автоповтор при зажатой клавише как на маке на максимуме: 35 символов/с после 225 мс (`repeat_rate`, `repeat_delay` в `hyprland.lua`).

# TODO
* ~~Анимированные обои~~ (плагин Video Wallpaper)
* Перенести zsh-конфиг под новый сетап
* Превью
