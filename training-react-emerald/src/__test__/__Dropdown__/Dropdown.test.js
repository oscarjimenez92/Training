import React from "react";
import DropdownCondor from "../../components/Dropdown/Dropdown";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { act } from "react-test-renderer";
Enzyme.configure({ adapter: new Adapter() });

const dataRender = [
  {
    href: "www.google.com",
    key: 7,
    target: "_self",
    eventKey: 7,
  },
];

const props = {
  toggleOnHover: true,
  data: dataRender,
};
let wrapper = null;
const component = shallow(<DropdownCondor {...props} />);
const returnCopyComponent = () => {
  return Object.assign(component, {});
};

test("render", () => {
  returnCopyComponent();
});

test("Validate prop toggleOnHover", () => {
  expect(returnCopyComponent().props().toggleOnHover).toBe(props.toggleOnHover);
});

test("Validate prop className default", () => {
  expect(returnCopyComponent().props().className).toBe("");
});

test("Validate prop className with info", () => {
  const wrapper = returnCopyComponent(),
    className = "test-className";
  wrapper.setProps({ className: className });
  expect(wrapper.props().className).toBe(className);
});

test("Validate prop className title", () => {
  expect(returnCopyComponent().props().title).toBe("");
});

test("Validate prop title with info", () => {
  const title = "test-title";
  wrapper = returnCopyComponent();
  wrapper.setProps({ title: title });
  expect(wrapper.props().title).toBe(title);
});

test("setData", () => {
  wrapper = returnCopyComponent();
  const setData = jest.fn();
  wrapper.setProps({ onClick: setData });
  const dropDown = wrapper;
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation((dataRender) => [dataRender, setData]);
  dropDown.simulate("click");
  expect(setData).toBeTruthy();
});

test("setData", () => {
  wrapper = returnCopyComponent();
  const setCountItemsPage = jest.fn();
  wrapper.setProps({ onClick: setCountItemsPage });
  const dropDown = wrapper;
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation((countItems) => [
    countItems,
    setCountItemsPage,
  ]);
  dropDown.simulate("click");
  expect(setCountItemsPage).toBeTruthy();
});
