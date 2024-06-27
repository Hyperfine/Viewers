import {
  // mrAXIAL_FLAIR,
  // mrAXIAL_T1,
  // mrAXIAL_T2,
  // mrSAGITTAL_T1,
  t1_mrAXIAL_FLAIR,
  t1_mrAXIAL_T1,
  t2_mrAXIAL_FLAIR,
  t2_mrAXIAL_T1,
  t3_mrAXIAL_FLAIR,
  t3_mrAXIAL_T1,
} from './HangingProtocols/hangingProtocolViewports';
import React from 'react';

/**
 * 2x2 Layout.
 */
const two_by_three = {
  name: 'default',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 3,
    },
  },
  viewports: [
    t1_mrAXIAL_FLAIR,
    t2_mrAXIAL_FLAIR,
    t3_mrAXIAL_FLAIR,
    t1_mrAXIAL_T1,
    t2_mrAXIAL_T1,
    t3_mrAXIAL_T1,
  ],
};

const actionPMR = {
  id: 'actionPMR',
  locked: true,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2022-10-04T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  toolGroupIds: ['default'],
  imageLoadStrategy: 'interleaveTopToBottom', // "default" , "interleaveTopToBottom",  "interleaveCenter"
  protocolMatchingRules: [
    {
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: ['MR'],
      },
    },
  ],
  displaySetSelectors: {
    t1_flairDisplaySet: {
      seriesMatchingRules: [
        {
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
          attribute: 'timepoint',
          constraint: {
            contains: 'timepoint1',
          },
        },
      ],
    },

    t2_flairDisplaySet: {
      seriesMatchingRules: [
        {
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
        // {
        //   attribute: 'timepoint',
        //   constraint: {
        //     contains: 'timepoint2',
        //   },
        // },
      ],
    },
    t3_flairDisplaySet: {
      seriesMatchingRules: [
        {
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
        // {
        //   attribute: 'timepoint',
        //   constraint: {
        //     contains: 'timepoint3',
        //   },
        // },
      ],
    },

    t1_t1DisplaySet: {
      seriesMatchingRules: [
        {
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
        // {
        //   attribute: 'timepoint',
        //   constraint: {
        //     contains: 'timepoint1',
        //   },
        // },
      ],
    },

    t2_t1DisplaySet: {
      seriesMatchingRules: [
        {
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
        // {
        //   attribute: 'timepoint',
        //   constraint: {
        //     contains: 'timepoint2',
        //   },
        // },
      ],
    },

    t3_t1DisplaySet: {
      seriesMatchingRules: [
        {
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
        // {
        //   attribute: 'timepoint',
        //   constraint: {
        //     contains: 'timepoint3',
        //   },
        // },
      ],
    },
  },

  //stages: [stage1, stage2, stage3, stage4],
  stages: [two_by_three],
  numberOfPriorsReferenced: 2,
};

function getHangingProtocolModule() {
  return [
    {
      name: actionPMR.id,
      protocol: actionPMR,
    },
  ];
}

export default getHangingProtocolModule;
