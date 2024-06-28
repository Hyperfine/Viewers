import { Types } from '@ohif/core';
//import { PanelMeasurementTableTracking, PanelStudyBrowserTracking } from './panels';
import i18n from 'i18next';
import { id } from './id';
import { HangingProtocolService } from '@ohif/core/src/services';
import getHangingProtocolModule from './HangingProtocols/getHangingProtocolModule';
import registerHangingProtocolAttributes from './HangingProtocols/registerHangingProtocolAttributes';
import React from 'react';
import getPanelModule from './getPanelModule';
//import preRegistration from './init';
/*
export default function init({
  servicesManager,
  configuration = {},
  commandsManager,
}: withAppTypes): void {
  const { stateSyncService, toolbarService, cineService, viewportGridService } =
    servicesManager.services;

  registerHangingProtocolAttributes({ servicesManager });
}

*/
//import getToolbarModule from './getToolbarModule';
/**
 * You can remove any of the following modules if you don't need them.
 */
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id,

  /**
   * Perform any pre-registration tasks here. This is called before the extension
   * is registered. Usually we run tasks such as: configuring the libraries
   * (e.g. cornerstone, cornerstoneTools, ...) or registering any services that
   * this extension is providing.
   */
  /**
   * Register the Cornerstone 3D services and set them up for use.
   *
   * @param configuration.csToolsConfig - Passed directly to `initCornerstoneTools`
   */
  preRegistration: function (props: Types.Extensions.ExtensionParams): Promise<void> {
    const { servicesManager, serviceProvidersManager } = props;
    //servicesManager.registerService(CornerstoneViewportService.REGISTRATION);

    // serviceProvidersManager.registerProvider(
    //   ViewportActionCornersService.REGISTRATION.name,
    //   ViewportActionCornersProvider
    // );
    console.log('Here in preRegistration');
    const hp = HangingProtocolService;
    console.log(servicesManager);
    //return init.call(this, props);
    //return init(serviceProvidersManager);
    // TODO: This seems to be the core of the problem. It's not initializing
    registerHangingProtocolAttributes(servicesManager);
  },
  /**
   * PanelModule should provide a list of panels that will be available in OHIF
   * for Modes to consume and render. Each panel is defined by a {name,
   * iconName, iconLabel, label, component} object. Example of a panel module
   * is the StudyBrowserPanel that is provided by the default extension in OHIF.
   */
  getPanelModule,
  //   return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
  // },
  /**
   * ViewportModule should provide a list of viewports that will be available in OHIF
   * for Modes to consume and use in the viewports. Each viewport is defined by
   * {name, component} object. Example of a viewport module is the CornerstoneViewport
   * that is provided by the Cornerstone extension in OHIF.
   */
  getViewportModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  /**
   * ToolbarModule should provide a list of tool buttons that will be available in OHIF
   * for Modes to consume and use in the toolbar. Each tool button is defined by
   * {name, defaultComponent, clickHandler }. Examples include radioGroupIcons and
   * splitButton toolButton that the default extension is providing.
   */
  //getToolbarModule, // This is a no-op - set in mode.
  getToolbarModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  /**
   * LayoutTemplateMOdule should provide a list of layout templates that will be
   * available in OHIF for Modes to consume and use to layout the viewer.
   * Each layout template is defined by a { name, id, component}. Examples include
   * the default layout template provided by the default extension which renders
   * a Header, left and right sidebars, and a viewport section in the middle
   * of the viewer.
   */
  getLayoutTemplateModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  /**
   * HangingProtocolModule should provide a list of hanging protocols that will be
   * available in OHIF for Modes to use to decide on the structure of the viewports
   * and also the series that hung in the viewports. Each hanging protocol is defined by
   * { name, protocols}. Examples include the default hanging protocol provided by
   * the default extension that shows 2x2 viewports.
   */
  //getHangingProtocolModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getHangingProtocolModule,
  /**
   * CommandsModule should provide a list of commands that will be available in OHIF
   * for Modes to consume and use in the viewports. Each command is defined by
   * an object of { actions, definitions, defaultContext } where actions is an
   * object of functions, definitions is an object of available commands, their
   * options, and defaultContext is the default context for the command to run against.
   */
  getCommandsModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  /**
   * ContextModule should provide a list of context that will be available in OHIF
   * and will be provided to the Modes. A context is a state that is shared OHIF.
   * Context is defined by an object of { name, context, provider }. Examples include
   * the measurementTracking context provided by the measurementTracking extension.
   */
  getContextModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  /**
   * DataSourceModule should provide a list of data sources to be used in OHIF.
   * DataSources can be used to map the external data formats to the OHIF's
   * native format. DataSources are defined by an object of { name, type, createDataSource }.
   */
  getDataSourcesModule: ({ servicesManager, commandsManager, extensionManager }) => {},
};
