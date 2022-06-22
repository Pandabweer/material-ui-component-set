import { component, OptionProducer } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { options as defaults } from './options';

export interface Configuration {
  options?: Record<string, OptionProducer>;
  adornmentIcon?: string;
  label?: string;
  inputLabel?: string;
  type?: HTMLInputElement['type'];
}

const $afterDelete = [deleteActionVariable];

export const AutocompleteInput = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  if (config.adornmentIcon) {
    options.adornmentIcon = updateOption(options.adornmentIcon, {
      value: config.adornmentIcon,
    });
  }

  return component('AutocompleteInput', { options, $afterDelete }, children);
};