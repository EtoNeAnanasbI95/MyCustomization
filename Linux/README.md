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
| Шрифты | JetBrainsMono Nerd Font |
| Проводник | dolphin, yazi (TUI) |
| Шпаргалка по хоткеям | rofi (`SUPER + /`) |
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
│   │   ├── cheatsheet.txt      # шпаргалка, которую показывает SUPER + /
│   │   └── hyprmod/            # профиль HyprMod
│   ├── noctalia/config.toml    # конфиг Noctalia (экспорт, см. ниже)
│   ├── kitty/ btop/ rofi/ yazi/ cava/ ...
├── system/
│   ├── install-sddm-grub.sh    # темы SDDM и GRUB
│   └── install-plymouth.sh     # Plymouth + тема
├── bin/                        # мои скрипты
└── legacy/                     # старый сетап
```

# Установка

## 1. Пакеты

```sh
sudo pacman -S hyprland kitty rofi dolphin yazi btop playerctl telegram-desktop ttf-jetbrains-mono-nerd
sudo pacman -S noctalia
```

## 2. Конфиги

```sh
git clone https://github.com/EtoNeAnanasbI95/MyCustomization
cd MyCustomization/Linux

cp -r .config/hypr ~/.config/
mkdir -p ~/.config/noctalia && cp .config/noctalia/config.toml ~/.config/noctalia/
cp -r .config/kitty .config/btop .config/rofi .config/yazi ~/.config/

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
| `SUPER + E` | Файловый менеджер (dolphin) |
| `SUPER + SHIFT + T` | Telegram |
| `SUPER + R` / `ALT + Space` | Лаунчер приложений |
| `SUPER + S` | Центр управления |
| `SUPER + ,` | Настройки Noctalia |
| `SUPER + Escape` | Меню сессии (выход, перезагрузка, выключение) |
| `SUPER + Tab` | Переключатель окон |
| `SUPER + SHIFT + 4` | Скриншот области |
| `SUPER + SHIFT + V` | История буфера обмена |
| `SUPER + Space` | Сменить раскладку EN/RU |
| `SUPER + /` | Шпаргалка |
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

## Раскладка

`us,ru(mac)`: русская раскладка как на MacBook. На ней запятая стоит на `Shift + 6`, точка на `Shift + 7`, `ё` на клавише `\`.

# TODO
* Анимированные обои (GIF через `awww` / видео через `mpvpaper`)
* Перенести zsh-конфиг под новый сетап
* Превью
