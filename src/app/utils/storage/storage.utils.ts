import { StorageObjectData, StorageObjectType } from './storage.types';

type StorageOptions = {
  api?: 'LocalStorage' | 'SessionStorage';
};

const getItem = <T extends StorageObjectType>(item: T): StorageObjectData<T>['data'] | null => {
  const data = localStorage.getItem(item.toString());
  return data ? (JSON.parse(data) as StorageObjectData<T>['data']) : null;
};

const setItem = <T extends StorageObjectType>(
  itemName: T,
  data: StorageObjectData<T>['data'],
): void => {
  if (data === null || data === undefined) {
    return;
  }

  localStorage.setItem(itemName, JSON.stringify(data));
};

const removeItem = <T extends StorageObjectType>(item: T): void => {
  localStorage.removeItem(item);
};

const clear = (options?: StorageOptions): void => {
  localStorage.clear();
};

export const storage = {
  getItem,
  setItem,
  removeItem,
  clear,
};
