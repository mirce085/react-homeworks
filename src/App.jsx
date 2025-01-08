import './App.css';
import {Checkbox} from "./components/Checkbox";
import {TextInput} from "./components/TextInput";
import {Form} from "./components/Form";

function App() {
  return (
    <>
      <Form>
        <TextInput name={"username"} label={"Username"}/>
        <br/>
        <Checkbox name={"plugins"} label={"Plugin 1"} value={"1"}/>
        <Checkbox name={"plugins"} label={"Plugin 2"} value={"2"}/>
        <Checkbox name={"plugins"} label={"Plugin 3"} value={"3"}/>
        <Checkbox name={"plugins"} label={"Plugin 4"} value={"4"}/>
        <br/>
        <button type='submit'>Submit</button>
      </Form>
    </>
  );
}

export default App;
