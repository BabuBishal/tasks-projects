import { ValidationErrors, ValidationSchema } from '@/lib/types'

export const validateForm = <
  T extends Record<string, string | number | boolean | null | undefined>,
>(
  values: T,
  schema: ValidationSchema<T>
): ValidationErrors<T> => {
  const errors: ValidationErrors<T> = {}

  for (const field in schema) {
    const rules = schema[field as keyof T]
    const value = values[field as keyof T]

    if (!rules) continue

    if (rules.required && !value) {
      errors[field as keyof T] = `${field[0].toUpperCase() + field.slice(1)} is required`
      continue
    }

    // Only check length for string values
    if (typeof value === 'string') {
      if (
        (rules.minLength && value.length < rules.minLength) ||
        (rules.maxLength && value.length > rules.maxLength)
      ) {
        errors[field as keyof T] = rules.message
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors[field as keyof T] = rules.message
      }
    }
  }

  return errors
}
