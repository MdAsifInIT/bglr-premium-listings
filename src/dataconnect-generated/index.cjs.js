const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'bglr-premium-listings',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createUserRef(dcInstance, inputVars));
}
;

const createPropertyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProperty', inputVars);
}
createPropertyRef.operationName = 'CreateProperty';
exports.createPropertyRef = createPropertyRef;

exports.createProperty = function createProperty(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPropertyRef(dcInstance, inputVars));
}
;

const updatePropertyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProperty', inputVars);
}
updatePropertyRef.operationName = 'UpdateProperty';
exports.updatePropertyRef = updatePropertyRef;

exports.updateProperty = function updateProperty(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updatePropertyRef(dcInstance, inputVars));
}
;

const approvePropertyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ApproveProperty', inputVars);
}
approvePropertyRef.operationName = 'ApproveProperty';
exports.approvePropertyRef = approvePropertyRef;

exports.approveProperty = function approveProperty(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(approvePropertyRef(dcInstance, inputVars));
}
;

const deletePropertyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProperty', inputVars);
}
deletePropertyRef.operationName = 'DeleteProperty';
exports.deletePropertyRef = deletePropertyRef;

exports.deleteProperty = function deleteProperty(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePropertyRef(dcInstance, inputVars));
}
;

const updatePropertyStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePropertyStatus', inputVars);
}
updatePropertyStatusRef.operationName = 'UpdatePropertyStatus';
exports.updatePropertyStatusRef = updatePropertyStatusRef;

exports.updatePropertyStatus = function updatePropertyStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updatePropertyStatusRef(dcInstance, inputVars));
}
;

const createFavoriteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFavorite', inputVars);
}
createFavoriteRef.operationName = 'CreateFavorite';
exports.createFavoriteRef = createFavoriteRef;

exports.createFavorite = function createFavorite(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createFavoriteRef(dcInstance, inputVars));
}
;

const deleteFavoriteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFavorite', inputVars);
}
deleteFavoriteRef.operationName = 'DeleteFavorite';
exports.deleteFavoriteRef = deleteFavoriteRef;

exports.deleteFavorite = function deleteFavorite(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteFavoriteRef(dcInstance, inputVars));
}
;

const createSavedSearchRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSavedSearch', inputVars);
}
createSavedSearchRef.operationName = 'CreateSavedSearch';
exports.createSavedSearchRef = createSavedSearchRef;

exports.createSavedSearch = function createSavedSearch(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSavedSearchRef(dcInstance, inputVars));
}
;

const createLeadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLead', inputVars);
}
createLeadRef.operationName = 'CreateLead';
exports.createLeadRef = createLeadRef;

exports.createLead = function createLead(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createLeadRef(dcInstance, inputVars));
}
;

const rejectPropertyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RejectProperty', inputVars);
}
rejectPropertyRef.operationName = 'RejectProperty';
exports.rejectPropertyRef = rejectPropertyRef;

exports.rejectProperty = function rejectProperty(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(rejectPropertyRef(dcInstance, inputVars));
}
;

const listApprovedPropertiesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListApprovedProperties', inputVars);
}
listApprovedPropertiesRef.operationName = 'ListApprovedProperties';
exports.listApprovedPropertiesRef = listApprovedPropertiesRef;

exports.listApprovedProperties = function listApprovedProperties(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listApprovedPropertiesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getPropertyByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPropertyById', inputVars);
}
getPropertyByIdRef.operationName = 'GetPropertyById';
exports.getPropertyByIdRef = getPropertyByIdRef;

exports.getPropertyById = function getPropertyById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPropertyByIdRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listPendingPropertiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPendingProperties');
}
listPendingPropertiesRef.operationName = 'ListPendingProperties';
exports.listPendingPropertiesRef = listPendingPropertiesRef;

exports.listPendingProperties = function listPendingProperties(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listPendingPropertiesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listUserPropertiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserProperties');
}
listUserPropertiesRef.operationName = 'ListUserProperties';
exports.listUserPropertiesRef = listUserPropertiesRef;

exports.listUserProperties = function listUserProperties(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listUserPropertiesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listUserFavoritesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserFavorites');
}
listUserFavoritesRef.operationName = 'ListUserFavorites';
exports.listUserFavoritesRef = listUserFavoritesRef;

exports.listUserFavorites = function listUserFavorites(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listUserFavoritesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listUserSavedSearchesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserSavedSearches');
}
listUserSavedSearchesRef.operationName = 'ListUserSavedSearches';
exports.listUserSavedSearchesRef = listUserSavedSearchesRef;

exports.listUserSavedSearches = function listUserSavedSearches(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listUserSavedSearchesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
