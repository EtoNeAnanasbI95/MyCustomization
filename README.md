# Терминалы
* Конфигурации моих терминалов лежат в папке [terms](https://github.com/EtoNeAnanasbI95/MyCustomization/tree/main/terms).

<details>
   <summary>В этой папке лежат конфигурации:</summary>
      1. Hyper terminal<br/>
      2. Alacritty<br/>
      3. Default windows terminal<br/>

> Из всего выше перечисленного, файл (WindowsTerminalColorSchemes) является просто цветовой схемой для терминала windows, ***если вы хотите посмотреть конфигурацию именно powershellrc, то просмотрите папку Windows → PWSH***
</details>

# [Редакторы кода (IDE)](https://github.com/EtoNeAnanasbI95/MyCustomization/tree/main/IDE)
* Конфиги всех редакторов кода находятся в папке IDE

<details>
   <summary>Там находятся конфиги:</summary>
      1. IDE от jetbrains которыми я пользуюсь на постоянной основе<br/>
      2. VS code<br/>
      3. neovim<br/>

> Гайд на кастомизацию vscode: (https://marred-chartreuse-801.notion.site/vs-code-acaf2e071b91435fad37bb784c9b3941?pvs=4)
</details>

# [Linux](https://github.com/EtoNeAnanasbI95/MyCustomization/tree/main/Linux)
* Наиболее крупная и важная папка. В ней содержатся мои dotfiles кастомизации Arch Linux 
## Fist omz set-up
* At first install omz

``` 
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

* Next, install concurrent plugins

```
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting

git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/fast-syntax-highlighting

sed -i 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting)/g' "$HOME/.zshrc"
```

# [Windows](https://github.com/EtoNeAnanasbI95/MyCustomization/tree/main/Windows)
* Эта папка, как и linux, содержит в себе кастомизацию системы. Там лежит конфигурация софта для эффекта прозрачности в проводнике и контекстном меню, красивого меню пуск и, наверное самое важное, конфигурация powershell, с внешней кастомизацией
> гайд на кастомизацию powershell: (https://marred-chartreuse-801.notion.site/oh-my-posh-869e9ae83c0b4df1aeed0cb64a34ab41?pvs=4)

# [Wallpaper](https://github.com/EtoNeAnanasbI95/MyCustomization/tree/main/wallpapers)
* Ну и на сладкое, не большой пак обоев, как гифки так и обычные минималистичные обои

# Мусор
* Помимо всего прочего, ради личного удобства, я закинул сюда свой [cs2AutoExecConfig](https://github.com/EtoNeAnanasbI95/MyCustomization/tree/main/CS2autoexec.cfg), а так же [мою тему для дискорда](https://github.com/EtoNeAnanasbI95/MyCustomization/tree/main/BetterDiscord)

# TODO
* ~~поменять конфиг alacritty~~
* доделать linux
