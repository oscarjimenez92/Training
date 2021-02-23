import React from 'react'
import PanelCondor from "../../components/Panel/Panel"
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const dataCards = [{
    multimedia: [{url: "www.google.com"}, {url: "https://www.nytimes.com"}],
    snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deserunt quibusdam deleniti dignissimos possimus nesciunt commodi ab maxime officia iure, aperiam a voluptatum delectus quam eos? Officia exercitationem expedita magnam!",
    lead_paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
}]

test('render panel', () => {
    shallow(<PanelCondor dataCards={dataCards} />)
})

test('validate prop tabIndex default', () => {
    const wrapper = shallow(<PanelCondor dataCards={dataCards} />)
    expect(wrapper.props().tabIndex).toEqual("")
})

test('validate prop tabIndex with info', () => {
    const wrapper = shallow(<PanelCondor dataCards={dataCards} />)
    wrapper.setProps({tabIndex: "10"})
    expect(wrapper.props().tabIndex).toEqual("10")
})

test('Render panel body ', () => {
    const wrapper = shallow(<PanelCondor dataCards={dataCards} />)
    expect(wrapper.find('PanelBody').length).toBe(1)
})

test('Render grid cards condor ', () => {
    const wrapper = shallow(<PanelCondor dataCards={dataCards} />)
    expect(wrapper.find('PanelBody').find('GridCardsCondor').length).toBe(1)
})

test('validate props gridCard', () => {
    const wrapper = shallow(<PanelCondor dataCards={dataCards} />)
    const panelBody = wrapper.find('PanelBody')
    expect(panelBody.length).toEqual(1)
    expect(panelBody.find('GridCardsCondor').length).toEqual(1)
    const gridCard = panelBody.find('GridCardsCondor')
    expect(gridCard.props().dataCard).toEqual(dataCards)
    expect(gridCard.props().currentItems).toEqual("")
    expect(gridCard.props().countItemsPage).toEqual(0)
})


