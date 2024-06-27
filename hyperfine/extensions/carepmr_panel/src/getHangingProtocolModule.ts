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
    mrDisplaySet: {
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
        // {
        //   weight: 1,
        //   attribute: 'isReconstructable',
        //   constraint: {
        //     equals: {
        //       value: true,
        //     },
        //   },
        //   required: true,
        // },
      ],
    },
    // ptDisplaySet: {
    //   seriesMatchingRules: [
    //     {
    //       attribute: 'Modality',
    //       constraint: {
    //         equals: 'MR',
    //       },
    //       required: true,
    //     },
    //     {
    //       weight: 1,
    //       attribute: 'isReconstructable',
    //       constraint: {
    //         equals: {
    //           value: true,
    //         },
    //       },
    //       required: true,
    //     },
    //     {
    //       attribute: 'SeriesDescription',
    //       constraint: {
    //         contains: 'Corrected',
    //       },
    //     },
    //   ],
    // },
  },
  stages: [
    {
      id: 'hYbmMy3b7pz7GLiaT',
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
              id: 'mrDisplaySet',
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
              id: 'mrDisplaySet',
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
              id: 'mrDisplaySet',
            },
          ],
        },
        // {
        //   viewportOptions: {
        //     viewportId: 'ptAXIAL',
        //     viewportType: 'volume',
        //     orientation: 'sagittal',
        //     initialImageOptions: {
        //       preset: 'middle',
        //     },
        //   },
        //   displaySets: [
        //     {
        //       id: 'ptDisplaySet',
        //     },
        //   ],
        // },
        // {
        //   viewportOptions: {
        //     viewportId: 'fusionSAGITTAL',
        //     viewportType: 'volume',
        //     orientation: 'sagittal',
        //     initialImageOptions: {
        //       preset: 'middle',
        //     },
        //     syncGroups: [
        //       {
        //         type: 'voi',
        //         id: 'ctWLSync',
        //         source: false,
        //         target: true,
        //       },
        //     ],
        //   },
        //   displaySets: [
        //     {
        //       id: 'ctDisplaySet',
        //     },
        //     {
        //       options: {
        //         colormap: 'hsv',
        //         voi: {
        //           windowWidth: 5,
        //           windowCenter: 2.5,
        //         },
        //       },
        //       id: 'ptDisplaySet',
        //     },
        //   ],
        // },
      ],
      createdDate: '2021-02-23T18:32:42.850Z',
    },
  ],
  numberOfPriorsReferenced: -1,
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
