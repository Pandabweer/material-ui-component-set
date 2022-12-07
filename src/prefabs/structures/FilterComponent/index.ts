import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import {
  filterComponentOptions as defaultOptions,
  // categories as defaultCategories,
} from './options';

export const FilterComponent = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaultOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  // const optionCategories = config.optionCategories
  //   ? { ...config.optionCategories }
  //   : defaultCategories;

  return component(
    'FilterComponent',
    { options, ref, style, label },
    descendants,
  );
};
