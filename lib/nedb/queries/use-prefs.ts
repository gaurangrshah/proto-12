import { queryClient } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getUserPreferences, saveUserPreferences } from '../handlers';
import type { UserPref } from './models';

export function usePrefs() {
  const { data, isLoading, error } = useQuery(['prefs'], getUserPreferences);

  const mutation = useMutation(saveUserPreferences, {
    onSuccess: () => {
      // Invalidate the userPreferences query to refetch the latest data
      queryClient.invalidateQueries(['prefs']);
    },
  });

  const setUserPreferences = (preferences: Partial<UserPref>) => {
    mutation.mutate(preferences);
  };

  return {
    data,
    isLoading,
    error,
    setUserPreferences,
  };
}
