import React from "react";
import ButtonCondor from "../../components/Button/Button";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

let wrapper = null;
test("loading default ", () => {
  wrapper = mount(<ButtonCondor />);
  expect(wrapper.props().loading).toBe(false);
});

test("loading with info ", () => {
  wrapper = mount(<ButtonCondor loading={true} />);
  expect(wrapper.props().loading).toBe(true);
});

test("progress default ", () => {
  wrapper = mount(<ButtonCondor />);
  expect(wrapper.props().progress).toBe(0);
});

test("progress with info ", () => {
  const number = Math.floor(Math.random() * (100 - 0)) + 0;
  wrapper = mount(<ButtonCondor progress={number} />);
  expect(wrapper.props().progress).toBe(number);
});

test("text default ", () => {
  wrapper = mount(<ButtonCondor />);
  expect(wrapper.props().text).toBe("Button");
});

test("text with info ", () => {
  const text = "test jest";
  wrapper = mount(<ButtonCondor text={text} />);
  expect(wrapper.props().text).toBe(text);
});

test("color default ", () => {
  wrapper = mount(<ButtonCondor />);
  expect(wrapper.props().color).toBe("default");
});

test("color with info ", () => {
  const colors = ["info", "success", "default", "warning", "danger"];
  const colorSelected = colors[Math.floor(Math.random() * colors.length)];
  wrapper = mount(<ButtonCondor color={colorSelected} />);
  expect(wrapper.props().color).toBe(colorSelected);
});

test("tabIndex default ", () => {
  wrapper = mount(<ButtonCondor />);
  expect(wrapper.props().tabIndex).toBe("");
});

test("tabIndex with info ", () => {
  const tabIndex = String(Math.floor(Math.random()));
  wrapper = mount(<ButtonCondor tabIndex={tabIndex} />);
  expect(wrapper.props().tabIndex).toBe(tabIndex);
});

test("className default ", () => {
  wrapper = mount(<ButtonCondor />);
  expect(wrapper.props().className).toBe("");
});

test("className with info ", () => {
  const className = "eui-card";
  wrapper = mount(<ButtonCondor className={className} />);
  expect(wrapper.props().className).toBe(className);
});

test("validate rendering of onClick property ", () => {
  const callback = jest.fn();
  wrapper = shallow(<ButtonCondor onClick={callback} />);
  wrapper.simulate("click");
  expect(callback).toHaveBeenCalled();
});

test("functional validation of the onClick property", () => {
  const callbackButton = jest.fn();
  wrapper = shallow(<ButtonCondor text='Click me!' onClick={callbackButton} />);
  wrapper.simulate("click");
  expect(callbackButton.mock.calls.length).toEqual(1);
  wrapper.simulate("click");
  expect(callbackButton.mock.calls.length).toEqual(2);
});
