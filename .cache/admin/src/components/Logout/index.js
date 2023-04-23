/**
 *
 * Logout
 *
 */

/* eslint-disable */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { auth } from 'strapi-helper-plugin';

import styles from './styles.scss';

class Logout extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = { isOpen: false };

  handleGoTo = () => {
    const id = get(auth.getUserInfo(), 'id') || get(auth.getUserInfo(), '_id');
    this.props.history.push({
      pathname: `/plugins/content-manager/administrator/${id}`,
      search:
        '?redirectUrl=/plugins/content-manager/administrator/?page=0&limit=0&sort=id&source=admin',
    });
  };

  handleGoToAdministrator = () => {
    this.props.history.push({
      pathname: '/plugins/content-manager/administrator',
      search: '?source=admin',
    });
  };

  handleLogout = () => {
    auth.clearAppStorage();
    this.props.history.push('/plugins/users-permissions/auth/login');
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div className={styles.logout}>
        <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle>
            {get(auth.getUserInfo(), 'username')}
            <i className="fa fa-caret-down" alt={`${this.state.isOpen}`} />
          </DropdownToggle>
          <DropdownMenu className={styles.dropDownContent}>
            <DropdownItem onClick={this.handleGoTo} className={styles.item}>
              <FormattedMessage id="app.components.Logout.profile" />
            </DropdownItem>
            <DropdownItem
              onClick={this.handleGoToAdministrator}
              className={styles.item}
            >
              <FormattedMessage id="app.components.Logout.admin" />
            </DropdownItem>
            <DropdownItem onClick={this.handleLogout}>
              <FormattedMessage id="app.components.Logout.logout" />
              <i className="fa fa-sign-out" />
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

export default withRouter(Logout);
