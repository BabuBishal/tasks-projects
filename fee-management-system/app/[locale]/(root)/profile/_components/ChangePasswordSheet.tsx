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
        {/* 
        <form onSubmit={handleSubmit} className="flex h-[calc(100%-120px)] flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <div>
                <label className="text-secondary mb-2.5 block text-sm font-semibold">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={e =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-secondary mb-2.5 block text-sm font-semibold">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={e =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                  required
                  minLength={6}
                />
                <p className="text-muted mt-2.5 text-xs">Must be at least 6 characters</p>
              </div>

              <div>
                <label className="text-secondary mb-2.5 block text-sm font-semibold">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={e =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-border border-t px-6 py-5">
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={changePasswordMutation.isPending}
                className="flex-1"
              >
                {changePasswordMutation.isPending ? 'Changing...' : 'Change Password'}
              </Button>
            </div>
          </div>
        </form> */}

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
