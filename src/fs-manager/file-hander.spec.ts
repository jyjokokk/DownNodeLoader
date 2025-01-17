import {
  changeExtension,
  createDir,
  createDirectories,
  readLines,
} from './file-handler.utils'

const textFile1 = ['file1.txt', 'file2.txt', 'file3.md'].join('\n')

const fileSystem = {
  textFile1,
}

jest.mock('node:fs/promises', () => ({
  mkdir: async str => {
    calls.fs.mkdir = true
    calls.fs.mkdirCount++
    return str
  },
  readFile: async fileName => {
    calls.fs.readFile = true
    if (!fileSystem[fileName]) {
      throw new Error('File not found')
    }
    return fileSystem[fileName]
  },
}))
jest.spyOn(console, 'error').mockImplementation(() => {})

let calls: any
beforeEach(() => {
  jest.clearAllMocks()
  calls = {
    fs: {
      mkdir: false,
      mkdirCount: 0,
    },
  }
})

describe('changeExtension', () => {
  it('should change the extension of a file path', () => {
    const result = changeExtension('example.txt', 'md')
    expect(result).toBe('example.md')
  })

  it('should add an extension if there is none', () => {
    const result = changeExtension('example', 'md')
    expect(result).toBe('example.md')
  })
})

describe('createDir', () => {
  it('should create a directory', async () => {
    const result = await createDir('mockDirPath')
    expect(result).toBe('mockDirPath')
    expect(calls.fs.mkdir).toBe(true)
  })
})

describe('createDirectories', () => {
  it('should create multiple directories', async () => {
    const dirPaths = ['dir1', 'dir2']
    const result = await createDirectories(dirPaths)
    expect(result).toStrictEqual(dirPaths)
    expect(calls.fs.mkdirCount).toBe(2)
  })
})

describe('readLines', () => {
  it('should read lines from a file', async () => {
    const result = await readLines('textFile1')
    expect(result.length).toBe(3)
    expect(calls.fs.readFile).toBe(true)
  })
  it('should return an empty array if no file is found', async () => {
    const result = await readLines('nonExistentFile')
    expect(result).toStrictEqual([])
    expect(calls.fs.readFile).toBe(true)
  })
})
