export type PM_BuiltinType =
  | 'boolean'
  | 'short'
  | 'int'
  | 'string'
  | 'float'
  | 'double'
  | 'long'
  | 'local-date'
  | 'local-date-time'
  | 'zoned-date-time';

export type PM_UserType =
  | PM_ScalarType
  | PM_EnumType
  | PM_MixinEntityType
  | PM_EntityType;

export type PM_ScalarType = {
  '@type': 'ScalarType';
  name: string;
  doc: string;
};

export type PM_EnumType = {
  '@type': 'EnumType';
  name: string;
  entries: readonly PM_EnumEntry[];
  doc: string;
};

export type PM_EnumEntry = {
  '@type': 'EnumEntry';
  name: string;
  value?: number;
};

export type PM_MixinEntityType = {
  '@type': 'MixinEntityType';
};

export type PM_EntityType = {
  '@type': 'EntityType';
};
