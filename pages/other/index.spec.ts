import { shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import index from './index.vue'

describe('other/indexのテスト', () => {
  let wrapper: Wrapper<Vue>
  wrapper = shallowMount(index)
  it.todo('中身のあるテストを書く')

  afterEach(() => {
    console.log('テスト終了', wrapper)
  })
})
