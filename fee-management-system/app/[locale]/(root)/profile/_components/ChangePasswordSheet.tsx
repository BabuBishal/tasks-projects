'use client'

import React, { useCallback } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet/sheet'
import { PasswordChangeInput } from '@/lib/types'
import { useToast } from '@/shared/ui/toast'
import { useChangePasswordMutation } from '@/app/[locale]/(root)/profile/_hooks/mutation'
import Form from '@rjsf/core'
import changePasswordSchema from '../_schema/change-password.schema'
import { changePasswordUiSchema } from '../_schema/uiSchema'
import validator from '@/shared/forms/rjsf/validators/validator'
import PasswordWidget from '@/shared/forms/rjsf/widgets/password-widget/PasswordWidget'

interface ChangePasswordSheetProps {
  isOpen: boolean
  onClose: () => void
}

const ChangePasswordSheet = React.memo(({ isOpen, onClose }: ChangePasswordSheetProps) => {
  const { notify } = useToast()
  const changePasswordMutation = useChangePasswordMutation()

  const handleSubmit = useCallback(
    async (data: PasswordChangeInput) => {
      try {
        await changePasswordMutation.mutateAsync(data)
        notify({
          title: 'Success',
          description: 'Password changed successfully',
          type: 'success',
        })
        onClose()
      } catch (error) {
        notify({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to change password',
          type: 'error',
        })
      }
    },
    [changePasswordMutation, notify, onClose]
  )

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-xl">
        <div className="border-border border-b px-6 pt-6 pb-4">
          <SheetHeader>
            <SheetTitle className="text-2xl">Change Password</SheetTitle>
            <SheetDescription className="mt-2 text-base">
              Update your password to keep your account secure
            </SheetDescription>
          </SheetHeader>
        </div>

        <Form
          schema={changePasswordSchema}
          uiSchema={changePasswordUiSchema}
          showErrorList={false}
          validator={validator}
          customValidate={(formData, errors) => {
            if (formData.newPassword !== formData.confirmPassword) {
              errors.confirmPassword?.addError('Passwords do not match')
            }
            return errors
          }}
          widgets={{
            password: PasswordWidget,
          }}
          onSubmit={e => handleSubmit(e.formData)}
        />
      </SheetContent>
    </Sheet>
  )
})

ChangePasswordSheet.displayName = 'ChangePasswordSheet'

export default ChangePasswordSheet
