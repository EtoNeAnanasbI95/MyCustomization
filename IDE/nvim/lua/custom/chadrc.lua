---@type ChadrcConfig
local M = {}
local opt = vim.opt
opt.relativenumber = true
M.ui = { theme = 'github_dark' }
M.plugins = 'custom.plugins'
M.mappings = require "custom.mappings"
-- vim.g.move_key_modifier = 'C'  -- Использовать Ctrl вместо Alt
return M
