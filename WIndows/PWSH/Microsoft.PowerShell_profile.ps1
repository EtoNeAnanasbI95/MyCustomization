oh-my-posh init pwsh --config "C:\Users\eto_d\AppData\Local\Programs\oh-my-posh\themes\bubbles.omp.json" | Invoke-Expression;
clear;

New-Alias -Name c -Value clear
New-Alias -Name pcs -Value Stop-Computer

function cpPath {
    
    [CmdletBinding()]

    param ([string]$fn)
    if ($fn) { Resolve-Path ./$fn | Set-Clipboard;}
    else { Get-Location | Set-Clipboard;}
}

function fdel {
    param (
        [string]$item
    )

    if ($item) {
        remove-item $item -r -Force
    }
    
}

function q {
    Get-Process WindowsTerminal | Stop-Process -Force
}

function fp {
    param (
        [string]$item
    )

    if ($item) {
        git add .;
        git commit -m "$item";
        git push -u origin main;
    } else {
        git add .;
        git commit -m "some fix";
        git push -u origin main;
    }
    
}