import humps from 'lodash-humps-ts';

export const camelcaseObject = (object: Record<string, any>) => humps(object);
