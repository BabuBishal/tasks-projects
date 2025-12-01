import { useQuery } from '@tanstack/react-query'
import { UserWithProfile } from '@/lib/types'
import { API_ROUTES } from '@/lib/api/api-routes'
import { getProfile } from '@/app/[locale]/(root)/profile/_api/profile'

export const useProfileQuery = () => {
  return useQuery<UserWithProfile>({
    queryKey: [API_ROUTES.profile],
    queryFn: getProfile,
  })
}
