import React, { Component, ReactNode } from 'react'
import Toast, { ToastType } from '../components/toast'
import { PortalContext, GateName } from './portalContext'
import { ShowToastFunction } from '.'

interface IProviderProps {
  children: ReactNode
}

interface IProviderState {
  gates: { [key: string]: ReactNode }
}

export class PortalProvider extends Component<IProviderProps, IProviderState> {
  public state = {
    gates: {},
  }

  public render() {
    return (
      <PortalContext.Provider
        value={{
          gates: this.state.gates,
          teleport: this.teleport,
          showToast: this.showToast,
        }}>
        {this.props.children}
      </PortalContext.Provider>
    )
  }

  private teleport = (gateName: GateName, element: ReactNode) => {
    this.setState(prevState => ({
      gates: { ...prevState.gates, [gateName]: element },
    }))
  }

  private showToast: ShowToastFunction = (
    message = 'Oh là là! There is an error!',
    type = ToastType.Error,
  ) => {
    this.teleport('toaster', <Toast type={type}>{message}</Toast>)
  }
}
