import React from "react";
import { Story, Meta } from "@storybook/react";

import { SpaceBackground, SpaceBackgroundProps } from "..";

export default {
  title: "SpaceBackground",
  component: SpaceBackground,
} as Meta;

const Template: Story<SpaceBackgroundProps> = (args) => (
  <SpaceBackground {...args} />
);

export const Default = Template.bind({});

Default.args = {
  width: 300,
  height: 300,
};
