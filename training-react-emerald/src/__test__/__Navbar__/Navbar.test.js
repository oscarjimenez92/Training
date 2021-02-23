import React from 'react'
import HeaderCondor from "../../components/Navbar/Navbar"
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const dataCards = [{
    multimedia: [{url: "www.google.com"}, {url: "https://www.nytimes.com"}],
    snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deserunt quibusdam deleniti dignissimos possimus nesciunt commodi ab maxime officia iure, aperiam a voluptatum delectus quam eos? Officia exercitationem expedita magnam!",
    lead_paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
}]

const data = {
    breakAt: "lg",
    barClassName: "container-items",
    fixedAtTop: true,
    tabIndex: "2",
    data: dataCards
}

test('render navbar', () => {
    shallow(<HeaderCondor {...data} />)
})

test('render navbar brand', () => {
    const navbar = shallow(<HeaderCondor {...data}/>)
    expect(navbar.find("NavbarBrand").length).toBe(1)
})

test('render nav', () => {
    const navbar = shallow(<HeaderCondor {...data}/>)
    expect(navbar.find("Nav").length).toBe(2)
})

test('render DropdownCondor', () => {
    let nav = null
    const navbar = shallow(<HeaderCondor {...data}/>)
    expect(navbar.find("Nav").length).toBe(2)
    nav = navbar.find("Nav")
    expect(nav.find("DropdownCondor").length).toBe(1)
    expect(nav.find("a").length).toBe(3)
})

test('render avatar', () => {
    let nav = null
    const navbar = shallow(<HeaderCondor {...data}/>)
    nav = navbar.find("Nav")
    expect(navbar.find("Nav").find("a").find("Avatar").length).toBe(1)
})

test('avatar props ', () => {
    let nav = null
    const navbar = shallow(<HeaderCondor {...data}/>)
    nav = navbar.find("Nav")
    expect(navbar.find("Nav").find("a").find("Avatar").length).toBe(1)
    const avatar = navbar.find("Nav").find("a").find("Avatar")
    expect(avatar.props().title).toEqual("JS")
    expect(avatar.props().style).toEqual({backgroundColor: "#9100AD", color: "#fff"})
})


