import { localPersist } from '@/utils';

import { db } from '../client';
import { userPrefSchema } from '../queries';
import type { UserPref } from '../queries';

interface UserPreferences {
  preferences: UserPref; // Adjust the type of preferences according to your specific needs
}

export function getLocalUserPrefs(): UserPref | null {
  const preferencesString = localStorage.getItem('prefs');
  if (preferencesString) {
    return JSON.parse(preferencesString);
  }
  return null;
}

export async function saveUserPreferences(
  preferences: UserPref
): Promise<void> {
  userPrefSchema.parse(preferences);
  const existingPreferences = await getUserPreferences();
  preferences = { ...existingPreferences, ...preferences };

  return new Promise<void>((resolve, reject) => {
    db.prefs?.update<UserPreferences>(
      {},
      { preferences },
      { upsert: true },
      async (err) => {
        if (err) {
          reject(err);
        } else {
          await localPersist({ key: 'prefs', value: preferences }); // localStorage persistence
          resolve();
        }
      }
    );
  });
}

export async function getUserPreferences(): Promise<UserPref | null> {
  if (localStorage.getItem('prefs')) {
    return JSON.parse(localStorage.getItem('prefs') || '{}');
  }
  return new Promise<UserPref | null>((resolve, reject) => {
    db.prefs?.findOne<UserPreferences>({}, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc ? doc.preferences : null);
      }
    });
  });
}
