import React, { createContext, ReactNode } from 'react'
import { ToastType } from '../components/toast'

export type ShowToastFunction = (message?: string, type?: ToastType) => void
export type PortalContextProps = React.ContextType<typeof PortalContext>
export type GateName = 'toaster'

interface IContextProps {
  gates: { [key: string]: ReactNode }
  teleport: (gateName: GateName, element: ReactNode) => void
  showToast: ShowToastFunction
}

export const PortalContext = createContext<IContextProps>({
  gates: {},
  teleport: () => {},
  showToast: () => {},
})
