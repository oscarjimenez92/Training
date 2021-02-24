import React from "react";
import FormCondor from "../../components/Form/Form";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

const dataForm = {
  firstname: "Data",
  lastname: "",
  email: "",
  phonenumber: "",
  comments: "",
  sendEmail: false,
};

const props = {
  loading: true,
  onSubmit: jest.fn(),
};
const returnLabelOrNameField = (index, type) => {
  let str = Object.keys(dataForm)[index];
  if (type === "label") {
    return str[0].toUpperCase() + str.slice(1);
  } else return str;
};

const component = shallow(<FormCondor {...props} />);
test("render", () => {
  component;
  //console.log(component.debug());
});

test("render footer", () => {
  expect(component.find(".footer-contact-us").length).toEqual(1);
});

test("render form", () => {
  expect(component.find(".footer-contact-us").find("form").length).toBe(1);
});

test("validate prop submit ", () => {
  const wrapper = Object.assign(component, {});
  wrapper.setProps({ onSubmit: jest.fn() });
  wrapper.simulate("click");
});

test("validate render form and props", () => {
  const tabIndex = Math.floor(Math.random() * 100);
  const form = component.find(".footer-contact-us").find("form");
  expect(form.props().tabIndex).toEqual("");
  component.setProps({ tabIndex: tabIndex });
  expect(
    component.find(".footer-contact-us").find("form").props().tabIndex
  ).toEqual(tabIndex);
});

test("test render inputs fields", () => {
  if (props.loading) {
    expect(component.find("TextField").length).toEqual(5);
  } else {
    expect(component.find("SkeletonCondor").length).toEqual(7);
  }
});

test("validate props input", () => {
  if (props.loading) {
    const inputs = component.find("TextField").getElements();
    let i = 0;
    while (i < inputs.length) {
      if (!!!inputs[i].props.errorMessage) {
        expect(inputs[i].props.errorMessage).toEqual("");
      } else {
        expect(inputs[i].props.errorMessage).toEqual(
          "fill in the name field Firstname"
        );
      }
      expect(inputs[i].props.label).toEqual(returnLabelOrNameField(i, "label"));
      expect(inputs[i].props.name).toEqual(returnLabelOrNameField(i, "name"));
      expect(inputs[i].props.type).toEqual(
        i === 0 || i === 1 || i === 4
          ? "text"
          : i === 2
          ? "email"
          : i === 3
          ? "number"
          : "text"
      );
      i++;
    }
  }
});

test("render button submit", () => {
  expect(component.find("ButtonCondor"));
});
