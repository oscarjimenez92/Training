import React from 'react'
import CardCondor from "../../components/Card/Card"
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const props = {
    showImage: true,
    showNumberIndex: true,
    NumberIndex: "1",
    urlImage: "www.google.com",
    titleCard: "Title",
    textCardDescription: "Text card info",
    labelTitle: "label",
    labelDescription: "description"
}

let wrapper = shallow(<CardCondor {...props} />)

test('render', () => {
    wrapper
})

test('validate onClick ', () => {
    const handleClick = jest.fn();
    wrapper.setProps({onClick: handleClick})
    wrapper.simulate('click')
    expect(handleClick.mock.calls.length).toBe(1)
    wrapper.simulate('click') 
    expect(handleClick.mock.calls.length).toBe(2)
})

test('validate prop NumberIndex', () => {
    expect(wrapper.find("span").text()).toEqual(String(1))
})

