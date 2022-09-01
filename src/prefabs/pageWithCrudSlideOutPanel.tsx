import * as React from 'react';

import {
  prefab,
  Icon,
  toggle,
  sizes,
  showIf,
  variable,
  option,
  icon,
  ThemeColor,
  color,
  size,
  buttongroup,
  font,
  hideIf,
  text,
  PrefabReference,
  component,
  PrefabInteraction,
  PrefabComponentOption,
} from '@betty-blocks/component-sdk';

import { Property } from '@betty-blocks/component-sdk/build/prefabs/types/property';
import {
  AppBar,
  Box,
  boxOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  Conditional,
  conditionalOptions,
  DataContainer,
  DataTable,
  dataTableOptions,
  Dialog,
  dialogOptions,
  Drawer,
  DrawerBar,
  drawerBarOptions,
  DrawerContainer,
  drawerContainerOptions,
  drawerOptions,
  FormErrorAlert,
  Grid,
  gridOptions,
  OpenPageButton,
  openPageButtonOptions,
  Paper,
  Row,
  rowOptions,
  SubmitButton,
  submitButtonOptions,
  Tab,
  tabOptions,
  Tabs,
  tabsOptions,
  Text,
  textOptions,
} from './structures';
import { options as defaults } from './structures/ActionJSForm/options';

interface ActionResultsProps {
  variables: Record<string, any>;
  action: any;
  IdProperties: any;
  recordInputVariable: any;
}

const interactions = [
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#deleteButton',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#closeBtn',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#cancelButton',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#deleteForm',
    },
    type: 'Custom',
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataTable',
      sourceComponentId: '#deleteForm',
    },
    type: 'Custom',
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataTable',
      sourceComponentId: '#createForm',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#createForm',
    },
    type: 'Custom',
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataTable',
      sourceComponentId: '#editForm',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#editForm',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#editErrorAlert',
      sourceComponentId: '#editForm',
    },
    type: 'Custom',
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#detailButton',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#editCancelButton',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#createCancelButton',
    },
    type: 'Custom',
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#detailTab',
      sourceComponentId: '#detailButton',
    },
    type: 'Custom',
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#createButton',
    },
    type: 'Custom',
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#editButton',
    },
    type: 'Custom',
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createTab',
      sourceComponentId: '#createButton',
    },
    type: 'Custom',
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#editTab',
      sourceComponentId: '#editButton',
    },
    type: 'Custom',
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#editTab',
      sourceComponentId: '#editButtonFromDetails',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#detailCancelButton',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#closeEditTabBtn',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#closeCreateTabBtn',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#closeDetailsTabBtn',
    },
    type: 'Custom',
  },
  {
    name: 'Submit',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createForm',
      sourceComponentId: '#createSubmitButton',
    },
    type: 'Custom',
  },
  {
    name: 'Submit',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#editForm',
      sourceComponentId: '#editSubmitButton',
    },
    type: 'Custom',
  },
] as PrefabInteraction[];

const attributes = {
  icon: Icon.DataTable,
  category: 'DATA',
  type: 'page',
  description: 'This page contains a datatable with CRUD slide-out panel.',
  detail:
    'In this ready to use Data Table, it is possible to create, display (read), update and delete records. These functionalities are shown in a slide-out panel.',
  previewUrl: 'https://preview.betty.app/crud-with-slide-out-panel',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Crud_With_Slide_Out_Panel.jpg',
  interactions,
};

const drawerContainer = DrawerContainer(
  {
    label: 'CRUD - Content',
    options: {
      ...drawerContainerOptions,
      innerSpacing: sizes('Inner space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
      }),
    },
  },
  [
    Row(
      {
        options: {
          ...rowOptions,
          maxRowWidth: option('CUSTOM', {
            label: 'Width',
            value: 'Full',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'S', value: 'S' },
                { name: 'M', value: 'M' },
                { name: 'L', value: 'L' },
                { name: 'XL', value: 'XL' },
                { name: 'Full', value: 'Full' },
              ],
            },
          }),
          rowHeight: text('Height', {
            value: '100vh',
            configuration: {
              as: 'UNIT',
            },
          }),
        },
      },
      [
        Column(
          {
            options: {
              ...columnOptions,
              columnHeight: text('Height', {
                value: '100%',
                configuration: {
                  as: 'UNIT',
                },
              }),
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
          },
          [
            Grid(
              {
                options: {
                  ...gridOptions,
                  height: size('Height', {
                    value: '100%',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                },
              },
              [
                Grid(
                  {
                    options: {
                      ...gridOptions,
                      direction: option('CUSTOM', {
                        value: 'column',
                        label: 'Direction',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Horizontal', value: 'row' },
                            { name: 'Vertical', value: 'column' },
                          ],
                          condition: showIf('type', 'EQ', 'container'),
                        },
                      }),
                    },
                  },
                  [
                    Box(
                      {
                        ref: { id: '#topMenu' },
                        options: {
                          ...boxOptions,
                          width: size('Width', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                          backgroundColor: color('Background color', {
                            value: ThemeColor.PRIMARY,
                          }),
                        },
                      },
                      [
                        AppBar({}, [
                          OpenPageButton(
                            {
                              style: {
                                overwrite: {
                                  backgroundColor: {
                                    type: 'STATIC',
                                    value: 'transparent',
                                  },
                                  boxShadow: 'none',
                                  color: {
                                    type: 'THEME_COLOR',
                                    value: 'white',
                                  },
                                  fontFamily: 'Roboto',
                                  fontSize: '0.875rem',
                                  fontStyle: 'none',
                                  fontWeight: '400',
                                  padding: ['0rem', '0rem'],
                                  textDecoration: 'none',
                                  textTransform: 'none',
                                },
                              },
                              options: {
                                ...openPageButtonOptions,
                                buttonText: variable('Button text', {
                                  value: ['Menu 1'],
                                }),
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', 'M', '0rem', 'M'],
                                }),
                              },
                            },
                            [],
                          ),
                          OpenPageButton(
                            {
                              style: {
                                overwrite: {
                                  backgroundColor: {
                                    type: 'STATIC',
                                    value: 'transparent',
                                  },
                                  boxShadow: 'none',
                                  color: {
                                    type: 'THEME_COLOR',
                                    value: 'white',
                                  },
                                  fontFamily: 'Roboto',
                                  fontSize: '0.875rem',
                                  fontStyle: 'none',
                                  fontWeight: '400',
                                  padding: ['0rem', '0rem'],
                                  textDecoration: 'none',
                                  textTransform: 'none',
                                },
                              },
                              options: {
                                ...openPageButtonOptions,
                                buttonText: variable('Button text', {
                                  value: ['Menu 2'],
                                }),
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', 'M', '0rem', '0rem'],
                                }),
                              },
                            },
                            [],
                          ),
                        ]),
                      ],
                    ),
                    Box(
                      {
                        options: {
                          ...boxOptions,
                          stretch: toggle('Stretch (when in flex container)', {
                            value: true,
                          }),
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                          backgroundColor: color('Background color', {
                            value: ThemeColor.LIGHT,
                          }),
                          backgroundColorAlpha: option('NUMBER', {
                            label: 'Background color opacity',
                            value: 20,
                          }),
                        },
                      },
                      [
                        Row(
                          {
                            options: {
                              ...rowOptions,
                              maxRowWidth: option('CUSTOM', {
                                label: 'Width',
                                value: 'XL',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'S', value: 'S' },
                                    { name: 'M', value: 'M' },
                                    { name: 'L', value: 'L' },
                                    { name: 'XL', value: 'XL' },
                                    { name: 'Full', value: 'Full' },
                                  ],
                                },
                              }),
                              rowHeight: text('Height', {
                                value: '100%',
                                configuration: {
                                  as: 'UNIT',
                                },
                              }),
                            },
                          },
                          [
                            Column(
                              {
                                options: {
                                  ...columnOptions,
                                  columnWidth: option('CUSTOM', {
                                    label: 'Column width',
                                    value: '12',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'flexible',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        { name: '1', value: '1' },
                                        { name: '2', value: '2' },
                                        { name: '3', value: '3' },
                                        { name: '4', value: '4' },
                                        { name: '5', value: '5' },
                                        { name: '6', value: '6' },
                                        { name: '7', value: '7' },
                                        { name: '8', value: '8' },
                                        { name: '9', value: '9' },
                                        { name: '10', value: '10' },
                                        { name: '11', value: '11' },
                                        { name: '12', value: '12' },
                                      ],
                                    },
                                  }),
                                  columnWidthTabletLandscape: option('CUSTOM', {
                                    label: 'Column width (tablet landscape)',
                                    value: '12',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'flexible',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        { name: '1', value: '1' },
                                        { name: '2', value: '2' },
                                        { name: '3', value: '3' },
                                        { name: '4', value: '4' },
                                        { name: '5', value: '5' },
                                        { name: '6', value: '6' },
                                        { name: '7', value: '7' },
                                        { name: '8', value: '8' },
                                        { name: '9', value: '9' },
                                        { name: '10', value: '10' },
                                        { name: '11', value: '11' },
                                        { name: '12', value: '12' },
                                      ],
                                    },
                                  }),
                                  columnWidthTabletPortrait: option('CUSTOM', {
                                    value: '12',
                                    label: 'Column width (tablet portrait)',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'flexible',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        { name: '1', value: '1' },
                                        { name: '2', value: '2' },
                                        { name: '3', value: '3' },
                                        { name: '4', value: '4' },
                                        { name: '5', value: '5' },
                                        { name: '6', value: '6' },
                                        { name: '7', value: '7' },
                                        { name: '8', value: '8' },
                                        { name: '9', value: '9' },
                                        { name: '10', value: '10' },
                                        { name: '11', value: '11' },
                                        { name: '12', value: '12' },
                                      ],
                                    },
                                  }),
                                  columnWidthMobile: option('CUSTOM', {
                                    value: '12',
                                    label: 'Column width (mobile)',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'flexible',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        { name: '1', value: '1' },
                                        { name: '2', value: '2' },
                                        { name: '3', value: '3' },
                                        { name: '4', value: '4' },
                                        { name: '5', value: '5' },
                                        { name: '6', value: '6' },
                                        { name: '7', value: '7' },
                                        { name: '8', value: '8' },
                                        { name: '9', value: '9' },
                                        { name: '10', value: '10' },
                                        { name: '11', value: '11' },
                                        { name: '12', value: '12' },
                                      ],
                                    },
                                  }),
                                  columnHeight: text('Height', {
                                    value: '100%',
                                    configuration: {
                                      as: 'UNIT',
                                    },
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  innerSpacing: sizes('Inner space', {
                                    value: ['L', 'L', 'L', 'L'],
                                  }),
                                },
                              },
                              [
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  },
                                  [
                                    Row(
                                      {
                                        options: {
                                          ...rowOptions,
                                          maxRowWidth: option('CUSTOM', {
                                            label: 'Width',
                                            value: 'Full',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'S',
                                                  value: 'S',
                                                },
                                                {
                                                  name: 'M',
                                                  value: 'M',
                                                },
                                                {
                                                  name: 'L',
                                                  value: 'L',
                                                },
                                                {
                                                  name: 'XL',
                                                  value: 'XL',
                                                },
                                                {
                                                  name: 'Full',
                                                  value: 'Full',
                                                },
                                              ],
                                            },
                                          }),
                                        },
                                      },
                                      [
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            Box(
                                              {
                                                options: {
                                                  ...boxOptions,
                                                  alignment: buttongroup(
                                                    'Alignment',
                                                    [
                                                      ['None', 'none'],
                                                      ['Left', 'flex-start'],
                                                      ['Center', 'center'],
                                                      ['Right', 'flex-end'],
                                                      [
                                                        'Justified',
                                                        'space-between',
                                                      ],
                                                    ],
                                                    {
                                                      value: 'space-between',
                                                      configuration: {
                                                        dataType: 'string',
                                                      },
                                                    },
                                                  ),
                                                  innerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        'M',
                                                        '0rem',
                                                        'M',
                                                        '0rem',
                                                      ],
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                Text(
                                                  {
                                                    options: {
                                                      ...textOptions,
                                                      type: font('Font', {
                                                        value: ['Title4'],
                                                      }),
                                                      textColor: color(
                                                        'Text color',
                                                        {
                                                          value:
                                                            ThemeColor.DARK,
                                                        },
                                                      ),
                                                    },
                                                    ref: {
                                                      id: '#titleText',
                                                    },
                                                  },
                                                  [],
                                                ),
                                                Button(
                                                  {
                                                    options: {
                                                      ...buttonOptions,
                                                      buttonText: variable(
                                                        'Button text',
                                                        {
                                                          value: ['New'],
                                                        },
                                                      ),
                                                      icon: icon('Icon', {
                                                        value: 'Add',
                                                      }),
                                                    },
                                                    ref: {
                                                      id: '#createButton',
                                                    },
                                                    style: {
                                                      overwrite: {
                                                        backgroundColor: {
                                                          type: 'THEME_COLOR',
                                                          value: 'primary',
                                                        },
                                                        boxShadow: 'none',
                                                        color: {
                                                          type: 'THEME_COLOR',
                                                          value: 'white',
                                                        },
                                                        fontFamily: 'Roboto',
                                                        fontSize: '0.875rem',
                                                        fontStyle: 'none',
                                                        fontWeight: '400',
                                                        padding: [
                                                          '0.6875rem',
                                                          '1.375rem',
                                                        ],
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
                                                      },
                                                    },
                                                  },
                                                  [],
                                                ),
                                              ],
                                            ),
                                            Dialog(
                                              {
                                                options: {
                                                  ...dialogOptions,
                                                },
                                                ref: {
                                                  id: '#deleteDialog',
                                                },
                                              },
                                              [
                                                Paper({}, [
                                                  Row({}, [
                                                    Column({}, [
                                                      Box(
                                                        {
                                                          options: {
                                                            ...boxOptions,
                                                            alignment:
                                                              buttongroup(
                                                                'Alignment',
                                                                [
                                                                  [
                                                                    'None',
                                                                    'none',
                                                                  ],
                                                                  [
                                                                    'Left',
                                                                    'flex-start',
                                                                  ],
                                                                  [
                                                                    'Center',
                                                                    'center',
                                                                  ],
                                                                  [
                                                                    'Right',
                                                                    'flex-end',
                                                                  ],
                                                                  [
                                                                    'Justified',
                                                                    'space-between',
                                                                  ],
                                                                ],
                                                                {
                                                                  value:
                                                                    'space-between',
                                                                  configuration:
                                                                    {
                                                                      dataType:
                                                                        'string',
                                                                    },
                                                                },
                                                              ),
                                                          },
                                                        },
                                                        [
                                                          Text(
                                                            {
                                                              options: {
                                                                ...textOptions,
                                                                content:
                                                                  variable(
                                                                    'Content',
                                                                    {
                                                                      value: [
                                                                        'Delete record',
                                                                      ],
                                                                      configuration:
                                                                        {
                                                                          as: 'MULTILINE',
                                                                        },
                                                                    },
                                                                  ),
                                                                type: font(
                                                                  'Font',
                                                                  {
                                                                    value: [
                                                                      'Title4',
                                                                    ],
                                                                  },
                                                                ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          Button({
                                                            style: {
                                                              overwrite: {
                                                                backgroundColor:
                                                                  {
                                                                    type: 'STATIC',
                                                                    value:
                                                                      'transparent',
                                                                  },
                                                                boxShadow:
                                                                  'none',
                                                                color: {
                                                                  type: 'THEME_COLOR',
                                                                  value:
                                                                    'light',
                                                                },
                                                                padding: [
                                                                  '0rem',
                                                                  '0.6875rem',
                                                                  '0.6875rem',
                                                                  '0.6875rem',
                                                                ],
                                                              },
                                                            },
                                                            options: {
                                                              ...buttonOptions,
                                                              icon: icon(
                                                                'Icon',
                                                                {
                                                                  value:
                                                                    'Close',
                                                                },
                                                              ),
                                                              buttonText:
                                                                variable(
                                                                  'Button text',
                                                                  {
                                                                    value: [''],
                                                                  },
                                                                ),
                                                              outerSpacing:
                                                                sizes(
                                                                  'Outer space',
                                                                  {
                                                                    value: [
                                                                      '0rem',
                                                                      'S',
                                                                      '0rem',
                                                                      '0rem',
                                                                    ],
                                                                  },
                                                                ),
                                                              size: option(
                                                                'CUSTOM',
                                                                {
                                                                  value:
                                                                    'medium',
                                                                  label:
                                                                    'Icon size',
                                                                  configuration:
                                                                    {
                                                                      as: 'BUTTONGROUP',
                                                                      dataType:
                                                                        'string',
                                                                      allowedInput:
                                                                        [
                                                                          {
                                                                            name: 'Small',
                                                                            value:
                                                                              'small',
                                                                          },
                                                                          {
                                                                            name: 'Medium',
                                                                            value:
                                                                              'medium',
                                                                          },
                                                                          {
                                                                            name: 'Large',
                                                                            value:
                                                                              'large',
                                                                          },
                                                                        ],
                                                                      condition:
                                                                        hideIf(
                                                                          'icon',
                                                                          'EQ',
                                                                          'none',
                                                                        ),
                                                                    },
                                                                },
                                                              ),
                                                            },
                                                            ref: {
                                                              id: '#closeBtn',
                                                            },
                                                          }),
                                                        ],
                                                      ),
                                                      Row({}, [
                                                        Column({}, [
                                                          Text(
                                                            {
                                                              options: {
                                                                ...textOptions,
                                                                content:
                                                                  variable(
                                                                    'Content',
                                                                    {
                                                                      value: [
                                                                        "Are you sure you want to delete this record? You can't undo this action.",
                                                                      ],
                                                                      configuration:
                                                                        {
                                                                          as: 'MULTILINE',
                                                                        },
                                                                    },
                                                                  ),
                                                                type: font(
                                                                  'Font',
                                                                  {
                                                                    value: [
                                                                      'Body1',
                                                                    ],
                                                                  },
                                                                ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                        ]),
                                                      ]),
                                                      Box(
                                                        {
                                                          options: {
                                                            ...boxOptions,
                                                            alignment:
                                                              buttongroup(
                                                                'Alignment',
                                                                [
                                                                  [
                                                                    'None',
                                                                    'none',
                                                                  ],
                                                                  [
                                                                    'Left',
                                                                    'flex-start',
                                                                  ],
                                                                  [
                                                                    'Center',
                                                                    'center',
                                                                  ],
                                                                  [
                                                                    'Right',
                                                                    'flex-end',
                                                                  ],
                                                                  [
                                                                    'Justified',
                                                                    'space-between',
                                                                  ],
                                                                ],
                                                                {
                                                                  value:
                                                                    'flex-end',
                                                                  configuration:
                                                                    {
                                                                      dataType:
                                                                        'string',
                                                                    },
                                                                },
                                                              ),
                                                          },
                                                        },
                                                        [
                                                          Button(
                                                            {
                                                              ref: {
                                                                id: '#cancelButton',
                                                              },
                                                              options: {
                                                                ...buttonOptions,
                                                                buttonText:
                                                                  variable(
                                                                    'Button text',
                                                                    {
                                                                      value: [
                                                                        'Cancel',
                                                                      ],
                                                                    },
                                                                  ),
                                                                outerSpacing:
                                                                  sizes(
                                                                    'Outer space',
                                                                    {
                                                                      value: [
                                                                        '0rem',
                                                                        'M',
                                                                        '0rem',
                                                                        '0rem',
                                                                      ],
                                                                    },
                                                                  ),
                                                              },
                                                              style: {
                                                                overwrite: {
                                                                  backgroundColor:
                                                                    {
                                                                      type: 'STATIC',
                                                                      value:
                                                                        'transparent',
                                                                    },
                                                                  borderColor: {
                                                                    type: 'THEME_COLOR',
                                                                    value:
                                                                      'primary',
                                                                  },
                                                                  borderRadius:
                                                                    ['0.25rem'],
                                                                  borderStyle:
                                                                    'solid',
                                                                  borderWidth: [
                                                                    '0.0625rem',
                                                                  ],
                                                                  boxShadow:
                                                                    'none',
                                                                  color: {
                                                                    type: 'THEME_COLOR',
                                                                    value:
                                                                      'primary',
                                                                  },
                                                                  fontFamily:
                                                                    'Roboto',
                                                                  fontSize:
                                                                    '0.875rem',
                                                                  fontStyle:
                                                                    'none',
                                                                  fontWeight:
                                                                    '400',
                                                                  padding: [
                                                                    '0.625rem',
                                                                    '1.3125rem',
                                                                  ],
                                                                  textDecoration:
                                                                    'none',
                                                                  textTransform:
                                                                    'none',
                                                                },
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          component(
                                                            'Form Beta',
                                                            {
                                                              label:
                                                                'Delete Form Beta',
                                                              options: defaults,
                                                              ref: {
                                                                id: '#deleteForm',
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                        ],
                                                      ),
                                                    ]),
                                                  ]),
                                                ]),
                                              ],
                                            ),
                                            Conditional(
                                              {
                                                options: {
                                                  ...conditionalOptions,
                                                  visible: toggle(
                                                    'Initial visibility',
                                                    {
                                                      value: false,
                                                      configuration: {
                                                        as: 'VISIBILITY',
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                Box(
                                                  {
                                                    options: {
                                                      ...boxOptions,
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            '0rem',
                                                            '0rem',
                                                            'XL',
                                                            '0rem',
                                                          ],
                                                        },
                                                      ),
                                                      backgroundColor: color(
                                                        'Background color',
                                                        {
                                                          value:
                                                            ThemeColor.DANGER,
                                                        },
                                                      ),
                                                      borderRadius: size(
                                                        'Border radius',
                                                        {
                                                          value: '5px',
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    Text(
                                                      {
                                                        options: {
                                                          ...textOptions,
                                                          content: variable(
                                                            'Content',
                                                            {
                                                              value: [
                                                                'Attention: This template is using next generation actions!',
                                                              ],
                                                              configuration: {
                                                                as: 'MULTILINE',
                                                              },
                                                            },
                                                          ),
                                                          type: font('Font', {
                                                            value: ['Body1'],
                                                          }),
                                                          outerSpacing: sizes(
                                                            'Outer space',
                                                            {
                                                              value: [
                                                                '0rem',
                                                                '0rem',
                                                                '0rem',
                                                                'S',
                                                              ],
                                                            },
                                                          ),
                                                          textColor: color(
                                                            'Text color',
                                                            {
                                                              value:
                                                                ThemeColor.WHITE,
                                                            },
                                                          ),
                                                          fontWeight: option(
                                                            'CUSTOM',
                                                            {
                                                              label:
                                                                'Font weight',
                                                              value: '500',
                                                              configuration: {
                                                                as: 'DROPDOWN',
                                                                dataType:
                                                                  'string',
                                                                allowedInput: [
                                                                  {
                                                                    name: '100',
                                                                    value:
                                                                      '100',
                                                                  },
                                                                  {
                                                                    name: '200',
                                                                    value:
                                                                      '200',
                                                                  },
                                                                  {
                                                                    name: '300',
                                                                    value:
                                                                      '300',
                                                                  },
                                                                  {
                                                                    name: '400',
                                                                    value:
                                                                      '400',
                                                                  },
                                                                  {
                                                                    name: '500',
                                                                    value:
                                                                      '500',
                                                                  },
                                                                  {
                                                                    name: '600',
                                                                    value:
                                                                      '600',
                                                                  },
                                                                  {
                                                                    name: '700',
                                                                    value:
                                                                      '700',
                                                                  },
                                                                  {
                                                                    name: '800',
                                                                    value:
                                                                      '800',
                                                                  },
                                                                  {
                                                                    name: '900',
                                                                    value:
                                                                      '900',
                                                                  },
                                                                ],
                                                              },
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [],
                                                    ),
                                                    Text(
                                                      {
                                                        options: {
                                                          ...textOptions,
                                                          content: variable(
                                                            'Content',
                                                            {
                                                              value: [
                                                                'You need to configure the permissions of the "create", "update" and "delete" actions in order to use this template.',
                                                              ],
                                                              configuration: {
                                                                as: 'MULTILINE',
                                                              },
                                                            },
                                                          ),
                                                          type: font('Font', {
                                                            value: ['Body1'],
                                                          }),
                                                          outerSpacing: sizes(
                                                            'Outer space',
                                                            {
                                                              value: [
                                                                '0rem',
                                                                '0rem',
                                                                '0rem',
                                                                'S',
                                                              ],
                                                            },
                                                          ),
                                                          textColor: color(
                                                            'Text color',
                                                            {
                                                              value:
                                                                ThemeColor.WHITE,
                                                            },
                                                          ),
                                                          fontWeight: option(
                                                            'CUSTOM',
                                                            {
                                                              label:
                                                                'Font weight',
                                                              value: '500',
                                                              configuration: {
                                                                as: 'DROPDOWN',
                                                                dataType:
                                                                  'string',
                                                                allowedInput: [
                                                                  {
                                                                    name: '100',
                                                                    value:
                                                                      '100',
                                                                  },
                                                                  {
                                                                    name: '200',
                                                                    value:
                                                                      '200',
                                                                  },
                                                                  {
                                                                    name: '300',
                                                                    value:
                                                                      '300',
                                                                  },
                                                                  {
                                                                    name: '400',
                                                                    value:
                                                                      '400',
                                                                  },
                                                                  {
                                                                    name: '500',
                                                                    value:
                                                                      '500',
                                                                  },
                                                                  {
                                                                    name: '600',
                                                                    value:
                                                                      '600',
                                                                  },
                                                                  {
                                                                    name: '700',
                                                                    value:
                                                                      '700',
                                                                  },
                                                                  {
                                                                    name: '800',
                                                                    value:
                                                                      '800',
                                                                  },
                                                                  {
                                                                    name: '900',
                                                                    value:
                                                                      '900',
                                                                  },
                                                                ],
                                                              },
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [],
                                                    ),
                                                    Text(
                                                      {
                                                        options: {
                                                          ...textOptions,
                                                          content: variable(
                                                            'Content',
                                                            {
                                                              value: [
                                                                'This message is not visible in your app',
                                                              ],
                                                              configuration: {
                                                                as: 'MULTILINE',
                                                              },
                                                            },
                                                          ),
                                                          type: font('Font', {
                                                            value: ['Body1'],
                                                          }),
                                                          outerSpacing: sizes(
                                                            'Outer space',
                                                            {
                                                              value: [
                                                                '0rem',
                                                                '0rem',
                                                                '0rem',
                                                                'S',
                                                              ],
                                                            },
                                                          ),
                                                          textColor: color(
                                                            'Text color',
                                                            {
                                                              value:
                                                                ThemeColor.WHITE,
                                                            },
                                                          ),
                                                          fontWeight: option(
                                                            'CUSTOM',
                                                            {
                                                              label:
                                                                'Font weight',
                                                              value: '500',
                                                              configuration: {
                                                                as: 'DROPDOWN',
                                                                dataType:
                                                                  'string',
                                                                allowedInput: [
                                                                  {
                                                                    name: '100',
                                                                    value:
                                                                      '100',
                                                                  },
                                                                  {
                                                                    name: '200',
                                                                    value:
                                                                      '200',
                                                                  },
                                                                  {
                                                                    name: '300',
                                                                    value:
                                                                      '300',
                                                                  },
                                                                  {
                                                                    name: '400',
                                                                    value:
                                                                      '400',
                                                                  },
                                                                  {
                                                                    name: '500',
                                                                    value:
                                                                      '500',
                                                                  },
                                                                  {
                                                                    name: '600',
                                                                    value:
                                                                      '600',
                                                                  },
                                                                  {
                                                                    name: '700',
                                                                    value:
                                                                      '700',
                                                                  },
                                                                  {
                                                                    name: '800',
                                                                    value:
                                                                      '800',
                                                                  },
                                                                  {
                                                                    name: '900',
                                                                    value:
                                                                      '900',
                                                                  },
                                                                ],
                                                              },
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [],
                                                    ),
                                                  ],
                                                ),
                                              ],
                                            ),
                                            DataTable(
                                              {
                                                ref: {
                                                  id: '#dataTable',
                                                },
                                                options: {
                                                  ...dataTableOptions,
                                                  pagination: option('CUSTOM', {
                                                    label: 'Pagination',
                                                    value: 'whenNeeded',
                                                    configuration: {
                                                      as: 'BUTTONGROUP',
                                                      dataType: 'string',
                                                      dependsOn: 'model',
                                                      allowedInput: [
                                                        {
                                                          name: 'Always',
                                                          value: 'always',
                                                        },
                                                        {
                                                          name: 'When needed',
                                                          value: 'whenNeeded',
                                                        },
                                                        {
                                                          name: 'Never',
                                                          value: 'never',
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                  take: option('CUSTOM', {
                                                    value: '10',
                                                    label: 'Rows per page',
                                                    configuration: {
                                                      as: 'DROPDOWN',
                                                      dataType: 'string',
                                                      dependsOn: 'model',
                                                      allowedInput: [
                                                        {
                                                          name: '5',
                                                          value: '5',
                                                        },
                                                        {
                                                          name: '10',
                                                          value: '10',
                                                        },
                                                        {
                                                          name: '25',
                                                          value: '25',
                                                        },
                                                        {
                                                          name: '50',
                                                          value: '50',
                                                        },
                                                        {
                                                          name: '100',
                                                          value: '100',
                                                        },
                                                      ],
                                                      condition: hideIf(
                                                        'autoLoadOnScroll',
                                                        'EQ',
                                                        true,
                                                      ),
                                                    },
                                                  }),
                                                  background: color(
                                                    'Background',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
                                                  variant: option('CUSTOM', {
                                                    label: 'Variant',
                                                    value: 'outlined',
                                                    configuration: {
                                                      as: 'BUTTONGROUP',
                                                      dataType: 'string',
                                                      allowedInput: [
                                                        {
                                                          name: 'Flat',
                                                          value: 'flat',
                                                        },
                                                        {
                                                          name: 'Elevation',
                                                          value: 'elevation',
                                                        },
                                                        {
                                                          name: 'Outlined',
                                                          value: 'outlined',
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                },
                                              },
                                              [],
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                    Box(
                      {
                        options: {
                          ...boxOptions,
                          width: size('Width', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                          backgroundColor: color('Background color', {
                            value: ThemeColor.LIGHT,
                          }),
                          backgroundColorAlpha: option('NUMBER', {
                            label: 'Background color opacity',
                            value: 20,
                          }),
                        },
                        ref: { id: '#footer' },
                      },
                      [],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    ),
  ],
);

const drawerBar = DrawerBar(
  {
    label: 'CRUD - Side menu',
    options: {
      ...drawerBarOptions,
      innerSpacing: sizes('Inner space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
      }),
    },
    ref: { id: '#drawerSidebar' },
  },
  [
    Box(
      {
        options: {
          ...boxOptions,
          height: size('Height', {
            value: '100%',
            configuration: {
              as: 'UNIT',
            },
          }),
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
        },
      },
      [
        Tabs(
          {
            options: {
              ...tabsOptions,
              height: size('Height', {
                value: '100%',
                configuration: {
                  as: 'UNIT',
                },
              }),
              hideTabs: toggle('Hide visual tabs', { value: true }),
            },
          },
          [
            Tab(
              {
                label: 'CreateTab',
                options: {
                  ...tabOptions,
                  label: variable('Tab label', {
                    value: ['CreateTab'],
                  }),
                  height: size('Height', {
                    value: '100%',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                },
                ref: { id: '#createTab' },
              },
              [
                Grid(
                  {
                    options: {
                      ...gridOptions,
                      height: size('Height', {
                        value: '100%',
                        configuration: {
                          as: 'UNIT',
                        },
                      }),
                    },
                  },
                  [
                    Grid(
                      {
                        options: {
                          ...gridOptions,
                          direction: option('CUSTOM', {
                            value: 'column',
                            label: 'Direction',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Horizontal', value: 'row' },
                                { name: 'Vertical', value: 'column' },
                              ],
                              condition: showIf('type', 'EQ', 'container'),
                            },
                          }),
                        },
                      },
                      [
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              alignment: buttongroup(
                                'Alignment',
                                [
                                  ['None', 'none'],
                                  ['Left', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Right', 'flex-end'],
                                  ['Justified', 'space-between'],
                                ],
                                {
                                  value: 'space-between',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              valignment: buttongroup(
                                'Vertical alignment',
                                [
                                  ['None', 'none'],
                                  ['Top', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Bottom', 'flex-end'],
                                ],
                                {
                                  value: 'center',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              backgroundColor: color('Background color', {
                                value: ThemeColor.PRIMARY,
                              }),
                            },
                          },
                          [
                            Text(
                              {
                                options: {
                                  ...textOptions,
                                  content: variable('Content', {
                                    value: ['Create'],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Font', {
                                    value: ['Title5'],
                                  }),
                                  textColor: color('Text color', {
                                    value: ThemeColor.WHITE,
                                  }),
                                },
                              },
                              [],
                            ),
                            Button(
                              {
                                options: {
                                  ...buttonOptions,
                                  buttonText: variable('Button text', {
                                    value: [''],
                                  }),
                                  icon: icon('Icon', {
                                    value: 'Close',
                                  }),
                                  size: option('CUSTOM', {
                                    value: 'medium',
                                    label: 'Icon size',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Small',
                                          value: 'small',
                                        },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        {
                                          name: 'Large',
                                          value: 'large',
                                        },
                                      ],
                                      condition: hideIf('icon', 'EQ', 'none'),
                                    },
                                  }),
                                },
                                ref: { id: '#closeCreateTabBtn' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'STATIC',
                                      value: 'Transparent',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    padding: ['0rem'],
                                  },
                                },
                              },
                              [],
                            ),
                          ],
                        ),
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              stretch: toggle(
                                'Stretch (when in flex container)',
                                {
                                  value: true,
                                },
                              ),
                            },
                            ref: { id: '#createFormBox' },
                          },
                          [
                            component(
                              'Form Beta',
                              {
                                label: 'Create Form Beta',
                                options: defaults,
                                ref: { id: '#createForm' },
                              },
                              [
                                FormErrorAlert({
                                  ref: { id: '#createAlertErrorId' },
                                }),
                              ],
                            ),
                          ],
                        ),
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              alignment: buttongroup(
                                'Alignment',
                                [
                                  ['None', 'none'],
                                  ['Left', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Right', 'flex-end'],
                                  ['Justified', 'space-between'],
                                ],
                                {
                                  value: 'space-between',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              backgroundColor: color('Background color', {
                                value: ThemeColor.LIGHT,
                              }),
                              backgroundColorAlpha: option('NUMBER', {
                                label: 'Background color opacity',
                                value: 20,
                              }),
                            },
                          },
                          [
                            Button(
                              {
                                options: {
                                  ...buttonOptions,
                                  buttonText: variable('Button text', {
                                    value: ['Cancel'],
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', 'S', '0rem', '0rem'],
                                  }),
                                },
                                ref: { id: '#createCancelButton' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'STATIC',
                                      value: 'transparent',
                                    },
                                    borderColor: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    borderRadius: ['0.25rem'],
                                    borderStyle: 'solid',
                                    borderWidth: ['0.0625rem'],
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['0.625rem', '1.3125rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                              },
                              [],
                            ),
                            SubmitButton(
                              {
                                options: {
                                  ...submitButtonOptions,
                                  buttonText: variable('Button text', {
                                    value: ['Save'],
                                  }),
                                  icon: icon('Icon', { value: 'Save' }),
                                },
                                ref: { id: '#createSubmitButton' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['0.6875rem', '1.375rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                              },
                              [],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            Tab(
              {
                label: 'DetailTab',
                options: {
                  ...tabOptions,
                  label: variable('Tab label', {
                    value: ['DetailTab'],
                  }),
                  height: size('Height', {
                    value: '100%',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                },
                ref: { id: '#detailTab' },
              },
              [
                Grid(
                  {
                    options: {
                      ...gridOptions,
                      height: size('Height', {
                        value: '100%',
                        configuration: {
                          as: 'UNIT',
                        },
                      }),
                    },
                  },
                  [
                    Grid(
                      {
                        options: {
                          ...gridOptions,
                          direction: option('CUSTOM', {
                            value: 'column',
                            label: 'Direction',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Horizontal', value: 'row' },
                                { name: 'Vertical', value: 'column' },
                              ],
                              condition: showIf('type', 'EQ', 'container'),
                            },
                          }),
                        },
                      },
                      [
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              alignment: buttongroup(
                                'Alignment',
                                [
                                  ['None', 'none'],
                                  ['Left', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Right', 'flex-end'],
                                  ['Justified', 'space-between'],
                                ],
                                {
                                  value: 'space-between',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              valignment: buttongroup(
                                'Vertical alignment',
                                [
                                  ['None', 'none'],
                                  ['Top', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Bottom', 'flex-end'],
                                ],
                                {
                                  value: 'center',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              backgroundColor: color('Background color', {
                                value: ThemeColor.PRIMARY,
                              }),
                            },
                          },
                          [
                            Text(
                              {
                                options: {
                                  ...textOptions,
                                  content: variable('Content', {
                                    value: ['Details'],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Font', {
                                    value: ['Title5'],
                                  }),
                                  textColor: color('Text color', {
                                    value: ThemeColor.WHITE,
                                  }),
                                },
                              },
                              [],
                            ),
                            Button(
                              {
                                options: {
                                  ...buttonOptions,
                                  buttonText: variable('Button text', {
                                    value: [''],
                                  }),
                                  icon: icon('Icon', {
                                    value: 'Close',
                                  }),
                                  size: option('CUSTOM', {
                                    value: 'medium',
                                    label: 'Icon size',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Small',
                                          value: 'small',
                                        },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        {
                                          name: 'Large',
                                          value: 'large',
                                        },
                                      ],
                                      condition: hideIf('icon', 'EQ', 'none'),
                                    },
                                  }),
                                },
                                ref: { id: '#closeDetailsTabBtn' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'STATIC',
                                      value: 'Transparent',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    padding: ['0rem'],
                                  },
                                },
                              },
                              [],
                            ),
                          ],
                        ),
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              stretch: toggle(
                                'Stretch (when in flex container)',
                                {
                                  value: true,
                                },
                              ),
                            },
                            ref: { id: '#detailBox' },
                          },
                          [
                            DataContainer(
                              { ref: { id: '#detailDatacontainer' } },
                              [],
                            ),
                          ],
                        ),
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              alignment: buttongroup(
                                'Alignment',
                                [
                                  ['None', 'none'],
                                  ['Left', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Right', 'flex-end'],
                                  ['Justified', 'space-between'],
                                ],
                                {
                                  value: 'space-between',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              backgroundColor: color('Background color', {
                                value: ThemeColor.LIGHT,
                              }),
                              backgroundColorAlpha: option('NUMBER', {
                                label: 'Background color opacity',
                                value: 20,
                              }),
                            },
                          },
                          [
                            Button(
                              {
                                options: {
                                  ...buttonOptions,
                                  buttonText: variable('Button text', {
                                    value: ['Cancel'],
                                  }),
                                },
                                ref: { id: '#detailCancelButton' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'STATIC',
                                      value: 'transparent',
                                    },
                                    borderColor: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    borderRadius: ['0.25rem'],
                                    borderStyle: 'solid',
                                    borderWidth: ['0.0625rem'],
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['0.625rem', '1.3125rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                              },
                              [],
                            ),
                            Button(
                              {
                                options: {
                                  ...buttonOptions,
                                  buttonText: variable('Button text', {
                                    value: ['Edit'],
                                  }),
                                  icon: icon('Icon', { value: 'Edit' }),
                                },
                                ref: { id: '#editButtonFromDetails' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['0.6875rem', '1.375rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                              },
                              [],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            Tab(
              {
                label: 'EditTab',
                options: {
                  ...tabOptions,
                  label: variable('Tab label', { value: ['EditTab'] }),
                  height: size('Height', {
                    value: '100%',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                },
                ref: { id: '#editTab' },
              },
              [
                Grid(
                  {
                    options: {
                      ...gridOptions,
                      height: size('Height', {
                        value: '100%',
                        configuration: {
                          as: 'UNIT',
                        },
                      }),
                    },
                  },
                  [
                    Grid(
                      {
                        options: {
                          ...gridOptions,
                          direction: option('CUSTOM', {
                            value: 'column',
                            label: 'Direction',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Horizontal', value: 'row' },
                                { name: 'Vertical', value: 'column' },
                              ],
                              condition: showIf('type', 'EQ', 'container'),
                            },
                          }),
                        },
                      },
                      [
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              alignment: buttongroup(
                                'Alignment',
                                [
                                  ['None', 'none'],
                                  ['Left', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Right', 'flex-end'],
                                  ['Justified', 'space-between'],
                                ],
                                {
                                  value: 'space-between',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              valignment: buttongroup(
                                'Vertical alignment',
                                [
                                  ['None', 'none'],
                                  ['Top', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Bottom', 'flex-end'],
                                ],
                                {
                                  value: 'center',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              backgroundColor: color('Background color', {
                                value: ThemeColor.PRIMARY,
                              }),
                            },
                          },
                          [
                            Text(
                              {
                                options: {
                                  ...textOptions,
                                  content: variable('Content', {
                                    value: ['Update'],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Font', {
                                    value: ['Title5'],
                                  }),
                                  textColor: color('Text color', {
                                    value: ThemeColor.WHITE,
                                  }),
                                },
                              },
                              [],
                            ),
                            Button(
                              {
                                options: {
                                  ...buttonOptions,
                                  buttonText: variable('Button text', {
                                    value: [''],
                                  }),
                                  icon: icon('Icon', {
                                    value: 'Close',
                                  }),
                                  size: option('CUSTOM', {
                                    value: 'medium',
                                    label: 'Icon size',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Small',
                                          value: 'small',
                                        },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        {
                                          name: 'Large',
                                          value: 'large',
                                        },
                                      ],
                                      condition: hideIf('icon', 'EQ', 'none'),
                                    },
                                  }),
                                },
                                ref: { id: '#closeEditTabBtn' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'STATIC',
                                      value: 'Transparent',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    padding: ['0rem'],
                                  },
                                },
                              },
                              [],
                            ),
                          ],
                        ),
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              stretch: toggle(
                                'Stretch (when in flex container)',
                                {
                                  value: true,
                                },
                              ),
                            },
                          },
                          [
                            component(
                              'Form Beta',
                              {
                                label: 'Update Form Beta',
                                options: defaults,
                                ref: { id: '#editForm' },
                              },
                              [
                                FormErrorAlert({
                                  ref: { id: '#editErrorAlert' },
                                }),
                              ],
                            ),
                          ],
                        ),
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              alignment: buttongroup(
                                'Alignment',
                                [
                                  ['None', 'none'],
                                  ['Left', 'flex-start'],
                                  ['Center', 'center'],
                                  ['Right', 'flex-end'],
                                  ['Justified', 'space-between'],
                                ],
                                {
                                  value: 'space-between',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              backgroundColor: color('Background color', {
                                value: ThemeColor.LIGHT,
                              }),
                              backgroundColorAlpha: option('NUMBER', {
                                label: 'Background color opacity',
                                value: 20,
                              }),
                            },
                          },
                          [
                            Button(
                              {
                                options: {
                                  ...buttonOptions,
                                  buttonText: variable('Button text', {
                                    value: ['Cancel'],
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', 'S', '0rem', '0rem'],
                                  }),
                                },
                                ref: { id: '#editCancelButton' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'STATIC',
                                      value: 'transparent',
                                    },
                                    borderColor: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    borderRadius: ['0.25rem'],
                                    borderStyle: 'solid',
                                    borderWidth: ['0.0625rem'],
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['0.625rem', '1.3125rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                              },
                              [],
                            ),
                            SubmitButton(
                              {
                                options: {
                                  ...submitButtonOptions,
                                  buttonText: variable('Button text', {
                                    value: ['Save'],
                                  }),
                                  icon: icon('Icon', { value: 'Save' }),
                                },
                                ref: { id: '#editSubmitButton' },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['0.6875rem', '1.375rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                              },
                              [],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    ),
  ],
);

const prefabStructure = [
  Drawer(
    {
      options: {
        ...drawerOptions,
        drawerWidth: size('Drawer Width', {
          value: '480px',
          configuration: {
            as: 'UNIT',
          },
        }),
        temporaryAnchor: option('CUSTOM', {
          value: 'right',
          label: 'Alignment',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'left' },
              { name: 'Top', value: 'top' },
              { name: 'Right', value: 'right' },
              { name: 'Bottom', value: 'bottom' },
            ],
            condition: showIf('drawerType', 'EQ', 'temporary'),
          },
        }),
        visibility: toggle('Toggle visibility', {
          value: false,
          configuration: {
            as: 'VISIBILITY',
          },
        }),
        drawerType: option('CUSTOM', {
          value: 'temporary',
          label: 'Drawer type',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Persistent', value: 'persistent' },
              { name: 'Temporary', value: 'temporary' },
            ],
          },
        }),
      },
    },
    [drawerBar, drawerContainer],
  ),
];

const beforeCreate = ({
  components: {
    Content,
    Header,
    Field,
    Footer,
    ModelRelationSelector,
    PropertiesSelector,
    PartialSelector,
    Text: TextComp,
    Box: BoxComp,
    Button: Buttoncomp,
  },
  helpers: {
    useModelQuery,
    prepareAction,
    cloneStructure,
    setOption,
    createUuid,
    makeBettyInput,
    makeBettyUpdateInput,
    PropertyKind,
    BettyPrefabs,
  },
  prefab: originalPrefab,
  save,
  close,
}: any) => {
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const [modelValidation, setModelValidation] = React.useState(false);
  const [propertiesValidation, setPropertiesValidation] = React.useState(false);
  const [idProperty, setIdProperty] = React.useState<Property>();
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });
  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

  const createFormId = createUuid();
  const editFormId = createUuid();
  const deleteButtonId = createUuid();
  const getDescendantByRef = (refValue: string, structure: any) =>
    structure.reduce((acc: string, comp: PrefabReference) => {
      if (acc) return acc;
      if (
        comp.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        comp.ref
          ? Object.values(comp.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return comp;
      }
      if (comp.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, comp.descendants);
    }, null);

  const enrichVarObj = (obj: any) => {
    const returnObject = obj;
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
      }
    }
    return returnObject;
  };

  const makeDetail = (prop: any) => {
    const mediaComponent = cloneStructure('Media');
    setOption(mediaComponent, 'imageSource', (opt: any) => ({
      ...opt,
      value: [{ ...prop }],
      configuration: {
        as: 'BUTTONGROUP',
        dataType: 'string',
        allowedInput: [
          { name: 'Image', value: 'img' },
          { name: 'Video', value: 'video' },
          { name: 'I-frame', value: 'iframe' },
        ],
      },
    }));

    const detailComponent = cloneStructure('Box');
    setOption(detailComponent, 'outerSpacing', (opt: any) => ({
      ...opt,
      value: ['0rem', '0rem', 'M', '0rem'],
    }));
    setOption(detailComponent, 'backgroundColor', (opt: any) => ({
      ...opt,
      value: 'Accent1',
    }));
    setOption(detailComponent, 'backgroundColorAlpha', (opt: any) => ({
      ...opt,
      value: '20',
    }));
    const labelText = cloneStructure('Text');
    setOption(labelText, 'content', (opt: any) => ({
      ...opt,
      value: [`${[prop.label]}:`],
      configuration: { as: 'MULTILINE' },
    }));
    setOption(labelText, 'type', (opt: any) => ({
      ...opt,
      value: 'Body1',
    }));
    setOption(labelText, 'fontWeight', (opt: any) => ({
      ...opt,
      value: '500',
      configuration: {
        as: 'DROPDOWN',
        dataType: 'string',
        allowedInput: [
          { name: '100', value: '100' },
          { name: '200', value: '200' },
          { name: '300', value: '300' },
          { name: '400', value: '400' },
          { name: '500', value: '500' },
          { name: '600', value: '600' },
          { name: '700', value: '700' },
          { name: '800', value: '800' },
          { name: '900', value: '900' },
        ],
      },
    }));

    const valueText = cloneStructure('Text');
    setOption(valueText, 'content', (opt: any) => ({
      ...opt,
      value: [enrichVarObj({ ...prop })],
      configuration: { as: 'MULTILINE' },
    }));

    detailComponent.descendants = [labelText, valueText];

    return prop.kind === 'IMAGE' ? mediaComponent : detailComponent;
  };

  useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: any) => {
      setModel(result.model);
      setIdProperty(
        result.model.properties.find(({ name }: any) => name === 'id'),
      );
    },
  });

  const stepper = {
    setStep: (step: any) => {
      if (step === 1) {
        return (
          <>
            <BoxComp pad={{ bottom: '15px' }}>
              <BoxComp pad={{ bottom: '15px' }}>
                <TextComp size="medium" weight="bolder">
                  Select partials
                </TextComp>
              </BoxComp>
              <BoxComp pad={{ bottom: '15px' }}>
                <TextComp color="grey700">
                  By using a partial for the side menu and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </TextComp>
              </BoxComp>
              <Field label="SIDEMENU PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(headerId: string) => {
                    setHeaderPartialId(headerId);
                  }}
                  preSelected="Top menu"
                  value={headerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </BoxComp>
            <BoxComp pad={{ bottom: '15px' }}>
              <Field label="FOOTER PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(footerId: string) => {
                    setFooterPartialId(footerId);
                  }}
                  preSelected="footer"
                  value={footerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </BoxComp>
          </>
        );
      }

      return (
        <>
          <Field
            label="Model"
            error={
              modelValidation && (
                <TextComp color="#e82600">
                  Selecting a model is required
                </TextComp>
              )
            }
          >
            <ModelRelationSelector
              onChange={(value: any) => {
                setModelValidation(false);
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field
            label="Properties used in CRUD with slide out"
            error={
              propertiesValidation && (
                <TextComp color="#e82600">
                  Selecting a property is required
                </TextComp>
              )
            }
          >
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              disabledKinds={[
                'BELONGS_TO',
                'HAS_AND_BELONGS_TO_MANY',
                'HAS_MANY',
                'MULTI_FILE',
                'AUTO_INCREMENT',
                'COUNT',
                'MULTI_IMAGE',
                'PDF',
                'RICH_TEXT',
                'SIGNED_PDF',
                'SUM',
                'BOOLEAN_EXPRESSION',
                'DATE_EXPRESSION',
                'DATE_TIME_EXPRESSION',
                'DECIMAL_EXPRESSION',
                'INTEGER_EXPRESSION',
                'MINUTES_EXPRESSION',
                'PRICE_EXPRESSION',
                'STRING_EXPRESSION',
                'TEXT_EXPRESSION',
                'MINUTES',
                'ZIPCODE',
                'IMAGE',
                'FILE',
              ]}
              onChange={(value: any) => {
                setProperties(value);
                setPropertiesValidation(false);
              }}
            />
          </Field>
        </>
      );
    },
    onSave: async () => {
      const newPrefab = { ...originalPrefab };

      const inputStructure = (
        textValue: string,
        inputPrefab: PrefabReference,
      ): PrefabReference => {
        const boxPrefab = cloneStructure('Box');
        setOption(
          boxPrefab,
          'innerSpacing',
          (options: PrefabComponentOption[]) => ({
            ...options,
            value: ['M', '0rem', '0rem', '0rem'],
          }),
        );
        const textPrefab = cloneStructure('Text');
        setOption(
          textPrefab,
          'content',
          (options: PrefabComponentOption[]) => ({
            ...options,
            value: [textValue],
            configuration: { as: 'MULTILINE' },
          }),
        );
        setOption(textPrefab, 'type', (options: PrefabComponentOption[]) => ({
          ...options,
          value: ['Body1'],
        }));
        setOption(
          textPrefab,
          'outerSpacing',
          (options: PrefabComponentOption[]) => ({
            ...options,
            value: ['0rem', '0rem', 'S', '0rem'],
          }),
        );
        boxPrefab.descendants.push(textPrefab);
        boxPrefab.descendants.push(inputPrefab);
        return boxPrefab;
      };

      if (!modelId) {
        setModelValidation(true);
        return;
      }
      if (!properties || properties.length < 1) {
        setPropertiesValidation(true);
        return;
      }

      if (headerPartialId) {
        const topMenuPartial = getDescendantByRef(
          '#topMenu',
          newPrefab.structure,
        );

        topMenuPartial.descendants = [
          { type: 'PARTIAL', partialId: headerPartialId },
        ];
      }

      if (footerPartialId) {
        const footerPartial = getDescendantByRef(
          '#footer',
          newPrefab.structure,
        );

        footerPartial.descendants = [
          { type: 'PARTIAL', partialId: footerPartialId },
        ];
      }

      // set title prop
      const titleComponent = getDescendantByRef(
        '#titleText',
        newPrefab.structure,
      );
      titleComponent.options[0].value = [`${data?.model.label}s`];
      // set datatable
      const dataTableComp = getDescendantByRef(
        '#dataTable',
        newPrefab.structure,
      );

      dataTableComp.options[1] = {
        value: modelId,
        label: 'Model',
        key: 'model',
        type: 'MODEL_AND_RELATION',
      };

      properties.forEach(
        (property: {
          defaultValue: null;
          id: string[];
          kind: string;
          labonSael: string;
          type: string;
          format: string;
        }) => {
          let newProperty = property;
          const inheritFormatKinds = [
            'DATE',
            'DATE_EXPRESSION',
            'DATE_TIME',
            'DATE_TIME_EXPRESSION',
            'DECIMAL',
            'DECIMAL_EXPRESSION',
            'INTEGER',
            'INTEGER_EXPRESSION',
            'PRICE',
            'PRICE_EXPRESSION',
            'TIME',
          ];
          if (inheritFormatKinds.includes(property.kind)) {
            newProperty = {
              ...property,
              format: 'INHERIT',
            };
          }

          const dataTableColumnStructure = cloneStructure('Datatable Column');
          if (dataTableColumnStructure.type !== 'COMPONENT') {
            throw new Error(
              `expected component prefab, found ${dataTableColumnStructure.type}`,
            );
          }

          setOption(
            dataTableColumnStructure,
            'property',
            (originalOption: any) => {
              return {
                ...originalOption,
                value: newProperty,
              };
            },
          );
          setOption(dataTableColumnStructure, 'type', (originalOption: any) => {
            return {
              ...originalOption,
              value: 'Title6',
            };
          });
          setOption(
            dataTableColumnStructure,
            'sortable',
            (originalOption: any) => {
              return {
                ...originalOption,
                value: true,
              };
            },
          );
          dataTableComp.descendants.push(dataTableColumnStructure);
        },
      );

      const buttonColumn = cloneStructure('Datatable Column');
      const detailButton = cloneStructure('Button');
      detailButton.ref = { id: '#detailButton' };
      detailButton.style = {
        overwrite: {
          backgroundColor: {
            type: 'STATIC',
            value: 'transparent',
          },
          boxShadow: 'none',
          color: {
            type: 'THEME_COLOR',
            value: 'accent2',
          },
          fontFamily: 'Roboto',
          fontSize: '0.875rem',
          fontStyle: 'none',
          fontWeight: '400',
          padding: ['0.6875rem', '0.6875rem'],
          textDecoration: 'none',
          textTransform: 'none',
        },
      };
      setOption(detailButton, 'buttonText', (opts: any) => ({
        ...opts,
        value: [''],
      }));
      setOption(detailButton, 'icon', (opts: any) => ({
        ...opts,
        value: 'Info',
      }));
      const editButton = cloneStructure('Button');
      editButton.style = {
        overwrite: {
          backgroundColor: {
            type: 'STATIC',
            value: 'transparent',
          },
          boxShadow: 'none',
          color: {
            type: 'THEME_COLOR',
            value: 'primary',
          },
          fontFamily: 'Roboto',
          fontSize: '0.875rem',
          fontStyle: 'none',
          fontWeight: '400',
          padding: ['0.6875rem', '0.6875rem'],
          textDecoration: 'none',
          textTransform: 'none',
        },
      };
      editButton.ref = { id: '#editButton' };
      setOption(editButton, 'buttonText', (opts: any) => ({
        ...opts,
        value: [''],
      }));
      setOption(editButton, 'icon', (opts: any) => ({
        ...opts,
        value: 'Edit',
      }));

      const deleteButton = cloneStructure('Button');
      deleteButton.ref = {
        id: '#deleteButton',
      };
      deleteButton.style = {
        overwrite: {
          backgroundColor: {
            type: 'STATIC',
            value: 'transparent',
          },
          boxShadow: 'none',
          color: {
            type: 'STATIC',
            value: 'red',
          },
          fontFamily: 'Roboto',
          fontSize: '0.875rem',
          fontStyle: 'none',
          fontWeight: '400',
          padding: ['0.6875rem', '0.6875rem'],
          textDecoration: 'none',
          textTransform: 'none',
        },
      };

      setOption(deleteButton, 'buttonText', (opts: any) => ({
        ...opts,
        value: [''],
      }));
      setOption(deleteButton, 'icon', (opts: any) => ({
        ...opts,
        value: 'Delete',
      }));
      const boxComp = cloneStructure('Box');
      setOption(boxComp, 'innerSpacing', (opts: any) => ({
        ...opts,
        value: ['0rem', '0rem', '0rem', '0rem'],
      }));
      boxComp.descendants = [detailButton, editButton, deleteButton];
      buttonColumn.descendants = [boxComp];
      dataTableComp.descendants.push(buttonColumn);
      setOption(boxComp, 'alignment', (opts: any) => ({
        ...opts,
        value: 'flex-end',
      }));
      // set create form
      const filteredproperties = properties.filter(
        (prop: Property) =>
          prop.label !== 'Created at' &&
          prop.label !== 'Updated at' &&
          prop.label !== 'Id',
      );
      if (idProperty && model) {
        const createForm = getDescendantByRef(
          '#createForm',
          newPrefab.structure,
        );
        createForm.id = createFormId;

        const result: ActionResultsProps = await prepareAction(
          createFormId,
          idProperty,
          filteredproperties,
          'create',
        );

        Object.values(result.variables).forEach(
          ([prop, inputVariable]): void => {
            const generateInputPrefabs = () => {
              switch (prop.kind) {
                case PropertyKind.INTEGER:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.INTEGER,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.EMAIL_ADDRESS:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.EMAIL_ADDRESS,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.DECIMAL:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.DECIMAL,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.TEXT:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.TEXT,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.PRICE:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.PRICE,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.PASSWORD:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.PASSWORD,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.DATE:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.DATE,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.DATE_TIME:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.DATE_TIME,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.TIME:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.TIME,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.FILE:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.FILE,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.IMAGE:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.IMAGE,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.BOOLEAN:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.BOOLEAN,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.LIST:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.LIST,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                default:
                  return inputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.STRING,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
              }
            };
            const createFormInputPrefabs = generateInputPrefabs();
            if (createFormInputPrefabs.type === 'COMPONENT') {
              setOption(
                createFormInputPrefabs.descendants[1],
                'margin',
                (options: PrefabComponentOption) => ({
                  ...options,
                  value: 'none',
                }),
              );
              setOption(
                createFormInputPrefabs.descendants[1],
                'hideLabel',
                (opts: PrefabComponentOption) => ({
                  ...opts,
                  value: true,
                }),
              );
            }
            createForm.descendants.push(createFormInputPrefabs);
            if (!prop.kind) {
              // eslint-disable-next-line no-console
              console.warn('PropertyKind not found');
            }
          },
        );

        setOption(createForm, 'actionId', (opts: any) => ({
          ...opts,
          value: result.action.actionId,
          configuration: { disabled: true },
        }));

        setOption(createForm, 'model', (opts: any) => ({
          ...opts,
          value: modelId,
          configuration: {
            disabled: true,
          },
        }));
      }

      // set detail tab
      const detailDatacontainer = getDescendantByRef(
        '#detailDatacontainer',
        newPrefab.structure,
      );
      setOption(detailDatacontainer, 'model', (opts: any) => ({
        ...opts,
        value: modelId,
      }));
      properties.map((prop) =>
        detailDatacontainer.descendants.push(makeDetail(prop)),
      );

      // set edit form
      const editForm = getDescendantByRef('#editForm', newPrefab.structure);
      editForm.id = editFormId;
      if (idProperty && model) {
        const result: ActionResultsProps = await prepareAction(
          editFormId,
          idProperty,
          filteredproperties,
          'update',
        );
        setOption(editForm, 'actionId', (opts: any) => ({
          ...opts,
          value: result.action.actionId,
          configuration: { disabled: true },
        }));
        setOption(editForm, 'model', (opts: any) => ({
          ...opts,
          value: modelId,
          configuration: {
            disabled: true,
          },
        }));

        Object.values(result.variables).forEach(([prop, inputVariable]) => {
          const generateInputPrefabs = () => {
            switch (prop.kind) {
              case PropertyKind.INTEGER:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.INTEGER,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.EMAIL_ADDRESS:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.EMAIL_ADDRESS,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.DECIMAL:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.DECIMAL,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.TEXT:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.TEXT,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.PRICE:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.PRICE,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.PASSWORD:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.PASSWORD,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.DATE:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.DATE,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.DATE_TIME:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.DATE_TIME,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.TIME:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.TIME,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.FILE:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.FILE,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.IMAGE:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.IMAGE,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.BOOLEAN:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.BOOLEAN,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              case PropertyKind.LIST:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.LIST,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
              default:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.STRING,
                    model,
                    prop,
                    inputVariable,
                    result.IdProperties,
                  ),
                );
            }
          };
          const editFormInput = generateInputPrefabs();
          if (editFormInput.type === 'COMPONENT') {
            setOption(
              editFormInput.descendants[1],
              'margin',
              (opts: PrefabComponentOption) => ({
                ...opts,
                value: 'none',
              }),
            );
            setOption(
              editFormInput.descendants[1],
              'hideLabel',
              (opts: PrefabComponentOption) => ({
                ...opts,
                value: true,
              }),
            );
          }
          editForm.descendants.push(editFormInput);
          if (!prop.kind) {
            // eslint-disable-next-line no-console
            console.warn('PropertyKind not found');
          }
        });

        editForm.descendants.push(
          makeBettyUpdateInput(
            BettyPrefabs.HIDDEN,
            model,
            idProperty,
            result.recordInputVariable,
          ),
        );
      }

      // set delete action
      const deleteForm = getDescendantByRef('#deleteForm', newPrefab.structure);
      deleteForm.id = deleteButtonId;

      const result = await prepareAction(
        deleteButtonId,
        idProperty,
        null,
        'delete',
      );

      setOption(deleteForm, 'actionId', (opts: any) => ({
        ...opts,
        value: result.action.actionId,
        configuration: { disabled: true },
      }));
      setOption(deleteForm, 'model', (opts: any) => ({
        ...opts,
        value: modelId,
        configuration: {
          disabled: true,
        },
      }));

      const deleteSubmitButton = cloneStructure('Submit Button');
      deleteSubmitButton.style = {
        overwrite: {
          backgroundColor: {
            type: 'STATIC',
            value: 'red',
          },
          boxShadow: 'none',
          color: {
            type: 'THEME_COLOR',
            value: 'white',
          },
          fontFamily: 'Roboto',
          fontSize: '0.875rem',
          fontStyle: 'none',
          fontWeight: '400',
          padding: ['0.6875rem', '1.375rem'],
          textDecoration: 'none',
          textTransform: 'none',
        },
      };
      setOption(deleteSubmitButton, 'buttonText', (opts: any) => ({
        ...opts,
        value: ['Delete'],
      }));

      deleteForm.descendants.push(deleteSubmitButton);

      deleteForm.descendants.push(
        makeBettyUpdateInput(
          BettyPrefabs.HIDDEN,
          model,
          idProperty,
          result.recordInputVariable,
        ),
      );

      if (idProperty) {
        const setCurrentDeleteRecord = {
          name: 'setCurrentRecord',
          sourceEvent: 'Click',
          targetOptionName: 'currentRecord',
          parameters: [
            {
              id: [idProperty.id],
              parameter: 'argument',
            },
          ],
          ref: {
            sourceComponentId: '#deleteButton',
            targetComponentId: '#deleteForm',
          },
          type: 'Global',
        };

        const setCurrentDetailRecord = {
          name: 'setCurrentRecord',
          sourceEvent: 'Click',
          targetOptionName: 'currentRecord',
          parameters: [
            {
              id: [idProperty.id],
              parameter: 'argument',
            },
          ],
          ref: {
            sourceComponentId: '#detailButton',
            targetComponentId: '#detailDatacontainer',
          },
          type: 'Global',
        };

        const setCurrentEditOnDetailsRecord = {
          name: 'setCurrentRecord',
          sourceEvent: 'Click',
          targetOptionName: 'currentRecord',
          parameters: [
            {
              id: [idProperty.id],
              parameter: 'argument',
            },
          ],
          ref: {
            sourceComponentId: '#detailButton',
            targetComponentId: '#editForm',
          },
          type: 'Global',
        };

        const setCurrentEditRecord = {
          name: 'setCurrentRecord',
          sourceEvent: 'Click',
          targetOptionName: 'currentRecord',
          parameters: [
            {
              id: [idProperty.id],
              parameter: 'argument',
            },
          ],
          ref: {
            sourceComponentId: '#editButton',
            targetComponentId: '#editForm',
          },
          type: 'Global',
        };

        newPrefab.interactions.push(setCurrentDeleteRecord);
        newPrefab.interactions.push(setCurrentDetailRecord);
        newPrefab.interactions.push(setCurrentEditOnDetailsRecord);
        newPrefab.interactions.push(setCurrentEditRecord);
      }
      save(newPrefab);
    },
    buttons: () => (
      <BoxComp direction="row" justify="between">
        <BoxComp direction="row" margin="2rem">
          <Buttoncomp
            label="Previous"
            size="large"
            background={{ color: '#f0f1f5' }}
            onClick={() => {
              if (stepNumber === 1) {
                return;
              }
              const newStepnumber = stepNumber - 1;
              setStepNumber(newStepnumber);
            }}
            margin={{ right: '5px' }}
            disabled={stepNumber === 1}
          />
          <Buttoncomp
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount}
            onClick={() => {
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </BoxComp>
        <BoxComp>
          <Footer
            onClose={close}
            onSave={stepper.onSave}
            canSave={stepNumber === stepper.stepAmount}
          />
        </BoxComp>
      </BoxComp>
    ),
    progressBar: () => {
      return (
        <BoxComp
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <TextComp size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</TextComp>
        </BoxComp>
      );
    },
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure CRUD with slide out" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default prefab(
  'CRUD with slide-out panel',
  attributes,
  beforeCreate,
  prefabStructure,
);
