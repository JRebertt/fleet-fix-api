/* eslint-disable @typescript-eslint/no-empty-function */
import { Environment } from 'vitest'

export default <Environment>{
  name: 'vitest-environment-prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Executou')
    return {
      teardown() {},
    }
  },
}
