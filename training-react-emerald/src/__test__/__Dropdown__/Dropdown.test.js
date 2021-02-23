import React from "react";
import DropdownCondor from "../../components/Dropdown/Dropdown";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

const props = {
  toggleOnHover: true,
};
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
