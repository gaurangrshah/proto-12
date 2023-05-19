import { client } from '../client';
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

async function persistUserPrefs(preferences: UserPref): Promise<void> {
  const preferencesString = JSON.stringify(preferences);
  localStorage.setItem('prefs', preferencesString);
}

export async function saveUserPreferences(
  preferences: UserPref
): Promise<void> {
  userPrefSchema.parse(preferences);
  const existingPreferences = await getUserPreferences();
  if (!existingPreferences) {
    const localPreferences = getLocalUserPrefs();
    if (localPreferences) {
      preferences = { ...preferences, ...localPreferences }; // Use spread operator to merge preferences
    }
  }

  return new Promise<void>((resolve, reject) => {
    client.update<UserPreferences>(
      {},
      { preferences },
      { upsert: true },
      async (err) => {
        if (err) {
          reject(err);
        } else {
          await persistUserPrefs(preferences); // Save preferences to localStorage
          resolve();
        }
      }
    );
  });
}

export async function getUserPreferences(): Promise<UserPref | null> {
  return new Promise<UserPref | null>((resolve, reject) => {
    client.findOne<UserPreferences>({}, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc ? doc.preferences : null);
      }
    });
  });
}
