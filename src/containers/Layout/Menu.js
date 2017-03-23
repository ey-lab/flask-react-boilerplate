import React, { PropTypes } from 'react';
import {
  Link,
} from 'react-router';

import MenuItem from 'material-ui/MenuItem';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  }
}

const Menu = ({items}) => (
  <div style={styles.main}>
  {
    items.map(item => (
      <MenuItem 
        key={item.name}
        primaryText={item.name}
        leftIcon={<item.icon />}
        containerElement={<Link to={item.path} />}
      />
    )
  )}
  </div>
)

Menu.propTypes = {
  items: PropTypes.array.isRequired,
}

export default Menu;
