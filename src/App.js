import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './style.css';

const options = [
  'Delete',
  'View Details',
];

const ITEM_HEIGHT = 48;

class ActionList extends React.Component {
  constructor(props) {
    super(props);
    let list = [];
    /*
    Here we manually create the elements in the list using createItem(). Using onAddItem() would lead to an error ("cannot call setState on an unmounted component"). In the constructor, the component has not yet finished mounting, so we are unable to modify the state via setState (it hasn't been initialized yet). The details of the setState call also include a re-render of the component, which cannot happen if the component has not finished initializing. So we have to directly instantiate the value of the list in the constructor. 
    */
    for (var i = 0; i < 10; i++) {
      list.push(this.createRandomItem(i));
    }
    this.state = {
      list: list,
      menuposition: null,
      selectedIndex: null,
      activeMenu: null
    }
  }

  onAddItem() {
    let templist = this.state.list;
    templist.push(this.createRandomItem());
    this.setState({ list: templist });
  }
  createItem(index) {
    return { id: index, name: `Item ${index}`, details: `Item ${index} occured` };
  }
  createRandomItem() {
    const int = parseInt((Math.random() * 100) + '', 10);
    return this.createItem(int);
  }

  onMenuClick(event, i) {
    this.setState({ menuposition: event.currentTarget, activeMenu: i });
  };
  onMenuItemClick(option, i) {
    if (option === 'Delete') {
      let templist = this.state.list;
      templist.splice(i, 1);
      this.setState({ list: templist });
    }
    this.onMenuClose()
  }
  onMenuClose() {
    this.setState({ menuposition: null, activeMenu: null });
  }

  onRemoveAll() {
    this.setState({ list: [] });
  }
  onSelected(item) {
    this.setState({ selectedIndex: item });
  }
  isSelected(item) {
    return this.state.selectedIndex === item;
  }

  getEmptyComponent() {
    return (
      <div style={{ paddingLeft: "10px" }}>
        <Typography variant="h4">No Items Found</Typography>
        <Button data-cy="add-item" variant="contained" onClick={() => this.onAddItem()}>Add an Item</Button>
      </div>
    );
  }

  render() {
    const { menuposition } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Toolbar data-cy="pxb-toolbar">
            <Typography variant="h6" color="inherit">
              Action List
          </Typography>
            <div style={{ flex: '1 1 0px' }} />
            <IconButton data-cy="toolbar-delete"
              color="inherit"
              aria-label="Delete"
              onClick={() => { this.onRemoveAll() }} >
              <DeleteIcon />
            </IconButton>
            <IconButton data-cy="toolbar-add"
              color="inherit"
              aria-label="add" onClick={() => { this.onAddItem() }}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {this.state.list.length < 1 &&
          this.getEmptyComponent()
        }
        <List className="list" data-cy="list-content" style={{ paddingTop: '0px' }} component="nav">
          {
            this.state.list.map((item, i) => {
              return (
                <ListItem key={'item_' + i} button className={this.isSelected(i) ? 'selected' : null} onClick={() => this.onSelected(i)}>
                  <ListItemText primary={item.name} secondary={item.details}></ListItemText>
                  <IconButton data-cy="action-menu"
                    aria-label='More'
                    aria-owns={menuposition ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={(evt) => this.onMenuClick(evt, i)}>
                    <MoreVertIcon />
                  </IconButton>
                </ListItem>
              )
            })
          }
        </List>
        <Menu
          id="long-menu"
          anchorEl={menuposition}
          open={Boolean(menuposition)}
          onClose={this.onMenuClose.bind(this)}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}>
          {options.map((option) => (
            <MenuItem key={option} onClick={() => this.onMenuItemClick(option, this.state.activeMenu)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ActionList;
