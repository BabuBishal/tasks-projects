import { ArrayFieldTemplateProps } from '@rjsf/utils'
import React from 'react'

const FeeFormTemplate = (props: ArrayFieldTemplateProps) => {
  return (
    <div>
      {props.items}
      {props.canAdd && <button type="button" onClick={props.onAddClick}></button>}
    </div>
  )
}

export default FeeFormTemplate
