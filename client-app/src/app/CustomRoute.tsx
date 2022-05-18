import { useLayoutEffect, useState } from 'react'
import { Router } from 'react-router-dom'

export const CustomRouter = (props: any) => {
  const [state, setState] = useState({
    action: props.history.action,
    location: props.history.location,
  })

  useLayoutEffect(() => props.history.listen(setState), [props.history])

  return <Router {...props} location={state.location} navigationType={state.action} navigator={props.history} />
}
