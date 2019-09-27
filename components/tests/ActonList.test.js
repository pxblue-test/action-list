import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Modal from 'react-native-modal';

import Adapter from 'enzyme-adapter-react-16';

import ActionList from '../ActionList';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';
import ActionListItem from '../ActionListItem';
Enzyme.configure({ adapter: new Adapter() })

describe('ActionList Tests ', function () {

    it('Default renders 10 items', () => {
        const app = shallow(<ActionList />);
        expect(app.state().data.length).toBe(10);
    });

    it('Add an Item', () => {
        const app = shallow(<ActionList />);
        app.instance().addItem();
        expect(app.state().data.length).toBe(11);
        app.instance().addItem();
        app.instance().addItem();
        app.instance().addItem();
        expect(app.state().data.length).toBe(14);
    });

    it('Delete an Item', () => {
        const app = shallow(<ActionList />);
        app.instance().setState({ selectedItemIndex: 2 });
        app.instance().onDelete();
        expect(app.state().data.length).toBe(9);
        app.instance().setState({ selectedItemIndex: 7 });
        app.instance().onDelete();
        app.instance().setState({ selectedItemIndex: 4 });
        app.instance().onDelete();
        expect(app.state().data.length).toBe(7);
    });

    it('Delete all Items', () => {
        const app = shallow(<ActionList />);
        app.instance().deleteAll();
        expect(app.state().data.length).toBe(0);
    });

    it('Modal hidden by default', () => {
        const app = shallow(<ActionList />);
        expect(app.find(Modal).props().isVisible).toBe(false);
    })


    it('Show modal when clicking the menu', () => {
        const app = shallow(<ActionList />);
        app.instance().showModal(2);
        expect(app.find(Modal).props().isVisible).toBe(true);
    })

});
