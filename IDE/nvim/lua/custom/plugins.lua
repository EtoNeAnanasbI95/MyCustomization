local plugins = {
    {
        "kdheepak/lazygit.nvim",
        cmd = {
            "LazyGit",
            "LazyGitConfig",
            "LazyGitCurrentFile",
            "LazyGitFilter",
            "LazyGitFilterCurrentFile",
        },
        -- optional for floating window border decoration
        dependencies = {
            "nvim-lua/plenary.nvim",
            "nvim-telescope/telescope.nvim",
        },
        -- setting the keybinding for LazyGit with 'keys' is recommended in
        -- order to load the plugin when the command is run for the first time
        keys = {
            { "<leader>lg", "<cmd>LazyGit<cr>", desc = "LazyGit" }
        },

        config = function()
            require("telescope").load_extension("lazygit")
        end
    },
    {
        "matze/vim-move",
    },
    {
        "williamboman/mason.nvim",
        opts = {
            ensure_installed = {
                "gopls",
            }
        },
    },
    {
        "neovim/nvim-lspconfig",
        config = function()
            require "plugins.configs.lspconfig"
            require "custom.configs.lspconfig"
        end,
    },
    {
        "hrsh7th/cmp-cmdline",
        event = { "CmdLineEnter" },
        opts = { history = true, updateevents = "CmdlineEnter,CmdlineChanged" },
        config = function()
            local cmp = require "cmp"

            cmp.setup.cmdline("/", {
                mapping = cmp.mapping.preset.cmdline(),
                sources = {
                    { name = "buffer" },
                },
            })
            -- `:` cmdline setup.
            cmp.setup.cmdline(":", {
                mapping = cmp.mapping.preset.cmdline(),
                sources = cmp.config.sources({
                    { name = "path" },
                }, {
                    {
                        name = "cmdline",
                        option = {
                            ignore_cmds = { "Man", "!" },
                        },
                    },
                }),
            })
        end,
    },
    {
        "jose-elias-alvarez/null-ls.nvim",
        ft = "go",
        opts = function()
            return require "custom.configs.null-ls"
        end
    },
    {
        "olexsmir/gopher.nvim",
        ft = "go",
        -- branch = "develop", -- if you want develop branch
        -- keep in mind, it might break everything
        dependencies = {
            "nvim-lua/plenary.nvim",
            "nvim-treesitter/nvim-treesitter",
        },
        config = function(_, opts)
            require("gopher").setup(opts)
            require("core.utils").load_mappings("gopher")
        end,
        build = function()
            vim.cmd [[silent! GoInstallDeps]]
        end,
    },
}

return plugins
