import fs from 'node:fs/promises'
import { readFileSync } from 'node:fs'

export function changeExtension(
  filePath: string,
  newExtension: string
): string {
  const dotIndex = filePath.lastIndexOf('.')
  if (dotIndex === -1) {
    return `${filePath}.${newExtension}`
  }
  return `${filePath.slice(0, dotIndex)}.${newExtension}`
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
