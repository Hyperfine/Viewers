/** @type {AppTypes.Config} */
window.config = {
  routerBasename: '/',
  showStudyList: true,
  extensions: [],
  modes: ['carepmr', '@ohif/mode-test'],
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement(
        'h5',
        {},
        'CarePMR',
        React.createElement('img', {
          src: './assets/hyperfine-icon.svg',
          // className: 'w-8 h-8',
        })
      );
    },
  },
  // below flag is for performance reasons, but it might not work for all servers

  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  defaultDataSourceName: 'dicomweb',
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'Orthanc Server',
        name: 'Orthanc',
        wadoUriRoot: 'http://127.0.0.1/pacs/dicom-web',
        qidoRoot: 'http://127.0.0.1/pacs/dicom-web',
        wadoRoot: 'http://127.0.0.1/pacs/dicom-web',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: true,
        dicomUploadEnabled: true,
        bulkDataURI: {
          enabled: true,
        },
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomlocal',
      sourceName: 'dicomlocal',
      configuration: {
        friendlyName: 'dicom local',
      },
    },
  ],
  customizationService: {
    cornerstoneOverlayTopLeft: {
      id: 'cornerstoneOverlayTopLeft',
      items: [
        {
          id: 'WindowLevel',
          customizationType: 'ohif.overlayItem.windowLevel',
        },
        {
          id: 'PatientName',
          customizationType: 'ohif.overlayItem',
          label: '',
          color: 'green',
          background: 'white',
          condition: ({ instance }) =>
            instance && instance.PatientName && instance.PatientName.Alphabetic,
          contentF: ({ instance, formatters: { formatPN } }) =>
            formatPN(instance.PatientName.Alphabetic) +
            ' ' +
            (instance.PatientSex ? '(' + instance.PatientSex + ')' : ''),
        },
        {
          id: 'Species',
          customizationType: 'ohif.overlayItem',
          label: 'Species:',
          condition: ({ instance }) => instance && instance.PatientSpeciesDescription,
          contentF: ({ instance }) =>
            instance.PatientSpeciesDescription + '/' + instance.PatientBreedDescription,
        },
        {
          id: 'PID',
          customizationType: 'ohif.overlayItem',
          label: 'PID:',
          title: 'Patient PID',
          condition: ({ instance }) => instance && instance.PatientID,
          contentF: ({ instance }) => instance.PatientID,
        },
        {
          id: 'PatientBirthDate',
          customizationType: 'ohif.overlayItem',
          label: 'DOB:',
          title: "Patient's Date of birth",
          condition: ({ instance }) => instance && instance.PatientBirthDate,
          contentF: ({ instance }) => instance.PatientBirthDate,
        },
        {
          id: 'OtherPid',
          customizationType: 'ohif.overlayItem',
          label: 'Other PID:',
          title: 'Other Patient IDs',
          condition: ({ instance }) => instance && instance.OtherPatientIDs,
          contentF: ({ instance, formatters: { formatPN } }) => formatPN(instance.OtherPatientIDs),
        },
      ],
    },
    cornerstoneOverlayTopRight: {
      id: 'cornerstoneOverlayTopRight',

      items: [
        {
          id: 'InstanceNmber',
          customizationType: 'ohif.overlayItem.instanceNumber',
        },
        {
          id: 'StudyDescription',
          customizationType: 'ohif.overlayItem',
          label: '',
          title: ({ instance }) =>
            instance &&
            instance.StudyDescription &&
            `Study Description: ${instance.StudyDescription}`,
          condition: ({ instance }) => instance && instance.StudyDescription,
          contentF: ({ instance }) => instance.StudyDescription,
        },
        {
          id: 'StudyDate',
          customizationType: 'ohif.overlayItem',
          label: '',
          title: 'Study date',
          condition: ({ instance }) => instance && instance.StudyDate,
          contentF: ({ instance, formatters: { formatDate } }) => formatDate(instance.StudyDate),
        },
        {
          id: 'StudyTime',
          customizationType: 'ohif.overlayItem',
          label: '',
          title: 'Study time',
          condition: ({ instance }) => instance && instance.StudyTime,
          contentF: ({ instance, formatters: { formatTime } }) => formatTime(instance.StudyTime),
        },
      ],
    },
    cornerstoneOverlayBottomLeft: {
      id: 'cornerstoneOverlayBottomLeft',

      items: [
        {
          id: 'SeriesNumber',
          customizationType: 'ohif.overlayItem',
          label: 'Ser:',
          title: 'Series #',
          condition: ({ instance }) => instance && instance.SeriesNumber,
          contentF: ({ instance }) => instance.SeriesNumber,
        },
        {
          id: 'SliceLocation',
          customizationType: 'ohif.overlayItem',
          label: 'Loc:',
          title: 'Slice Location',
          condition: ({ instance }) => instance && instance.SliceLocation,
          contentF: ({ instance, formatters: { formatNumberPrecision } }) =>
            formatNumberPrecision(instance.SliceLocation, 2) + ' mm',
        },
        {
          id: 'SliceThickness',
          customizationType: 'ohif.overlayItem',
          label: 'Thick:',
          title: 'Slice Thickness',
          condition: ({ instance }) => instance && instance.SliceThickness,
          contentF: ({ instance, formatters: { formatNumberPrecision } }) =>
            formatNumberPrecision(instance.SliceThickness, 2) + ' mm',
        },
      ],
    },
  },
};
