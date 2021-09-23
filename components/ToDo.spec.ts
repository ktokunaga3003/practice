import { shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue/types/umd'
import ToDo from './ToDo.vue'

let wrapper: Wrapper<Vue>

describe('ToDo', () => {
  beforeEach(() => {
    wrapper = shallowMount(ToDo, {
      propsData: {
        todo: {
          id: 1,
          text: 'test',
        },
      },
    })
  })
  it('todoリストをpropで受け取っていること', () => {
    expect(wrapper.vm.$props.todo).toEqual({
      id: 1,
      text: 'test',
    })
    expect(wrapper.props('todo')).toEqual({
      id: 1,
      text: 'test',
    })
  })

  it('受けとったpropのtextをリスト内にメッセージとして画面に表示していること', () => {
    const listWrapper = wrapper.find('li')
    expect(listWrapper.html()).toBeTruthy()
    expect(listWrapper.text()).toEqual('test')
  })
})
