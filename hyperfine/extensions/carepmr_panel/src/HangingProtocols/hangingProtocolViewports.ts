const mrAXIAL_FLAIR = {
  viewportOptions: {
    viewportId: 'mrAxial_FLAIR',
    viewportType: 'volume',
    toolGroupId: 'default',
    orientation: 'axial',
    displaySets: [
      {
        id: 'flairDisplaySet',
      },
    ],
  },
};

const mrAXIAL_T1 = {
  viewportOptions: {
    viewportId: 'mrAxial_T1',
    viewportType: 'volume',
    toolGroupId: 'default',
    orientation: 'axial',
  },
  displaySets: [
    {
      id: 't1Displayset',
    },
  ],
};
const mrAXIAL_T2 = {
  viewportOptions: {
    viewportId: 'mrAxial_T2',
    viewportType: 'volume',
    toolGroupId: 'default',
    orientation: 'axial',
  },
  displaySets: [
    {
      id: 't2Displayset',
    },
  ],
};
const mrSAGITTAL_T1 = {
  viewportOptions: {
    viewportId: 'mrSaggital_T1',
    viewportType: 'volume',
    toolGroupId: 'default',
    orientation: 'sagittal',
  },
  displaySets: [
    {
      id: 't1sagDisplayset',
    },
  ],
};

export { mrAXIAL_FLAIR, mrAXIAL_T1, mrAXIAL_T2, mrSAGITTAL_T1 };
