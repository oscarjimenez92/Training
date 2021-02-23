import React from 'react'
import LabelCondor from '../../components/Label/Label'
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

let wrapper = null
const minProps = {
    text: ""
}
const component = shallow(<LabelCondor {...minProps} />)

test('test render label ', () => {
    wrapper = component
})

test('validate prop text', () => {
    wrapper = component
    expect(wrapper.text()).toEqual("")
})

test('prop tag default ', () => {
    wrapper = component
    const tag = wrapper.find('h1')
    expect(tag.length).toBe(1)
    expect(tag.props().className).toBe("")
})

test('prop tag with info ', () => {
    wrapper = component
    wrapper.setProps({tag: "span"})
    const tag = wrapper.find("span")
    expect(tag.length).toBe(1)
})

test('prop className default ', () => {
    wrapper = component
    expect(wrapper.props().className).toEqual("")
})

test('prop className with info ', () => {
    wrapper = component
    wrapper.setProps({className: "eui-text"})
    expect(wrapper.props().className).toEqual("eui-text")
})
