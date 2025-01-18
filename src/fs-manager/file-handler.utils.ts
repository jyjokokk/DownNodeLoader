import fs from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import path from 'node:path'

export function changeExtension(
  filePath: string,
  newExtension: string
): readonly [string, string] {
  const { name, dir, ext } = path.parse(filePath)
  const newPath = path.join(dir, `${name}.${newExtension}`)
  return [newPath, ext] as readonly [string, string]
}

export function createDir(dirPath: string): Promise<string> {
  return fs.mkdir(dirPath, { recursive: true })
}

export function createDirectories(dirPaths: string[]): Promise<string[]> {
  return Promise.all(dirPaths.map(createDir))
}

export async function readLines(filePath: string): Promise<string[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return data.split('\n')
  } catch (error) {
    console.error(error)
    return []
  }
}

export function readLinesSync(filePath: string): string[] {
  try {
    const data = readFileSync(filePath, 'utf-8')
    return data.split('\n')
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function renameFileWithNumbering(
  filePath: string,
  newBaseName: string
): Promise<string> {
  const { dir, ext } = path.parse(filePath)
  let newPath = path.join(dir, `${newBaseName}${ext}`)
  let counter = 1

  while (true) {
    try {
      await fs.access(newPath)
      newPath = path.join(dir, `${newBaseName}(${counter})${ext}`)
      counter++
    } catch {
      break
    }
  }

  await fs.rename(filePath, newPath)
  return newPath
}
