import type { WidgetProps } from '@rjsf/utils'
import styles from './text-widget.module.scss'

export default function TextWidget({
  id,
  value,
  type = 'text',
  onChange,
  onBlur,
  disabled,
  readonly,
  placeholder,
}: WidgetProps) {
  return (
    <div className={styles.textInputWrapper}>
      <input
        id={id}
        name={id}
        type={type}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur && onBlur(id, e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        className={styles.textInput}
      />
      {/* {rawErrors && rawErrors.length > 0 && <p className={styles.textError}>{rawErrors[0]}</p>} */}
    </div>
  )
}
