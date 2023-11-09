import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.ts$': '$1'
  },
  extensionsToTreatAsEsm: ['.ts']
}

export default config
