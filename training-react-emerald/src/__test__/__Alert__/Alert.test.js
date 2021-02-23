import React from 'react'
import AlertCondor from "../../components/Alert/Alert"
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

let wrapper = null
const minProps = {
    textInfo: "data",
    onDismiss: () => {},
    dismissible: true
}
const component = shallow(
    <AlertCondor {...minProps}/>
);

test('render alert ', () => {
    wrapper = component;
}) 

test('render alert p', () => {
    wrapper = component;
    const p = wrapper.find('p');
    expect(p.length).toBe(1)
    expect(p.props().style).toEqual({"style": {}})
})

test('alert prop textInfo - p', () => {
    wrapper = component;
    const p = wrapper.find('p'); 
    expect(p.text()).toEqual('data');
})

test('alert func onDismiss ', () => {
    const onDismiss = jest.fn()
    minProps.onDismiss = onDismiss
    wrapper = component;
    wrapper.simulate('onDismiss')
    expect(onDismiss.mock)
})

test('validate prop dismissible default ', () => {
    wrapper = component;
    expect(wrapper.props().dismissible).toEqual(true)
})

test('validate prop tabIndex default ', () => {
    wrapper = component
    expect(wrapper.props().tabIndex).toBe("")
})

test('validate prop tabIndex with info ', () => {
    wrapper = component
    wrapper.setProps({ tabIndex: '20' })
    expect(wrapper.props().tabIndex).toEqual("20")
})
