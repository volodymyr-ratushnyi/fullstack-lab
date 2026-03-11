import {pathsToModuleNameMapper} from 'ts-jest'
import tsconfig from './tsconfig.json' with { type: 'json' }

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  moduleDirectories: ["node_modules", "."],
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths,
    {prefix: '<rootDir>/'}
  )
};
