# Initial oh-my-posh theme in my PWSH terminal
oh-my-posh init pwsh --config "C:\Users\eto_d\AppData\Local\Programs\oh-my-posh\themes\bubbles.omp.json" | Invoke-Expression;
clear;

# simple alias for fast clean
New-Alias -Name c -Value clear

# simple function for copy file path to clipboard
function cpPath {
    
    [CmdletBinding()]

    param ([string]$fn)
    if ($fn) { Resolve-Path ./$fn | Set-Clipboard;}
    else { Get-Location | Set-Clipboard;}
}

# simple function for force delete files
function fdel {
    param (
        [string]$item
    )

    if ($item) {
        remove-item $item -r -Force
    }
    
}