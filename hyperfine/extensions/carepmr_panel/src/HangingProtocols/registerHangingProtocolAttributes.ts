import TimepointID from './TimepointID';

function registerHangingProtocolAttributes(servicesManager) {
  //const { hangingProtocolService } = servicesManager.services.HangingProtocolService;
  const hangingProtocolService = servicesManager.services.HangingProtocolService;
  //hangingProtocolService.addCustomAttribute('ViewCode', 'View Code Designator:Value', viewCode);
  hangingProtocolService.addCustomAttribute('ClinicalTrialTimePointID', 'timepoint', TimepointID);
}
export default registerHangingProtocolAttributes;
