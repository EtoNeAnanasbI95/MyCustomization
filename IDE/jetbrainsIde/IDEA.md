# My boot settings

* I should be able to configure boot options in jetbrains IDEAs, because i use hyprland, which uses wayland compositor. And if i want to see pretty scaling layout, I should to add somethink in the configuration file

## Requirements

* You need to set a different boot java runtime for the IDE. I use the 21.0.2+13-375.1-jcef

## Configuration file

```
-Xmx2048m
-Dawt.toolkit.name=WLToolkit
-Dide.managed.by.toolbox=/home/notpineapple/.local/share/JetBrains/Toolbox/bin/jetbrains-toolbox
-Dtoolbox.notification.token=5badf2fa-6eb3-44d0-aabf-3e6ec6cdfce1
-Dtoolbox.notification.portFile=/home/notpineapple/.cache/JetBrains/Toolbox/ports/41d93e68-2cde-4734-9c44-0368b79e414b.port
```
* You need to add in any jetbrains IDE configuration file only this line 

```
-Dawt.toolkit.name=WLToolkit
```