import React from 'react'
import SkeletonCondor from "../../components/SkeletonLoader/Skeleton"
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
Enzyme.configure({ adapter: new Adapter() });

let wrapper;
const minProps = {
    loading: false
}
let component = shallow(<SkeletonCondor {...minProps}/>)

test('render ', () => {
    expect(component).not.toBeNull();
})

test('validate prop loading default', () => {
    expect(component.props().loading).toBe(false)
})

test('validate prop height default', () => {
    wrapper = component
    expect(wrapper.props().height).toBe("")
})

test('validate prop height ', () => {
    wrapper = component
    wrapper.setProps({height: "50px"})
    expect(wrapper.props().height).toBe("50px")
})

test('validate prop width default', () => {
    wrapper = component
    expect(wrapper.props().width).toBe("")
})

test('validate prop width with info', () => {
    wrapper = component
    wrapper.setProps({width: "100%"})
    expect(wrapper.props().width).toBe("100%")
})

test('validate prop style default', () => {
    wrapper = component
    expect(wrapper.props().style).toEqual({})
})

test('validate prop style with info', () => {
    wrapper = component
    let style = {color: "red"}
    wrapper.setProps({style})
    expect(wrapper.props().style).toBe(style)
})

act(() => {
    const setVisible = jest.fn();
    const skeleton = shallow(<SkeletonCondor loading={true} onClick={setVisible} />)
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(visibleSkeleton => [visibleSkeleton, setVisible]);
    skeleton.simulate("click");
    expect(setVisible).toBeTruthy();
})

