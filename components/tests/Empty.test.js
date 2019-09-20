import React from 'react';
import renderer from 'react-test-renderer';
import { Button, Icon } from 'react-native-elements';

import Empty from '../Empty';

describe('Empty Tests ', function () {
    it('Icon Renders', () => {
        const tree = renderer.create(
            <Empty icon={<Icon name="add-circle-outline" />} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Only Title Renders', () => {
        const tree = renderer.create(
            <Empty title={'EMPTY'} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Only Description Renders', () => {
        const tree = renderer.create(
            <Empty description={'Description'} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Only Actions Renders', () => {
        const tree = renderer.create(
            <Empty actions={
                <Button
                    icon={<Icon name="add-circle-outline" />}
                    title=" Add Device"
                />
            } />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Title, actions, Description Renders', () => {
        const tree = renderer.create(
            <Empty title={'EMPTY'} description={'Description'} actions={
                <Button
                    icon={<Icon name="add-circle-outline" />}
                    title=" Add Device"
                />
            } />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
