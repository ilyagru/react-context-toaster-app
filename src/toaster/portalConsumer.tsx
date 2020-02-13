import React, { ReactNode } from 'react'
import { PortalContext, GateName } from './portalContext'

interface IPortalConsumerProps {
  gateName: GateName
  children?: (teleport: (gateName: GateName, element: ReactNode) => void) => ReactNode
}

export const PortalConsumer = ({ gateName, children }: IPortalConsumerProps) => (
  <PortalContext.Consumer>
    {value => (
      <>
        {value.gates[gateName]}
        {children && children(value.teleport)}
      </>
    )}
  </PortalContext.Consumer>
)
