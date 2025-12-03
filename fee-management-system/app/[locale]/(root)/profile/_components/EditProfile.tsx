'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet/sheet'
import Form from '@rjsf/core'
import profileSchema from '../_schema/profile.schema'
import { profileUiSchema } from '../_schema/uiSchema'
import validator from '@/shared/forms/rjsf/validators/validator'
import TextWidget from '@/shared/forms/rjsf/widgets/text-widget/TextWidget'
import '@/shared/forms/rjsf/styles/rjsf.scss'
import { ProfileUpdateInput, UserWithProfile } from '@/lib/types'
import { Button } from '@/shared/ui/button/Button'
import { useUpdateProfileMutation } from '../_hooks'
import { useToast } from '@/shared/ui/toast'

const EditProfile = ({
  editProfileOpen,
  setEditProfileOpen,
  profile,
}: {
  editProfileOpen: boolean
  setEditProfileOpen: (open: boolean) => void
  profile: UserWithProfile
}) => {
  const updateProfileMutation = useUpdateProfileMutation()
  const { notify } = useToast()
  
  const handleSubmit = (data: ProfileUpdateInput) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        setEditProfileOpen(false)
        notify({
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully',
          type: 'success',
        })
      },
      onError: () => {
        notify({
          title: 'Profile Update Failed',
          description: 'Failed to update your profile',
          type: 'error',
        })
      },
    })
  }

  const profileData = {
    name: profile.name,
    email: profile.email,
    phone: profile?.profile?.phone,
    position: profile?.profile?.position,
  }
  return (
    <Sheet open={editProfileOpen} onOpenChange={setEditProfileOpen}>
      <SheetContent side="right" className="w-full overflow-y-auto p-5 sm:max-w-xl">
        <div className="border-border border-b pt-6 pb-4">
          <SheetHeader>
            <SheetTitle className="text-2xl">Edit Profile</SheetTitle>
            <SheetDescription className="mt-2 text-base">
              Update your profile information here
            </SheetDescription>
          </SheetHeader>
        </div>

        <Form
          schema={profileSchema}
          uiSchema={profileUiSchema}
          formData={profileData}
          showErrorList={false}
          widgets={{
            text: TextWidget,
            email: TextWidget,
            tel: TextWidget,
          }}
          validator={validator}
          onSubmit={e => handleSubmit(e.formData)}
          transformErrors={errors => {
            return errors.map(error => {
              if (error.name === 'format' && error.params.format === 'email') {
                return {
                  ...error,
                  message: 'Please enter a valid email address',
                }
              }
              if (error.name === 'pattern') {
                return {
                  ...error,
                  message: 'Please enter a valid phone number',
                }
              }
              if (error.name === 'minLength') {
                return {
                  ...error,
                  message: `Must be at least ${error.params.limit} characters long`,
                }
              }
              return error
            })
          }}
        >
          <div className="py-5">
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditProfileOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={updateProfileMutation.isPending}
                className="flex-1"
              >
                {updateProfileMutation.isPending ? 'Updating...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EditProfile
