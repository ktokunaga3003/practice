import { RouterLinkStub, shallowMount, Wrapper } from '@vue/test-utils'
import Vue from 'vue/types/umd'
import index from '~/pages/index.vue'

let wrapper: Wrapper<Vue>

describe('start page', () => {
  beforeEach(() => {
    wrapper = shallowMount(index, {
      data() {
        return {
          inputValue: '',
          textValue: '',
          errorMessage: '',
          error: false,
          sumValue: 0,
          listValue: '',
          todos: [{ text: 'test1' }, { text: 'test2' }],
        }
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
  })
  describe('画面表示', () => {
    it('テスト用のテキストボックスと、そのラベルが表示されていること', () => {
      expect(wrapper.find('label').exists()).toBeTruthy()
      expect(wrapper.find('#text-area').exists()).toBeTruthy()
    })
    it('Reverseボタンが表示されていること', () => {
      expect(wrapper.findAll('button').at(0).exists()).toBeTruthy()
      expect(wrapper.findAll('button').at(0).text()).toEqual('Reverse')
    })
    it('Otherボタンが表示されている、ボタンにはOtherページのリンクが貼られていること', () => {
      expect(wrapper.findAll('button').at(1).exists()).toBeTruthy()
      expect(wrapper.findAll('button').at(1).text()).toEqual('Other')
    })
    it('googleの文字列にはwww.google.comのリンクが貼られていること', () => {
      expect(wrapper.findAll('a').at(1).text()).toEqual('google')
      expect(wrapper.findAll('a').at(1).attributes().href).toEqual(
        'http://www.google.com'
      )
    })
    it('switchボタンが表示されていること', () => {
      expect(wrapper.find('.switch-button').exists()).toBeTruthy()
      expect(wrapper.find('.switch-button').text()).toEqual('switch')
    })
    it('switch結果のclearボタンが表示されていること', () => {
      expect(wrapper.find('.switch-clear-button').exists()).toBeTruthy()
      expect(wrapper.find('.switch-clear-button').text()).toEqual('clear')
    })
    it('sumボタンが表示されていること', () => {
      expect(wrapper.find('.sum-button').exists()).toBeTruthy()
      expect(wrapper.find('.sum-button').text()).toEqual('sum')
    })
    it('sum結果のclearボタンが表示されていること', () => {
      expect(wrapper.find('.sum-clear-button').exists()).toBeTruthy()
      expect(wrapper.find('.sum-clear-button').text()).toEqual('clear')
    })
    it('todoリストに追加するためのテキストボックスが表示されていること', () => {
      expect(wrapper.find('.list-input').exists()).toBeTruthy()
      expect(wrapper.find('.list-input').attributes().type).toEqual('text')
    })
    it('addListボタンが表示されていること', () => {
      expect(wrapper.find('.add-list-button').exists()).toBeTruthy()
      expect(wrapper.find('.add-list-button').text()).toEqual('addList')
    })
  })
  describe('input-area', () => {
    let inputAreaWrapper: Wrapper<Vue>
    let inputValueShowAreaWrapper: Wrapper<Vue>
    let reverseButtonWrapper: Wrapper<Vue>
    const testInput = 'test'
    const reverseInputValue = testInput.split('').reverse().join('')
    beforeEach(() => {
      inputAreaWrapper = wrapper.find('.input-area')
      inputValueShowAreaWrapper = wrapper.find('.input-value-show-area')
      reverseButtonWrapper = wrapper.find('.reverse-button')
    })
    it('input-areaに入力された値がinput-value-show-areaに表示されていること', async () => {
      // expect(wrapper.find('.input-area').text()).toEqual('')
      expect(inputValueShowAreaWrapper.text()).toEqual('')

      // await inputAreaWrapper.setValue(testInput)
      inputAreaWrapper.setValue(testInput)
      await wrapper.vm.$nextTick()

      // expect(wrapper.find('.input-area').text()).toEqual(testInput)
      expect(inputValueShowAreaWrapper.text()).toEqual(testInput)
    })
    it('Reverseボタンを押下すると、inputValueの値が反転すること', async () => {
      inputAreaWrapper.setValue(testInput)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$data.inputValue).toEqual(testInput)
      reverseButtonWrapper.trigger('click')
      expect(wrapper.vm.$data.inputValue).toEqual(reverseInputValue)
    })
    it('Reverseボタンを押下すると、input-value-show-areaの表示も反転すること', async () => {
      inputAreaWrapper.setValue(testInput)
      await wrapper.vm.$nextTick()
      expect(inputValueShowAreaWrapper.text()).toEqual(testInput)
      reverseButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(inputValueShowAreaWrapper.text()).toEqual(reverseInputValue)
    })
  })
  describe('switch', () => {
    let mathFloorSpy: jest.SpyInstance
    let mathRandomSpy: jest.SpyInstance
    let switchButtonWrapper: Wrapper<Vue>
    let switchClearButtonWrapper: Wrapper<Vue>
    beforeEach(() => {
      mathFloorSpy = jest.spyOn(Math, 'floor')
      mathRandomSpy = jest.spyOn(Math, 'random')
      switchButtonWrapper = wrapper.find('.switch-button')
      switchClearButtonWrapper = wrapper.find('.switch-clear-button')
    })
    it('ランダムで生成した数値で、エラーメッセージの表示有無が変わること', async () => {
      // case 1
      mathRandomSpy.mockReturnValue(0)
      mathFloorSpy.mockReturnValue(0)
      switchButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$data.error).toBeFalsy()
      expect(wrapper.vm.$data.errorMessage).toEqual('')

      // case 2
      mathRandomSpy.mockReturnValue(0.2)
      mathFloorSpy.mockReturnValue(1)
      switchButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$data.error).toBeFalsy()
      expect(wrapper.vm.$data.errorMessage).toEqual('')

      // case 3
      mathRandomSpy.mockReturnValue(0.4)
      mathFloorSpy.mockReturnValue(2)
      await wrapper.vm.$nextTick()
      switchButtonWrapper.trigger('click')
      expect(wrapper.vm.$data.error).toBeTruthy()
      expect(wrapper.vm.$data.errorMessage).toEqual('error')

      // case 4
      mathRandomSpy.mockReturnValue(0.6)
      mathFloorSpy.mockReturnValue(3)
      await wrapper.vm.$nextTick()
      switchButtonWrapper.trigger('click')
      expect(wrapper.vm.$data.error).toBeTruthy()
      expect(wrapper.vm.$data.errorMessage).toEqual('error')

      // default
      mathRandomSpy.mockReturnValue(1)
      mathFloorSpy.mockReturnValue(5)
      switchButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$data.error).toBeFalsy()
      expect(wrapper.vm.$data.errorMessage).toEqual('error')
    })

    it('ランダムで生成した数値で、エラーメッセージの表示されたとき、clearボタン押下でエラーメッセージが消えること', async () => {
      // case 3の場合で検証
      mathRandomSpy.mockReturnValue(0.4)
      mathFloorSpy.mockReturnValue(2)
      await wrapper.vm.$nextTick()
      switchButtonWrapper.trigger('click')
      expect(wrapper.vm.$data.error).toBeTruthy()
      expect(wrapper.vm.$data.errorMessage).toEqual('error')

      switchClearButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$data.error).toBeFalsy()
      expect(wrapper.vm.$data.errorMessage).toEqual('')
    })
  })
  describe('sum', () => {
    let sumButtonWrapper: Wrapper<Vue>
    let sumClearButtonWrapper: Wrapper<Vue>
    let mathFloorSpy: jest.SpyInstance
    let mathRandomSpy: jest.SpyInstance
    beforeEach(() => {
      sumButtonWrapper = wrapper.find('.sum-button')
      sumClearButtonWrapper = wrapper.find('.sum-clear-button')
      mathFloorSpy = jest.spyOn(Math, 'floor')
      mathRandomSpy = jest.spyOn(Math, 'random')
    })
    it('sumボタン押下時にランダム生成された２つの数値で足し算を行うこと', async () => {
      mathRandomSpy.mockReturnValueOnce(0.5).mockReturnValueOnce(1)
      mathFloorSpy.mockReturnValueOnce(50).mockReturnValueOnce(100)
      expect(wrapper.vm.$data.sumValue).toEqual(0)
      expect(wrapper.find('.show-sum').exists()).toBeFalsy()

      sumButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$data.sumValue).toEqual(150)
      expect(wrapper.find('.show-sum').exists()).toBeTruthy()
      expect(wrapper.find('.show-sum').text()).toEqual(
        String(wrapper.vm.$data.sumValue)
      )
    })
    it('sumボタンを押下して加算して表示した値をclearボタンでクリアすること', async () => {
      mathRandomSpy.mockReturnValueOnce(0.5).mockReturnValueOnce(1)
      mathFloorSpy.mockReturnValueOnce(50).mockReturnValueOnce(100)
      sumButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$data.sumValue).toEqual(150)
      expect(wrapper.find('.show-sum').exists()).toBeTruthy()
      expect(wrapper.find('.show-sum').text()).toEqual(
        String(wrapper.find('.show-sum').text())
      )

      sumClearButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$data.sumValue).toEqual(0)
      expect(wrapper.find('.show-sum').exists()).toBeFalsy()
    })
  })
  describe('list', () => {
    const listInputValue = 'list'
    const listInputValueForTrim = '    '
    let listInputWrapper: Wrapper<Vue>
    let addListButtonWrapper: Wrapper<Vue>
    beforeEach(() => {
      listInputWrapper = wrapper.find('.list-input')
      addListButtonWrapper = wrapper.find('.add-list-button')
    })
    it('toDoリストにdataで保持している値を初期表示していること', () => {
      for (let i = 0; i < wrapper.vm.$data.todos.length; i++) {
        expect(
          wrapper.find('.to-do-lists').findAll('.to-do').at(i).exists()
        ).toBeTruthy()
        expect(
          wrapper.find('.to-do-lists').findAll('.to-do').at(i).text()
        ).toEqual(wrapper.vm.$data.todos[i].text)
      }
    })
    it('list追加用のテキストボックスに入力を行い、addListボタン押下でその入力値がtodoリストの末尾に追加されて表示されること', async () => {
      expect(wrapper.vm.$data.listValue).toEqual('')

      await listInputWrapper.setValue(listInputValue)
      expect(wrapper.vm.$data.listValue).toEqual(listInputValue)
      addListButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()

      const lastIndex = wrapper.vm.$data.todos.length - 1

      expect(wrapper.vm.$data.listValue).toEqual('')
      expect(
        wrapper.find('.to-do-lists').findAll('.to-do').at(lastIndex).exists()
      ).toBeTruthy()
      expect(
        wrapper.find('.to-do-lists').findAll('.to-do').at(lastIndex).text()
      ).toEqual(listInputValue)
    })
    it('空白のみの入力でaddListボタンを押下してもリストに追加されないこと', async () => {
      await listInputWrapper.setValue(listInputValueForTrim)
      expect(wrapper.vm.$data.listValue).toEqual(listInputValueForTrim)
      addListButtonWrapper.trigger('click')
      await wrapper.vm.$nextTick()

      const lastIndex = wrapper.vm.$data.todos.length - 1

      expect(wrapper.vm.$data.listValue).toEqual('')
      expect(lastIndex).toEqual(1)
      expect(
        wrapper.find('.to-do-lists').findAll('.to-do').at(lastIndex).text()
      ).toEqual(wrapper.vm.$data.todos[1].text)
    })
  })
})

describe('practice test', () => {
  it('sum', () => {
    // const wrapper = shallowMount(index)
    // expect(this.wrapper.sum(1, 2)).toEqual(3)
    expect(1 + 2).toEqual(3)
  })

  it('two plus two is four', () => {
    expect(2 + 2).toBe(4)
  })

  it('object assignment', () => {
    const data = { one: 1 }
    // data.two = 2
    const data2 = Object.assign(data, { two: 2 })
    expect(data2).toEqual({ one: 1, two: 2 })
  })
})
