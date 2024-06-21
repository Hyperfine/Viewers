import {
  mrAXIAL_FLAIR,
  mrAXIAL_T1,
  mrAXIAL_T2,
  mrSAGITTAL_T1,
} from './HangingProtocols/hangingProtocolViewports';
import React from 'react';

/**
 * 2x2 Layout.
 */
const stage2 = {
  name: 'default',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 2,
    },
  },
  viewports: [mrAXIAL_T1, mrAXIAL_T2, mrSAGITTAL_T1, mrAXIAL_FLAIR],
};

const actionPMR = {
  id: 'actionPMR',
  locked: true,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2022-10-04T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
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
    flairDisplaySet: {
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
      ],
    },
    t1Displayset: {
      seriesMatchingRules: [
        {
          attribute: 'Modality',
          constraint: {
            equals: 'MR',
          },
          required: true,
        },

        {
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'T1',
          },
          required: true,
        },
      ],
    },
    t2Displayset: {
      seriesMatchingRules: [
        {
          attribute: 'Modality',
          constraint: {
            equals: 'MR',
          },
          required: true,
        },

        {
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'T2',
          },
          required: true,
        },
      ],
    },
    t1sagDisplayset: {
      seriesMatchingRules: [
        {
          attribute: 'Modality',
          constraint: {
            equals: 'MR',
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
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'SAG',
          },
        },
      ],
    },
  },

  //stages: [stage1, stage2, stage3, stage4],
  stages: [stage2],
  numberOfPriorsReferenced: -1,
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
