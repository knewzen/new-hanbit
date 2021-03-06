import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import root from 'window-or-global'
import { fromHeader, fromUser } from 'store/selectors'
import {
  startSearch,
  cancelSearch,
  openDrawer,
  closeDrawer,
} from 'store/actions'
import api from 'services/api'

import { Header } from 'components'

class HeaderContainer extends Component {
  static propTypes = {
    searching: PropTypes.bool,
    onStartSearch: PropTypes.func,
    onCancelSearch: PropTypes.func,
    drawerOpened: PropTypes.bool,
    onOpenDrawer: PropTypes.func,
    onCloseDrawer: PropTypes.func,
    isLoggedIn: PropTypes.bool,
  }
  state = {
    width: root.innerWidth,
  }
  componentDidMount() {
    root.addEventListener('resize', this.calculateWidth)
  }
  componentWillUnmount() {
    root.removeEventListener('resize', this.calculateWidth)
  }
  calculateWidth = () => {
    this.setState(prev => ({
      ...prev,
      width: window.innerWidth,
    }))
  }
  handleLogout = () => {
    api.get('/user/logout')
    window.location.reload()
  }

  render() {
    const { handleLogout } = this
    return (
      <Header {...this.props} {...this.state} logout={handleLogout} />
    )
  }
}

const mapStateToProps = state => ({
  searching: fromHeader.isSearching(state),
  drawerOpened: fromHeader.isDrawerOpened(state),
  isLoggedIn: fromUser.isLoggedIn(state),
})

const mapDispatchToProps = dispatch => ({
  onStartSearch: () => dispatch(startSearch()),
  onCancelSearch: () => dispatch(cancelSearch()),
  onOpenDrawer: () => dispatch(openDrawer()),
  onCloseDrawer: () => dispatch(closeDrawer()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
