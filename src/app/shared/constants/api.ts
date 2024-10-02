const GET = {
    user: { url: '/FEProfiler/user', method: 'GET' },
    userIDP: { url: '/FEProfiler/user-idp', method: 'GET' },
    isUserEnabled: { url: '/FEProfiler/isUserEnabled', method: 'GET' },
    getActivities: { url: '/FEProfiler/activities', method: 'GET' },
    getProfiles: { url: '/profile/get-FEP-profiles', method: 'GET' },
    session: { url: '/Shibboleth.sso/Session', method: 'GET' },
    getTerritories: { url: '/FEProfiler/territories', method: 'GET' },
    searchProfile: { url: '/profile', method: 'GET' },
    searchProfilesInternal: { url: '/profile/internal', method: 'GET' },
    searchProfilesInternalById: { url: '/profile/internal-userid', method: 'GET' },
    siteInfo: { url: '/site/:wcCode/:lang', method: 'GET' },
    deltaServices: { url: '/site/delta-services/:idSite/:lang', method: 'GET' },
    allServices: { url: '/sa-management/services', method: 'GET' },
    allAttributes: { url: '/sa-management/attributes', method: 'GET' },
    allCategories: { url: '/sa-management/categories', method: 'GET' },
    getFilteredSites: { url: '/site/get-filtered-site', method: 'GET' },
    getBuildingManagerUsername: { url: '/site/:idSite/get-building-manager', method: 'GET' },
    getRoleForUser: { url: '/administrator/get-role-for-user', method: 'GET' },
    getAvailableCountryForAdmin: { url: '/administrator/get-available-country-for-admin/:lang', method: 'GET' },
    getAvailableCityForAdmin: { url: '/administrator/get-available-city-for-admin', method: 'GET' },
    getAvailableSiteForAdmin: { url: '/administrator/get-available-site-for-admin', method: 'GET' },
    getAdminSiteList: { url: '/administrator/get-admin-site-list', method: 'GET' },
    getAdminCountryList: { url: '/administrator/get-admin-country-list', method: 'GET' },
    getIsStrenneUser: {url: '/strenne/is-strenne-user', method: 'GET'},
    getStrenneList: {url: '/strenne/get-strenne-list', method: 'GET'},
    getReceptionistMail: {url:'/strenne/get-receptionist-mail', method:'GET'},
    getFilteredStrenneList: {url:'/strenne/get-filtered-strenne', method:'GET'},
    getRecipientByName: {url:'/strenne/get-recipient-by-name', method:'GET'} , 
    getSenderByName: {url:'/strenne/get-sender-by-name', method:'GET'} , 
    getStrenneForUser: {url:'/strenne/get-user-strenne', method:'GET'},
    getFilteredStrenneAdmin: {url:'/strenne/get-filtered-strenne-admin', method:'GET'} , 
    getFilteredStrenneForUser : {url:'/strenne/get-filtered-user-strenne' , method : 'GET'},
    generateExcelForAdmin : {url:'/strenne/generate-excel-for-admin' , method : 'GET'},
    getDefaultProfile : {url:'/strenne/get-default-profile' , method : 'GET'},
    getSlotOfWeek: {url: '/strenne/get-slot-of-week', method: 'GET'} , 
    getAvailablePeriods: {url: '/strenne/get-available-periods', method: 'GET'} ,
    getCategoryByServiceId: {url: '/sa-management/get-category-by-service-id/:serviceId/:lang', method: 'GET'} , 
    searchProfilesExternalById: { url: '/profile/external-userid', method: 'GET' },
};

const POST = {
    saveService: { url: '/sa-management/save-service', method: 'POST' },
    saveAttribute: { url: '/sa-management/save-attribute', method: 'POST' },
    saveCategory: { url: '/sa-management/save-category', method: 'POST' },
    saveSiteService: { url: '/site/save-services', method: 'POST' },
    assignSiteBuildingManager: { url: '/site/:idSite/assign-building-manager/:userId', method: 'POST' },
    saveSiteAdmin: { url: '/administrator/create-site-administrator', method: 'POST' },
    saveCountryAdmin: { url: '/administrator/create-country-administrator', method: 'POST' } , 
    insertStrenna: {url:'/strenne/insert-strenna', method:'POST'} ,
    handleStrennaForUser: {url:'/strenne/handle-user-strenna', method:'POST'}
};

const PUT = {
    updateService: { url: '/sa-management/update-service', method: 'PUT' },
    updateAttribute: { url: '/sa-management/update-attribute', method: 'PUT' },
    updateCategory: { url: '/sa-management/update-category', method: 'PUT' },
    updateSiteService: { url: '/site/update-services', method: 'PUT'},
    updateSiteBuildingManager: { url: '/site/:idSite/update-building-manager/:userId', method: 'PUT'},
    updateStrenna: {url:'/strenne/update-strenna', method:'PUT'},
    generateRemainderStrenna: {url:'/strenne/generate-remainder-by-strennaid', method: 'PUT'},
    refuseStrennaByIdForAdming: {url:'/strenne/refuse-strenna-by-strennaid-for-admin', method: 'PUT'}
};

const DELETE = {
    deleteSiteService: {url: '/site/:idSite/delete-service/:idService', method: 'DELETE'},
    deleteSiteBuildingManager: {url: '/site/:idSite/delete-building-manager', method: 'DELETE'},
    deleteService: { url: '/sa-management/delete-service/:serviceId', method: 'DELETE' },
    deleteAttribute: { url: '/sa-management/delete-attribute/:attributeId', method: 'DELETE' },
    deleteCategory: {url:'/sa-management/delete-category/:categoryId', method:'DELETE'} ,
    deleteSiteAdmin: { url: '/administrator/delete-site-administrator', method: 'DELETE' },
    deleteCountryAdmin: { url: '/administrator/delete-country-administrator', method: 'DELETE' },
    deleteStrenna: {url:'/strenne/delete-strenna/:strennaId', method:'DELETE'}
    
};

const PATCH = {

};

export {
    GET,
    POST,
    PUT,
    DELETE,
    PATCH
};