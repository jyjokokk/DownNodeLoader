import {
  changeExtension,
  createDir,
  createDirectories,
  readLines,
  readLinesSync,
  renameFileWithNumbering,
} from './file-handler.utils'

const textFile1 = ['file1.txt', 'file2.txt', 'file3.md'].join('\n')

let fileSystem = {
  textFile1,
}

function readFileMock(fileName) {
  calls.fs.readFile = true
  if (!fileSystem[fileName]) {
    throw new Error('File not found')
  }
  return fileSystem[fileName]
}

jest.mock('node:fs/promises', () => ({
  mkdir: async str => {
    calls.fs.mkdir = true
    calls.fs.mkdirCount++
    return str
  },
  readFile: async fileName => readFileMock(fileName),
  rename: s => s,
  access: async str => {
    if (!fileSystem[str]) {
      throw new Error('File not found')
    }
    return
  },
}))

jest.mock('node:fs', () => ({
  readFileSync: fileName => readFileMock(fileName),
}))
jest.spyOn(console, 'error').mockImplementation(() => {})

let calls: any
beforeEach(() => {
  jest.clearAllMocks()
  fileSystem = {
    textFile1,
  }
  calls = {
    fs: {
      mkdir: false,
      mkdirCount: 0,
    },
  }
})

describe('changeExtension', () => {
  it('should change the extension of a file path', () => {
    const result = changeExtension('example.txt', 'tmp')
    expect(result).toStrictEqual(['example.tmp', '.txt'])
  })

  it('should add an extension if there is none', () => {
    const result = changeExtension('example', 'md')
    expect(result).toStrictEqual(['example.md', ''])
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
describe('readLinesSync', () => {
  it('should read lines from a file synchronously', () => {
    const result = readLinesSync('textFile1')
    expect(result.length).toBe(3)
  })
  it('should return an empty array if no file is found synchronously', () => {
    const result = readLinesSync('nonExistentFile')
    expect(result).toStrictEqual([])
  })
})
describe('renameFileWithNumbering', () => {
  it('should rename a file without numbering if no conflict', async () => {
    const result = await renameFileWithNumbering('file1.txt', 'newFile')
    expect(result).toBe('newFile.txt')
  })

  it('should rename a file with numbering if there is a conflict', async () => {
    fileSystem['newFile.txt'] = 'content'
    const result = await renameFileWithNumbering('file1.txt', 'newFile')
    expect(result).toBe('newFile(1).txt')
  })

  it('should rename a file with incremented numbering if multiple conflicts', async () => {
    fileSystem['newFile.txt'] = 'content'
    fileSystem['newFile(1).txt'] = 'content'
    const result = await renameFileWithNumbering('file1.txt', 'newFile')
    expect(result).toBe('newFile(2).txt')
  })
})
