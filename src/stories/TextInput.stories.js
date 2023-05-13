import "../index.css"
import {TextInput} from "../components/atoms/input.jsx";


export default {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {},
};


export const DefaultTextInput = {
  args: {
    label: "Default",
    value:"Hello",
  }
}