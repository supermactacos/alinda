## IDX API Overview
End-user documentation for the IDX RESTful API.

Available methods: {
  listcomponents: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'List all API components office by the IDX API.'
  },
  listmethods: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'List all the methods in this component including supported actions,\n' +
      '                              method status (in development, active, deprecated, and sunset), and a description.'
  },
  agents: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'View the agents that are on a multiuser account.',
    availableReturnFields: [
      'agentCategory',    'agentFirstName',
      'agentLastName',    'agentDisplayName',
      'agentEmail',       'agentTitle',
      'address',          'city',
      'stateProvince',    'country',
      'zipCode',          'agentHomePhone',
      'agentHomeFax',     'agentOfficePhone',
      'agentOfficeFax',   'agentCellPhone',
      'agentPager',       'agentPhotoURL',
      'agentURL',         'agentURLdisplay',
      'lastLoginDate',    'accountCreated',
      'redirectToSite',   'linkOnRoster',
      'displayOnRoster',  'bioDetails',
      'featuredInWidget', 'propUpdateSignature',
      'agentBioURL',      'agentContactPhone',
      'agentID',          'listingAgentID'
    ]
  },
  offices: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'View the office that are on a multiuser account.',
    availableReturnFields: [
      'id',                   'accountID',
      'officeName',           'officeCode',
      'officeEmail',          'address',
      'city',                 'stateProvince',
      'country',              'zipCode',
      'accountCreated',       'lastUpdate',
      'officePhone',          'officeFax',
      'officeAddlContact',    'officePhotoURL',
      'officeDescription',    'position',
      'officeWrapperSetting', 'displayOnRoster',
      'officeURL'
    ]
  },
  systemlinks: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'All the pages system pages (search, featured, contact, etc)\n' +
      '                                        that can be directly linked to without additional property\n' +
      '                                        information being included in the URL.',
    availableReturnFields: [ 'uid', 'name', 'url', 'category', 'systemresults', 'subpages' ]
  },
  savedlinks: {
    supported: { GET: true, POST: true, PUT: true, DELETE: true },
    status: 'active',
    description: 'View, add, update, or delete saved links on the client account.',
    availableReturnFields: [
      'linkName',    'linkTitle',
      'queryString', 'timesViewed',
      'featured',    'created',
      'category',    'url',
      'uid',         'addedViaApi'
    ]
  },
  widgetsrc: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'deprecated',
    description: 'Replaced by the method "widgets-legacy".',
    availableReturnFields: [ 'uid', 'name', 'url' ]
  },
  featured: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'A list of all active featured properties belonging to the client.',
    availableReturnFields: [
      'address',        'streetName',
      'streetNumber',   'streetDirection',
      'unitNumber',     'cityName',
      'countyName',     'state',
      'zipcode',        'zip4',
      'listingPrice',   'listingID',
      'remarksConcat',  'rntLse',
      'rntLsePrice',    'rntLsePriceOffSeason',
      'propStatus',     'bedrooms',
      'totalBaths',     'fullBaths',
      'partialBaths',   'latitude',
      'longitude',      'acres',
      'sqFt',           'displayAddress',
      'listingAgentID', 'listingOfficeID',
      'mlsPtID',        'mlsPhotoCount',
      'parentPtID',     'detailsURL',
      'idxID',          'idxPropType',
      'vtCount',        'ohCount',
      'mediaData',      'featured',
      'image',          'userAgentID'
    ]
  },
  offmarket: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'A list of all offmarket properties associated the the client.',
    availableReturnFields: [
      'address',        'streetName',
      'streetNumber',   'streetDirection',
      'unitNumber',     'cityName',
      'countyName',     'state',
      'zipcode',        'zip4',
      'listingPrice',   'listingID',
      'remarksConcat',  'rntLse',
      'rntLsePrice',    'rntLsePriceOffSeason',
      'propStatus',     'bedrooms',
      'totalBaths',     'fullBaths',
      'partialBaths',   'latitude',
      'longitude',      'acres',
      'sqFt',           'displayAddress',
      'listingAgentID', 'listingOfficeID',
      'mlsPtID',        'mlsPhotoCount',
      'parentPtID',     'detailsURL',
      'idxID',          'idxPropType',
      'vtCount',        'ohCount',
      'mediaData',      'featured',
      'image',          'userAgentID'
    ]
  },
  supplemental: {
    supported: { GET: true, POST: true, PUT: true, DELETE: true },
    status: 'active',
    description: 'A list of all supplemental properties belonging to the client.',
    availableReturnFields: [
      'address',        'streetName',
      'streetNumber',   'streetDirection',
      'unitNumber',     'cityName',
      'countyName',     'state',
      'zipcode',        'zip4',
      'listingPrice',   'listingID',
      'remarksConcat',  'rntLse',
      'rntLsePrice',    'rntLsePriceOffSeason',
      'propStatus',     'bedrooms',
      'totalBaths',     'fullBaths',
      'partialBaths',   'latitude',
      'longitude',      'acres',
      'sqFt',           'displayAddress',
      'listingAgentID', 'listingOfficeID',
      'mlsPtID',        'mlsPhotoCount',
      'parentPtID',     'detailsURL',
      'idxID',          'idxPropType',
      'vtCount',        'ohCount',
      'mediaData',      'featured',
      'image',          'userAgentID'
    ]
  },
  soldpending: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'A list of all sold and pending properties associated the the client.',
    availableReturnFields: [
      'address',        'streetName',
      'streetNumber',   'streetDirection',
      'unitNumber',     'cityName',
      'countyName',     'state',
      'zipcode',        'zip4',
      'listingPrice',   'listingID',
      'remarksConcat',  'rntLse',
      'rntLsePrice',    'rntLsePriceOffSeason',
      'propStatus',     'bedrooms',
      'totalBaths',     'fullBaths',
      'partialBaths',   'latitude',
      'longitude',      'acres',
      'sqFt',           'displayAddress',
      'listingAgentID', 'listingOfficeID',
      'mlsPtID',        'mlsPhotoCount',
      'parentPtID',     'detailsURL',
      'idxID',          'idxPropType',
      'vtCount',        'ohCount',
      'mediaData',      'featured',
      'image',          'userAgentID'
    ]
  },
  cities: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'A list of all cities available in each of a client city lists.',
    availableReturnFields: [ 'id', 'name', 'stateAbrv' ]
  },
  citiesListName: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'deprecated',
    description: 'Replaced by the method "citieslistname" in order to make method naming consistent.'
  },
  citieslistname: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'A list of all the IDs and names for each of a client city lists\n' +
      '                                        including MLS city lists.',
    availableReturnFields: [ 'id', 'name' ]
  },
  counties: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'A list of all counties available in each of a client county lists.',
    availableReturnFields: [ 'id', 'name', 'stateAbrv' ]
  },
  countieslistname: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'A list of all the IDs and names for each of a client county lists\n' +
      '                                        including MLS county lists.',
    availableReturnFields: [ 'id', 'name', 'stateAbrv' ]
  },
  zipcodes: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'deprecated',
    description: 'Replaced by the method "postalcodes"',
    availableReturnFields: [ 'id', 'name', 'stateAbrv' ]
  },
  postalcodes: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'deprecated',
    description: 'A list of all the postalcodes available in each of a client postalcode lists.',
    availableReturnFields: [ 'id', 'name', 'stateAbrv' ]
  },
  postalcodeslistname: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'A list of all the IDs and names for each of a client postalcode\n' +
      '                                        lists including MLS postalcode lists.',
    availableReturnFields: [ 'id', 'name', 'stateAbrv' ]
  },
  widgets: {
    supported: { GET: true, POST: true, PUT: true, DELETE: true },
    status: 'active',
    description: 'A list of all non-legacy widgets currently on the client account with their options and javascript embed URL.',
    availableReturnFields: [
      'uid',     'name',
      'url',     'legacy',
      'type',    'options',
      'created', 'updated'
    ]
  },
  'widgets-legacy': {
    supported: { GET: true, POST: true, PUT: false, DELETE: true },
    status: 'active',
    description: 'A list of all legacy widgets currently on the client account with their options and javascript embed URL.',
    availableReturnFields: [
      'uid',     'name',
      'url',     'legacy',
      'type',    'options',
      'created', 'updated'
    ]
  },
  wrappercache: {
    supported: { GET: false, POST: false, PUT: false, DELETE: true },
    status: 'active',
    description: 'The ability to clear the client wrapper cache via API call.'
  },
  accounttype: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'Get the account type.'
  },
  dynamicwrapperurl: {
    supported: { GET: false, POST: true, PUT: true, DELETE: false },
    status: 'active',
    description: 'Set OR update dynamic wrapper url for global, pages and saved links.'
  },
  apiversion: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'Get the default api version.'
  },
  listallowedfields: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'Retrieve available fields to be returned for a given listing.'
  },
  listing: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'Retrieve listing information for a given listingID and MLS Feed Identifier.'
  },
  properties: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'Retrieve listing information for results from a given Saved Link ID.'
  },
  searchquery: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'Retrieve results via a provided search query string.'
  },
  accountinfo: {
    supported: { GET: true, POST: true, PUT: false, DELETE: false },
    status: 'active',
    description: 'View or update client information.'
  },
  subheaders: {
    supported: { GET: true, POST: true, PUT: true, DELETE: true },
    status: 'active',
    description: 'View/edit the subheaders settings of the client account.',
    availableReturnFields: [ 'id', 'type', 'category', 'pageID', 'subheader' ]
  },
  generalInterestArticle: {
    supported: { GET: false, POST: false, PUT: true, DELETE: false },
    status: 'active',
    description: 'Get a random general interest article.'
  },
  socialProStatus: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'Get the client social pro enabled/disabled status.'
  },
  socialPostSyndicate: {
    supported: { GET: false, POST: false, PUT: true, DELETE: false },
    status: 'active',
    description: 'Syndicate '
  },
  widgetDataRestriction: {
    supported: { GET: true, POST: false, PUT: false, DELETE: false },
    status: 'active',
    description: 'Determine if widget data is allowed to be displayed or not.'
  }
}

Keys Authentication for the IDX API.
Access to the IDX API is handled through keys. These keys can be easily created, changed, and revoked in your IDX Control Panel. This is a measure of security that ensures that your account credentials and sensitive information are never exposed by the API.

Access Keys
Access keys grant access to API components. Different components are available to different account levels. These are detailed in the documentation for each component. The key for the header is accesskey


Ancillary Keys
When accessing APIs on behalf of their clients, Development Partners can use their own API keys as ancillary keys. Use of ancillary keys is completely optional but it grants the following extra functionality.

Increased hourly access limits. Three times the normal limit.
Output preference override. The partner's output preferences override any settings that the client may have.
Version preference override. Regardless of the API version selected in the client account the version used will be the preference set on the partner's account.
Headers Access control headers.
Request Headers
These are the headers sent by your client to the API. There are two required headers and three optional headers that must be sent with all requests. Exactly how these headers are sent depends on the programs and languages used in connecting to the API. Examples of header syntax are included in most code examples.

Content-Type required
The value should always be application/x-www-form-urlencoded unless specified differently on the method.
This is a standard HTTP header and may be included automatically by some REST clients.
This is not strictly required for GET requests but is for PUT, POST, and DELETE requests. Including it for GET is considered a best practice.
Methods calling for a JSON object should use a value of application/json.
accesskey required
As described above, this is the method of access control for the API.
This is a 22 character string that can be created in your account control panel.
ancillarykey optional
As described above, this allows development partners some additional options when accessing the API on behalf of their clients.
This is the same 22 character string that serves as the partner's access key.
Use is optional but there is no reason not to include it.
outputtype optional
Serves the same purpose as the output preference available in your account control panel.
Use ensures that output is always as expected in cases where the output preferences may change on the client or partner API key control page.
apiversion optional
Overrides the version preference set in your account control panel.
Use ensures that output is always as expected in cases where the output preferences may change on the client or partner API key control page.
Also useful when testing your code with different versions of the API.
If the specified value is not a valid API version or if the version specified has been sunsetted then the API response will be made with the most current active version. As such, when using the api version header, it is always a good idea to compare the version you specify with the version given in the response header.
Response Headers
These are the headers sent by the API to your client when a request has been completed. Not listed are the normal headers sent by the webserver such as Content-Length, Cache-Control, etc. For explanations of these headers please look up the HTTP specification for each.

Hourly-Access-Key-Usage
Shows the number of API access made by the current accesskey within the last hour. This value can be useful in making sure your systems do not go over the hourly access limit.

Api-Version
Shows the version number of the API that responded. This can be useful when used in conjunction with the version response header to insure your request was processed by the version requested.

Versions Handling changes to the API over time.
Any API changes that have an effect on input or output will be made in discreet versions; methods used by your code will remain the same unless you explicitly change the version of the API that your system uses.

Versions will be semver style (e.g. 1.1.0) where the first digit represents the major release, the second digit represents the minor release, and the 3rd number represents bug fixes and new method additions which do not alter or break the output of any existing methods.

Following the full release of new versions of the API, previous versions will remain available in a deprecated state, although no new development will occur on them. A previous version will only be made unavailable (sunsetted) if it proves to be an unreasonable drain on resources, or if it violates MLS rules. If a version needs to be sunsetted, a minimum of 3 months notice will be given; specific functions may need to be altered or removed with less notice in instances of MLS rule violations.

Choosing a Version
There are two ways to choose what version of the API will respond to your request.

Through preference.
As with the output format you can set the version that will be used via the API Key management page of your account profile.
If you are a development partner using your key as an ancillary key when accessing the API on behalf of one of your clients, then your version preference will supersede the version preference set in the client's account.
Through header.
You can optionally specify a version in your request header. This will override any version preference stored in a client or partner account.
This can be very useful when testing updates to your code when migrating to a new version of the API.
As noted elsewhere, if the specified value is not a valid API version, or if the version specified has been sunsetted, then the most current active version of the API will be used to respond. As such, when using the api version header it is always a good idea to compare the version you specify with the version given in the response header.
If you do not change API version with one of these options then the version that responds to your request will be the version that was default when your account was created.

New Versions
When new major and minor releases of the API are developed, they will be available in a preview state for one month prior to being made the default version. Bug fixes and new (non-breaking) method additions will be represented by the 3rd digit in the version number without a preview period.

During the preview period the 3rd digit of the version number may change as bugs are fixed. Clients or partners using a preview version will be automatically upgraded to the new version and the previous preview version will cease to exist. At no other time will a client or partner's version preference be changed automatically, so you will only need to update your code if you choose to move to a new version of the API or choose to use a version in preview.

URL Structure The Components of the API URLs.
There is a standard URL structure for all API accesses. The structure is as follows:

https://api.idxbroker.com/component/method/primary request ID/secondary request ID?query string

component required
This is the main section of the API that is being accessed.
Current components include: partners, clients, mls, and leads
method required
This is a function of the component that is being accessed. For example you might access the cities method of the mls component in order to get a list of cities that currently have properties in them for a given MLS.
All components have the following two methods: listcomponents and listmethods
primary request ID conditional
This is required in certain circumstances to view or set specific information.
For example if you want to get information about a lead you would send the ID of the lead to view.
secondary request ID conditional
Similar to the primary request ID, there are methods that require two IDs to be passed in order to function.
For example to view a single search for a lead you would need to pass the lead ID as the primary request ID and the search ID as the secondary request ID.
query string conditional
Many GET requests offer filtering or specific views based on information passed in a standard, browser type, ampersand delineated query string following the URL.
Input Structure How API input must be formatted.
All API inputs, whether in the query string or request body, must be in the form of an ampersand (&) delineated and URL encoded string.

idxID=a001&listingID=1234

or

note=this+is+a+url+enocoded+note+%26+string+with+%3Ctags%3E
                        
Output Structure How API output will be returned.
General
Users can select between the default JSON encoded output and simple XML output. This can be set in the API Key management page of your account control panel or by passing the optional outputtype headers.

Empty PUT/POST requests
Empty PUT and POST requests (on methods that support those actions) will return a description of the fields accepted by those methods and actions. The output is as follows:

[field name] - The name of the field, i.e. the key in your key value pair that you will send via PUT or POST. E.g. firstName
explanitoryText - Very short (one to three words) description of the field. If this were an HTML form this would be the content of the <label> tag.
required - If the value is required to be passed. 0 if no 1 for yes
maxLength - The maximum number of characters allowed.
dataType - The type of data allowed. Generally string or int
allowedCharacters - If blank this means no characters are restricted. Otherwise it will show allowed characters in a regex format. E.g. 0-9 means only integers are allowed.
defaultValue - What the default value should be if no further input is given.
choices - In the event that there are a set number of valid values this will contain all that are accepted. Otherwise it will be an empty object.
description - A One to Two sentence description of the field populated when the explainitoryText is ambiguous.
Response Codes
Below you find a list of all status codes currently returned by the API.

200 - OK
204 - OK, nothing returned. This is most common for DELETE requests.
400 - Required parameter missing or invalid. Lead name with 2 or more digits.
401 - accesskey not valid or revoked.
403 - Method access is restricted.
403.4 - URL provided is not using SSL (HTTPS).
404 - Invalid API component specified.
405 - Method requested is invalid. This usually indicates a typo or that you may be requesting a method that is part of a different API component.
406 - accesskey or ancillarykey not provided.
409 - Duplicate unique data detected.
412 - Account is over it's hourly access limit.
413 - Requested entity too large.
416 - Requested time range not satisfiable.
417 - There are more saved links in the account than allowed through the API.
500 - General system error. Please try again later or contact IDX support.
503 - Scheduled or emergency API maintenance will result in 503 errors.
521 - Temporary error. There is a possibility that not all API methods are affected.
Actions Verbs that the API methods understand.
Each method inside an API component supports some or all of the following actions (verbs). The documentation of each method will show which actions are supported. The listmethods method available in each component will also return booleans indicating which actions are supported.

GET - Gets information from the IDX system. May accept output modifiers, such as filters, via query string.
PUT - Add a new record to the IDX system. Accepts record data via request body.
POST - Update an existing record in the IDX system. Accepts record data via request body.
DELETE - Remove a record from the IDX system. DELETE action on all methods are permanent.
PUT and POST actions, when supported, will return a list of acceptable criteria/fields when a request is made without any data in the body. For specifics on what input is supported by each method please refer to the documentation specific to said method.

Access Limit Hourly rate limit.
To encourage efficient API calls and to prevent abuse the API imposes an hourly limit on accesses. Based on existing web service usage patterns none of our current partners or developers would hit this limit under normal usage. By default this limit is:

500 accesses per hour per accesskey on Platinum.
500 accesses per hour per accesskey on Platinum + IXACT CRM.
300 accesses per hour per accesskey for Lite.
300 accesses per hour per accesskey on Lite + IXACT CRM.
500 accesses per hour per accesskey on HOME.
500 accesses per hour per accesskey on HOME + IXACT CRM.
Additionally, development partners using their API key as an ancillary key have triple this limit. Also note that this is a per accesskey limit, meaning that partners who service multiple client accounts have use of this limit per hour per client. Any client or partner who runs up against this limit can contact IDX support for tips on how to use the API fewer times per hour.

The current number of accesses in the current hour is sent in the response header of each request with the key Hourly-Access-Key-Usage. A 412: Precondition Failed error from the API indicates that you have gone over your hourly limit.

Component Levels Who can use what.
The current API components are:
partners - used by development partner level accounts
clients - used by client level accounts
leads - used by client level accounts
mls - used by client level accounts