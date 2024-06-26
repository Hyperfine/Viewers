import React from 'react';
//import { WrappedPanelStudyBrowser } from './Panels';
import i18n from 'i18next';
import StudyFindings from './Panels/StudyFindings';

// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({ commandsManager, extensionManager, servicesManager }) {
  const wrappedMeasurementPanel = () => {
    return <StudyFindings />;
  };

  return [
    // {
    //   name: 'seriesList',
    //   iconName: 'tab-studies',
    //   iconLabel: 'Studies',
    //   label: i18n.t('SidePanel:Studies'),
    //   component: WrappedPanelStudyBrowser.bind(null, {
    //     commandsManager,
    //     extensionManager,
    //     servicesManager,
    //   }),
    // },
    {
      name: 'demographics',
      iconName: 'clipboard',
      iconLabel: 'clipboard',
      label: i18n.t('SidePanel:Findings'),
      secondaryLabel: i18n.t('SidePanel:Findings'),
      component: wrappedMeasurementPanel,
    },
  ];
}

export default getPanelModule;
