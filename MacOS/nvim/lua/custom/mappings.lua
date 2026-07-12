local M = {}

M.gopher = {
    plugin = true,
    n = {
        ["<leader>gsj"] = {
            "<cmd> GoTagAdd json <CR>",
            "Add json struct tags"
        },
        ["<leader>gsy"] = {
            "<cmd> GoTagAdd yaml <CR>",
            "Add yaml struct tags"
        },
        ["<leader>gie"] = {
            "<cmd> GoIfErr <CR>",
            "Add yaml struct tags"
        }
    }
}

return M
