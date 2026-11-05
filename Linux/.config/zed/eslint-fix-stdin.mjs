#!/usr/bin/env node
// Внешний форматтер для Zed: прогоняет содержимое буфера через локальный
// eslint --fix проекта в обход бага code_actions_on_format (source.fixAll.eslint)
// см. https://github.com/zed-industries/zed/issues/40996
//
// Использование: node eslint-fix-stdin.mjs <абсолютный путь к файлу>
// stdin  — исходное содержимое буфера
// stdout — исправленное содержимое (или исходное без изменений при любой ошибке)

import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const filePath = process.argv[2]
const original = readFileSync(0, 'utf8')

const fail = () => {
  process.stdout.write(original)
  process.exit(0)
}

if (!filePath) fail()

const findEslintBin = (startDir) => {
  let dir = startDir
  for (let i = 0; i < 20; i++) {
    const bin = join(dir, 'node_modules', '.bin', 'eslint')
    if (existsSync(bin)) return bin
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return null
}

const eslintBin = findEslintBin(dirname(filePath))
if (!eslintBin) fail()

const result = spawnSync(
  eslintBin,
  ['--stdin', '--stdin-filename', filePath, '--fix-dry-run', '--format', 'json'],
  { input: original, encoding: 'utf8', maxBuffer: 1024 * 1024 * 32 },
)

if (result.error) fail()

try {
  const parsed = JSON.parse(result.stdout || '[]')
  const output = parsed[0]?.output
  process.stdout.write(typeof output === 'string' ? output : original)
} catch {
  fail()
}
