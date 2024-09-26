require "core"

local custom_init_path = vim.api.nvim_get_runtime_file("lua/custom/init.lua", false)[1]

if custom_init_path then
  dofile(custom_init_path)
end

-- Авто-сохранение после задержки в 1000 миллисекунд
vim.api.nvim_create_augroup("autosave", { clear = true })
vim.api.nvim_create_autocmd({ "CursorHold", "InsertLeave" }, {
  group = "autosave",
  pattern = "*",
  command = "silent! wall",
})

-- Установить задержку перед срабатыванием CursorHold
vim.o.updatetime = 1000
require("core.utils").load_mappings()

local lazypath = vim.fn.stdpath "data" .. "/lazy/lazy.nvim"

-- bootstrap lazy.nvim!
if not vim.loop.fs_stat(lazypath) then
  require("core.bootstrap").gen_chadrc_template()
  require("core.bootstrap").lazy(lazypath)
end

dofile(vim.g.base46_cache .. "defaults")
vim.opt.rtp:prepend(lazypath)
require "plugins"
