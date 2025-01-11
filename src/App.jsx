import './App.css';
import {Form} from "./components/Form";

const formFields = [
  {
    type: 'text',
    pattern: '^[a-z]{6,16}$',
    label: 'Username',
    name: 'username'
  },
  {
    type: 'checkbox',
    min: 1,
    max: 3,
    name: 'plugins',
    children: [{
      label: 'Plagin 1',
      value: '1'
    },
      {
        label: 'Plagin 2',
        value: '2'
      },
      {
        label: 'Plagin 3',
        value: '3'
      },
      {
        label: 'Plagin 4',
        value: '4'
      }]
  }
]

function App() {
  return (
    <>
      <Form formStructure={formFields}>
        <button type='submit'>Submit</button>
      </Form>
    </>
  );
}

export default App;
