import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;

export const getFilter = state => state.filter;

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

export const getFilterContacts = createSelector(
  [getContacts, getFilter, getIsLoading, getError],
  (contacts, filter, isLoading, error) => {
    if (isLoading || error) {
      return [];
    }

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().trim().includes(normalizedFilter));
  }
);
