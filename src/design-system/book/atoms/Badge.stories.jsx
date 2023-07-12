import { Badge } from "../../components/atoms/badge";
import { Info as InfoIcon } from "@jengaicons/react";


export default {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {},
};

export const Neutral = {
  args: {
    type: "neutral",
    label: "Neutral"
  }
}
export const Danger = {
  args: {
    type: "danger",
    label: "Danger"
  }
}
export const Info = {
  args: {
    type: "info",
    label: "Info"
  }
}
export const Success = {
  args: {
    type: "success",
    label: "Success",
    icon: InfoIcon
  }
}
export const Warning = {
  args: {
    type: "warning",
    label: "Warning"
  }
}



