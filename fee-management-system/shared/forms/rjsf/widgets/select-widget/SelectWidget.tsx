import type { WidgetProps } from '@rjsf/utils'
import styles from './select-widget.module.scss'

export default function SelectWidget({
  id,
  value,
  onChange,
  onBlur,
  options,
  schema,
  disabled,
}: WidgetProps) {
  
  const selectOptions = options?.enumOptions || []

  const anyOfOptions =
    schema?.anyOf
      ?.filter(
        (item): item is { const: string; title?: string } =>
          typeof item === 'object' && item !== null && 'const' in item
      )
      .map(item => ({
        value: item.const,
        label: item.title || item.const,
      })) || []

  const finalOptions = selectOptions.length > 0 ? selectOptions : anyOfOptions
  return (
    <div className={styles.selectInputWrapper}>
      <select
        id={id}
        name={id}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur && onBlur(id, e.target.value)}
        disabled={disabled}
        className={styles.selectInput}
      >
        <option className={styles.selectOption} value="" defaultValue="Select">
          Select
        </option>

        {finalOptions?.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value} className={styles.selectOption}>
            {option.label}
          </option>
        ))}
      </select>

      {/* {rawErrors && rawErrors.length > 0 && <p className={styles.textError}>{rawErrors[0]}</p>} */}
    </div>
  )
}
