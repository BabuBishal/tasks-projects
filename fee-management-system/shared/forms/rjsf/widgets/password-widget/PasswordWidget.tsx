import type { WidgetProps } from '@rjsf/utils'
import styles from './password-widget.module.scss'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'

export default function PasswordWidget({
  id,
  value,

  onChange,
  onBlur,
  // rawErrors,
  disabled,
  placeholder,
}: WidgetProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className={styles.passwordInputWrapper}>
      <div className={styles.passwordInputContainer}>
        <input
          id={id}
          name={id}
          type={showPassword ? 'text' : 'password'}
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          onBlur={e => onBlur && onBlur(id, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.passwordInput}
        />
        <span
          id="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.eyeIcon}
        >
          {showPassword ? (
            <EyeIcon className={styles.eyeIconOpen} />
          ) : (
            <EyeClosedIcon className={styles.eyeIconClosed} />
          )}
        </span>
      </div>
      {/* {rawErrors && rawErrors.length > 0 && <p className={styles.textError}>{rawErrors[0]}</p>} */}
    </div>
  )
}
