import { render } from "@testing-library/react";

import { GoRepo } from "react-icons/go";

import CenteredWithIcon from "../../components/CenteredWithIcon";

test("renders with icon component and children", () => {
  let screen = render(
    <CenteredWithIcon IconComponent={GoRepo}>Hello World!</CenteredWithIcon>
  );
  expect(
    screen.container.querySelector('svg[class="mr-2"]')
  ).toBeInTheDocument();
  expect(screen.getByText("Hello World!")).toBeInTheDocument();
});
