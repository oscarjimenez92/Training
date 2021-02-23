import React from 'react'
import PanelSubscribe from "../../components/PanelSubscribe/PanelSubscribe"
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const props = {
    titleSubscribe: "Subscribe", 
    textSubscribe: "Thanks", 
    showButton: true, 
    visible: true, 
}
let component = shallow(<PanelSubscribe {...props} />)
test('render PanelSubscribe ', () => {
    const wrapper = component
})

test('validate prop showButton', () => {
    const wrapper = component
    wrapper.setProps({showButton: false})
    expect(wrapper.props().showButton).toBeFalsy()
})

test('validate prop textButton default', () => {
    const wrapper = component
    expect(wrapper.find("button").length).toBe(1)
    expect(wrapper.find("button").text()).toEqual("button")
})

test('validate prop textButton with info', () => {
    const wrapper = component
    wrapper.setProps({textButton: "ButtonTest"})
    expect(wrapper.find("button").text()).toEqual("ButtonTest")
})

test('validate prop titleSubscribe', () => {
    const wrapper = component
    expect(wrapper.find("span").filter(span => span.text() === "Subscribe" ))
})

test('validate prop textSubscribe', () => {
    const wrapper = component
    expect(wrapper.find("span").filter(span => span.text() === "Thanks" ))
})

test('setVisible hook useState ', () => {
    const wrapper = component
    const setVisible = jest.fn()
    wrapper.setProps({onClick: setVisible})
    const handleClick = jest.spyOn(React, 'useState')
    handleClick.mockImplementation(visibleContainer => [visibleContainer, setVisible])
    wrapper.simulate('click')
    expect(setVisible).toBeTruthy();
})
