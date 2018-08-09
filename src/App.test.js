import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListItem from '@material-ui/core/ListItem';


Enzyme.configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a single list component', () => {
  const app = shallow(<App />);
  expect(app.find('.list')).toHaveLength(1);
});

it('renders 10 items by default', () => {
  const app = shallow(<App />);
  expect(app.find('.list').children(ListItem)).toHaveLength(10);
});

it('add item functions correctly', () => {
  const app = shallow(<App />);
  app.instance().onAddItem();
  expect(app.find('.list').children(ListItem)).toHaveLength(11);
});

it('remove item functions correctly', () => {
  const wrapper = mount(<App />);
  let list = wrapper.state().list;
  
  // we will delete the first item
  let todelete = list[0];
  let count = list.filter((item) => item.id === todelete.id).length;
  
  // simulate a delete on the first item
  wrapper.instance().onMenuItemClick('Delete', 0);
  
  // make sure the array length is reduced and the item we expected to delete was deleted
  expect(list).toHaveLength(9);
  expect(list.filter((item) => item.id === todelete.id).length).toEqual(count -1);
});

it('remove all clears the list', () => {
  const app = shallow(<App />);
  app.instance().onRemoveAll();
  expect(app.find('.list').children(ListItem)).toHaveLength(0);
});