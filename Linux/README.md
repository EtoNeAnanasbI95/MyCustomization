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
│   │   ├── scripts/capture.sh  # скриншоты, запись, OCR, пипетка, меню захвата
│   │   ├── scripts/launcher.sh # лаунчер на английской раскладке, потом возврат прежней
│   │   ├── scripts/claude-panel.sh # выдвижная панель Claude Code справа (SUPER + A)
│   │   ├── scripts/open-panel.sh   # открыть панель Noctalia по названию из лаунчера
│   │   ├── cursor-plugin/      # мост между плагином Cursor и Lua-конфигом
│   │   └── hyprmod/            # профиль HyprMod
│   ├── noctalia/config.toml    # конфиг Noctalia (экспорт, см. ниже)
│   ├── noctalia/panels.tsv     # панели для поиска в лаунчере по названию
│   ├── spotify-launcher.conf   # Spotify на нативном Wayland
│   ├── satty/config.toml       # редактор скриншотов
│   ├── fontconfig/fonts.conf   # эмодзи Apple вместо Noto
│   ├── zed/                    # settings.json, keymap.json
│   ├── kitty/ btop/ rofi/ yazi/ cava/ ...
├── .tmux.conf                  # tmux: vim-копирование в системный буфер, Alt-бинды для панелей
├── .local/bin/speedtest         # speedtest в формате Ookla поверх speed.cloudflare.com (для Speedtest Meter)
├── system/
│   ├── install-sddm-grub.sh    # темы SDDM и GRUB
│   └── install-plymouth.sh     # Plymouth + тема
├── bin/                        # мои скрипты
└── legacy/                     # старый сетап
```

# Установка

## 1. Пакеты

```sh
sudo pacman -S hyprland kitty tmux rofi nautilus yazi btop playerctl telegram-desktop ttf-jetbrains-mono-nerd kdeconnect sshfs
sudo pacman -S grim slurp wl-clipboard libnotify satty tesseract tesseract-data-rus tesseract-data-eng hyprpicker
sudo pacman -S noctalia gpu-screen-recorder mpv socat jq bitwarden-cli spotify-launcher python-wand zenity
yay -S mpvpaper ai-usagebar-bin happ-desktop-bin ttf-apple-emoji win2xcur
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
mkdir -p ~/.local/bin && cp .local/bin/speedtest ~/.local/bin/
cp -r .config/kitty .config/btop .config/rofi .config/yazi .config/satty .config/zed .config/fontconfig ~/.config/
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
| `felipeartur/ai-usagebar` | лимиты AI-подписок в баре (нужен `ai-usagebar`) |
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
  В туннель тогда идут только сети, которые присылает сервер, остальное — через Happ. Для полноценного раздельного DNS (рабочему DNS — только рабочие домены) нужен `systemd-resolved` и `dns=systemd-resolved` в NetworkManager.

## pacman

В `/etc/pacman.conf`, секция `[options]`: `Color`, `ILoveCandy` (Пакман вместо полоски прогресса), `ParallelDownloads = 5`.

## Claude Code в панели

`SUPER + A` или кнопка ✨ в баре выдвигает справа kitty с Claude Code. Сессия живёт в tmux (`claude-panel`): спрятал панель — Claude продолжает работать, открыл — диалог на месте. Окно лежит в спецворкспейсе `special:claude`.

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
