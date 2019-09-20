import React from 'react';
import renderer from 'react-test-renderer';


import ActionListItem from '../ActionListItem';

describe('ActionListItem Tests ', function () {
    it('ActionListItem-1 Renders', () => {
        const item = {
            name: "Action 1",
            details: "Action 1 details",
        }
        const tree = renderer.create(
            <ActionListItem item={item} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('ActionListItem-2 Renders', () => {
        const item = {
            name: "Item 34",
            details: "Details for item 34",
        }
        const tree = renderer.create(
            <ActionListItem item={item} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
