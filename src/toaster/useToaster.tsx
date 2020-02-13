import { useContext, useCallback } from 'react'
import { PortalContext } from './'

const useToaster = () => {
  const { showToast } = useContext(PortalContext)
  return useCallback(showToast, [])
}

export default useToaster
