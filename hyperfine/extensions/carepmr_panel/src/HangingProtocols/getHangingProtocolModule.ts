import { Types } from '@ohif/core';

const oneByThreeProtocol: Types.HangingProtocol.Protocol = {
  id: 'carepmr_hp',
  description: 'Prototype carepmr',
  locked: true,
  name: 'carepmr_hp',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2022-10-04T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  imageLoadStrategy: 'interleaveTopToBottom',
  toolGroupIds: ['default'],
  protocolMatchingRules: [
    {
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: ['MR'],
      },
    },
  ],
  displaySetSelectors: {
    flair_Displayset: {
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'Modality',
          constraint: {
            equals: {
              value: 'MR',
            },
          },
          required: true,
        },
        {
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'FLAIR',
          },
        },
        {
          attribute: 'ClinicalTrialTimePointID',
          constraint: {
            equals: 'timepoint1',
          },
        },
      ],
    },
    t1_Displayset: {
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'Modality',
          constraint: {
            equals: {
              value: 'MR',
            },
          },
          required: true,
        },
        {
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'T1',
          },
        },
        {
          attribute: 'ClinicalTrialTimePointID',
          constraint: {
            equals: 'timepoint2',
          },
          required: false,
        },
      ],
    },
    t2_Displayset: {
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'Modality',
          constraint: {
            equals: {
              value: 'MR',
            },
          },
          required: true,
        },
        {
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'T2',
          },
        },
        {
          attribute: 'ClinicalTrialTimePointID',
          constraint: {
            equals: 'timepoint3',
          },
          required: true,
        },
      ],
    },
  },
  stages: [
    {
      id: 'three_studies',
      name: 'default',
      viewportStructure: {
        layoutType: 'grid',
        properties: {
          rows: 1,
          columns: 3,
        },
      },
      viewports: [
        {
          viewportOptions: {
            viewportId: 'mr1',
            viewportType: 'volume',
            orientation: 'axial',
            initialImageOptions: {
              preset: 'middle',
            },
            syncGroups: [
              {
                type: 'voi',
                id: 'ctWLSync',
                source: true,
                target: true,
              },
            ],
          },
          displaySets: [
            {
              id: 'flair_Displayset',
            },
          ],
        },
        {
          viewportOptions: {
            viewportId: 'mr2',
            viewportType: 'volume',
            orientation: 'axial',
            initialImageOptions: {
              preset: 'middle',
            },
            syncGroups: [
              {
                type: 'voi',
                id: 'ctWLSync',
                source: true,
                target: true,
              },
            ],
          },
          displaySets: [
            {
              id: 't1_Displayset',
            },
          ],
        },
        {
          viewportOptions: {
            viewportId: 'mr3',
            viewportType: 'volume',
            orientation: 'axial',
            initialImageOptions: {
              preset: 'middle',
            },
            syncGroups: [
              {
                type: 'voi',
                id: 'ctWLSync',
                source: true,
                target: true,
              },
            ],
          },
          displaySets: [
            {
              id: 't2_Displayset',
            },
          ],
        },
      ],
      createdDate: '2021-02-23T18:32:42.850Z',
    },
  ],
  numberOfPriorsReferenced: 2,
};

function getHangingProtocolModule() {
  return [
    {
      id: oneByThreeProtocol.id,
      name: oneByThreeProtocol.name,
      protocol: oneByThreeProtocol,
    },
  ];
}

export default getHangingProtocolModule;
