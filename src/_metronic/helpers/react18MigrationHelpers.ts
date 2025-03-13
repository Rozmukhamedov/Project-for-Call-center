import {ReactNode} from 'react'
import {
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  ToggleComponent
} from '../assets/ts/components'

type WithChildren = {
  children?: ReactNode
}

const reInitMenu = () => {
  setTimeout(() => {
    ToggleComponent.reinitialization();
    ScrollTopComponent.reinitialization();
    MenuComponent.reinitialization();
    ScrollComponent.reinitialization();
  }, 500);
}

export {type WithChildren, reInitMenu}
