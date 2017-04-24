import React, { 
  PropTypes 
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  Link,
} from 'react-router';

import MenuItem from 'material-ui/MenuItem';

const styles = {
  menu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  }
}

const Menu = ({items, open}) => (
  <div style={styles.menu}>
    {
      items.map(item => (
        <MenuItem 
          key={item.name}
          primaryText={open ? item.name : null}
          leftIcon={open ? <item.icon /> : null}
          rightIcon={!open ? <item.icon /> : null}
          containerElement={<Link to={item.path} />}
        />
      )
    )}
  </div>
)

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  open: state.ui.sidebarOpen
});

export default connect(
  mapStateToProps
)(Menu);
