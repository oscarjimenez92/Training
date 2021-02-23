import React from "react";
import CardCondor from "../../components/Card/Card";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

const props = {
  showImage: true,
  showNumberIndex: true,
  NumberIndex: "1",
  urlImage: "www.google.com",
  titleCard: "Title",
  textCardDescription: "Text card info",
  labelTitle: "label",
  labelDescription: "description",
};

let wrapper = shallow(<CardCondor {...props} />);

test("render", () => {
  wrapper;
});

test("validate prop id", () => {
  wrapper.setProps({ id: "test" });
  expect(wrapper.props().id).toEqual("test");
});

test("validate prop classNameCard", () => {
  const classCard = "test-class";
  wrapper.setProps({ classNameCard: classCard });
  expect(wrapper.props().className).toEqual(classCard);
});

test("validate onClick ", () => {
  const handleClick = jest.fn();
  wrapper.setProps({ onClick: handleClick });
  wrapper.simulate("click");
  expect(handleClick.mock.calls.length).toBe(1);
  wrapper.simulate("click");
  expect(handleClick.mock.calls.length).toBe(2);
});

test("render img and prop showImage", () => {
  if (props.showImage) {
    expect(wrapper.find(".container-img-card").find("img").props().src).toEqual(
      props.urlImage
    );
  } else expect(wrapper.find("LabelCondor").length).toEqual(2);
});

test("validate prop NumberIndex", () => {
  if (props.showImage) {
    expect(wrapper.find("span").text()).toEqual(String(1));
  } else expect(wrapper.find("LabelCondor").length).toEqual(2);
});

test("URL image", () => {
  if (props.showImage) {
    expect(wrapper.find("img").props().src).toEqual(props.urlImage);
  } else expect(wrapper.find("LabelCondor").length).toEqual(2);
});

test("validate render LabelCondor", () => {
  expect(wrapper.find("LabelCondor").length).toEqual(2);
});

test("validate props labelTitle and titleCard", () => {
  expect(
    wrapper
      .find("LabelCondor")
      .filter(
        (label) =>
          label.props().text() === props.titleCard &&
          labels.props().titleCard === props.titleCard
      )
  );
});

test("Validate props labelDescription and textCardDescription", () => {
  expect(
    wrapper
      .find("LabelCondor")
      .filter(
        (label) =>
          label.props().text() === props.textCardDescription &&
          labels.props().labelDescription === props.labelDescription
      )
  );
});
