oh-my-posh init pwsh --config "C:\Users\eto_d\AppData\Local\Programs\oh-my-posh\themes\bubbles.omp.json" | Invoke-Expression;
clear;

function cpPath {
    
    [CmdletBinding()]

    param ([string]$fn)
    if ($fn) { Resolve-Path ./$fn | Set-Clipboard;}
    else { Get-Location | Set-Clipboard;}
}