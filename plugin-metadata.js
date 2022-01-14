import ScopeListPage from './components/Scopes/ScopeListPage'
import ScopeAddPage from './components/Scopes/ScopeAddPage'
import ScopeEditPage from './components/Scopes/ScopeEditPage'

import ClientListPage from './components/Clients/ClientListPage'
import ClientAddPage from './components/Clients/ClientAddPage'
import ClientEditPage from './components/Clients/ClientEditPage'

import PropertiesPage from './components/Configuration/ConfigPage'
import KeysPage from './components/Configuration/Keys/KeysPage'
import DefaultPage from './components/Configuration/Defaults/DefaultConfigPage'
import LoggingPage from './components/Configuration/Defaults/LoggingPage'

import HealthPage from './components/Health/HealthPage'
import ReportPage from './components/Reports/ReportPage'

import oidcReducer from './redux/reducers/OIDCReducer'
import scopeReducer from './redux/reducers/ScopeReducer'
import jsonReducer from './redux/reducers/JsonConfigReducer'
import jwksReducer from './redux/reducers/JwksReducer'
import acrReducer from './redux/reducers/AcrReducer'
import loggingReducer from './redux/reducers/LoggingReducer'
import healthReducer from './redux/reducers/HealthReducer'

import scopesSaga from './redux/sagas/OAuthScopeSaga'
import oidcSaga from './redux/sagas/OIDCSaga'
import jsonSaga from './redux/sagas/JsonConfigSaga'
import jwksSaga from './redux/sagas/JwksSaga'
import acrSaga from './redux/sagas/AcrsSaga'
import loggingSaga from './redux/sagas/LoggingSaga'
import healthSaga from './redux/sagas/HealthSaga'
import {
  ACR_READ,
  CLIENT_READ,
  SCOPE_READ,
  CLIENT_WRITE,
  SCOPE_WRITE,
  JWKS_READ,
} from '../../app/utils/PermChecker'

const PLUGIN_BASE_APTH = '/auth-server'

const pluginMetadata = {
  menus: [
    {
      title: 'menus.oauthserver',
      icon: 'fa-server',
      children: [
        {
          title: 'menus.configuration',
          children: [
            {
              title: 'menus.keys',
              path: PLUGIN_BASE_APTH + '/config/keys',
              permission: JWKS_READ,
            },
            {
              title: 'menus.defaults',
              path: PLUGIN_BASE_APTH + '/config/defaults',
              permission: ACR_READ,
            },
            {
              title: 'menus.properties',
              path: PLUGIN_BASE_APTH + '/config/properties',
              permission: ACR_READ,
            },
            {
              title: 'menus.logging',
              path: PLUGIN_BASE_APTH + '/config/logging',
              permission: ACR_READ,
            },
          ],
        },
        {
          title: 'menus.clients',
          path: PLUGIN_BASE_APTH + '/clients',
          permission: CLIENT_READ,
        },
        {
          title: 'menus.health',
          path: PLUGIN_BASE_APTH + '/health',
          permission: ACR_READ,
        },
        {
          title: 'menus.scopes',
          path: PLUGIN_BASE_APTH + '/scopes',
          permission: SCOPE_READ,
        },
      ],
    },
  ],
  routes: [
    {
      component: ClientListPage,
      path: PLUGIN_BASE_APTH + '/clients',
      permission: CLIENT_READ,
    },
    {
      component: ClientAddPage,
      path: PLUGIN_BASE_APTH + '/client/new',
      permission: CLIENT_WRITE,
    },
    {
      component: ClientEditPage,
      path: PLUGIN_BASE_APTH + '/client/edit:id',
      permission: CLIENT_WRITE,
    },
    {
      component: ScopeListPage,
      path: PLUGIN_BASE_APTH + '/scopes',
      permission: SCOPE_READ,
    },
    {
      component: ScopeAddPage,
      path: PLUGIN_BASE_APTH + '/scope/new',
      permission: SCOPE_WRITE,
    },
    {
      component: ScopeEditPage,
      path: PLUGIN_BASE_APTH + '/scope/edit:id',
      permission: SCOPE_WRITE,
    },
    {
      component: PropertiesPage,
      path: PLUGIN_BASE_APTH + '/config/properties',
      permission: ACR_READ,
    },
    {
      component: KeysPage,
      path: PLUGIN_BASE_APTH + '/config/keys',
      permission: JWKS_READ,
    },
    {
      component: DefaultPage,
      path: PLUGIN_BASE_APTH + '/config/defaults',
      permission: ACR_READ,
    },
    {
      component: LoggingPage,
      path: PLUGIN_BASE_APTH + '/config/logging',
      permission: ACR_READ,
    },
    {
      component: HealthPage,
      path: PLUGIN_BASE_APTH + '/health',
      permission: ACR_READ,
    },
    {
      component: ReportPage,
      path: PLUGIN_BASE_APTH + '/reports',
      permission: ACR_READ,
    },
  ],
  reducers: [
    { name: 'scopeReducer', reducer: scopeReducer },
    { name: 'oidcReducer', reducer: oidcReducer },
    { name: 'authPropertiesReducer', reducer: jsonReducer },
    { name: 'jwksReducer', reducer: jwksReducer },
    { name: 'acrReducer', reducer: acrReducer },
    { name: 'loggingReducer', reducer: loggingReducer },
    { name: 'healthReducer', reducer: healthReducer },
  ],
  sagas: [
    scopesSaga(),
    oidcSaga(),
    jsonSaga(),
    jwksSaga(),
    acrSaga(),
    loggingSaga(),
    healthSaga(),
  ],
}

export default pluginMetadata
