# Completion for verb

> Borrowed from gulp, thanks to gulp and the grunt team and Tyler Kellen for creating this.

To enable tasks auto-completion in shell you should add `eval "$(verb --completion=shell)"` in your `.shellrc` file.

## Bash

Add `eval "$(verb --completion=bash)"` to `~/.bashrc`.

## Zsh

Add `eval "$(verb --completion=zsh)"` to `~/.zshrc`.

## Powershell

Add `Invoke-Expression ((verb --completion=powershell) -join [System.Environment]::NewLine)` to `$PROFILE`.

## Fish

Add `verb --completion=fish | source` to `~/.config/fish/config.fish`.
