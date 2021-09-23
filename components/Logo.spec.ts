import { shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import Logo from './Logo.vue'

let wrapper: Wrapper<Vue>

describe('Logo.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Logo)
  })
  it('svgタグが表示されていること', () => {
    expect(wrapper.find('svg').exists()).toBeTruthy()
  })
  it('pathタグが表示されており、それが3つ存在していること', () => {
    expect(wrapper.findAll('path').at(0).exists()).toBeTruthy()
    expect(wrapper.findAll('path').at(1).exists()).toBeTruthy()
    expect(wrapper.findAll('path').at(2).exists()).toBeTruthy()
  })
})
