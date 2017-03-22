import React, { PropTypes } from 'react';

import MenuItem from 'material-ui/MenuItem';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  }
}

const Menu = ({screens}) => (
  <div style={styles.main}>
  {
    screens.map(screen => (
      <MenuItem 
        key={screen.name}
        primaryText={screen.name}
        leftIcon={<screen.icon />}
      />
    )
  )}
  </div>
)

Menu.propTypes = {
  screens: PropTypes.array.isRequired,
}

export default Menu;
