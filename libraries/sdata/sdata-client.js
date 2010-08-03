/*
 * 
 */
Ext.namespace("Sage.SData.Client");Sage.SData.Client.SDataBaseRequest=Ext.extend(Ext.util.Observable,{constructor:function(a){Sage.SData.Client.SDataBaseRequest.superclass.constructor.call(this);this.service=a;this.uri=new Sage.SData.Client.SDataUri();if(this.service){this.uri.setVersion(this.service.getVersion());this.uri.setIncludeContent(this.service.getIncludeContent());this.uri.setServer(this.service.getVirtualDirectory()?this.service.getVirtualDirectory():"sdata");this.uri.setScheme(this.service.getProtocol());this.uri.setHost(this.service.getServerName());this.uri.setPort(this.service.getPort())}},getService:function(){return this.service},getUri:function(){return this.uri},setUri:function(a){this.uri=a;return this},getServerName:function(){return this.uri.getHost()},setServerName:function(a){this.uri.setHost(a);return this},getVirtualDirectory:function(){return this.uri.getServer()},setVirtualDirectory:function(a){this.uri.setServer(a);return this},getProtocol:function(){return this.uri.getScheme()},setProtocol:function(a){this.uri.setScheme(a);return this},getPort:function(){return this.uri.getPort()},setPort:function(a){this.uri.setPort(a);return this},getQueryArgs:function(){return this.uri.getQueryArgs()},setQueryArgs:function(b,a){this.uri.setQueryArgs(b,a);return this},getQueryArg:function(a){return this.uri.getQueryArg(a)},setQueryArg:function(a,b){this.uri.setQueryArg(a,b);return this},buildUrl:function(a){},toString:function(){var a=new Sage.SData.Client.SDataUri(this.uri);this.buildUrl(a);return a.toString()}});Ext.namespace("Sage.SData.Client");Sage.SData.Client.SDataApplicationRequest=Ext.extend(Sage.SData.Client.SDataBaseRequest,{constructor:function(){Sage.SData.Client.SDataApplicationRequest.superclass.constructor.apply(this,arguments);if(this.service){this.uri.setProduct(this.service.getApplicationName()?this.service.getApplicationName():"-");this.uri.setContract(this.service.getContractName()?this.service.getContractName():"-");this.uri.setCompanyDataset(this.service.getDataSet()?this.service.getDataSet():"-")}},getApplicationName:function(){return this.uri.getProduct()},setApplicationName:function(a){this.uri.setProduct(a);return this},getContractName:function(){return this.uri.getContract()},setContractName:function(a){this.uri.setContract(a);return this},getDataSet:function(){return this.uri.getCompanyDataset()},setDataSet:function(a){this.uri.setCompanyDataset(a);return this},getResourceKind:function(){return this.uri.getCollectionType()},setResourceKind:function(a){this.uri.setCollectionType(a);return this}});Ext.namespace("Sage.SData.Client");Sage.SData.Client.SDataResourceCollectionRequest=Ext.extend(Sage.SData.Client.SDataApplicationRequest,{constructor:function(){Sage.SData.Client.SDataResourceCollectionRequest.superclass.constructor.apply(this,arguments)},getCount:function(){return this.uri.getCount()},setCount:function(a){this.uri.setCount(a);return this},getStartIndex:function(){return this.uri.getStartIndex()},setStartIndex:function(a){this.uri.setStartIndex(a);return this},read:function(a){return this.service.readFeed(this,a)}});Ext.namespace("Sage.SData.Client");Sage.SData.Client.SDataSingleResourceRequest=Ext.extend(Sage.SData.Client.SDataApplicationRequest,{constructor:function(){Sage.SData.Client.SDataSingleResourceRequest.superclass.constructor.apply(this,arguments)},read:function(a){return this.service.readEntry(this,a)},update:function(b,a){return this.service.updateEntry(this,b,a)},create:function(b,a){return this.service.createEntry(this,b,a)},getResourceSelector:function(){return this.uri.getCollectionPredicate()},setResourceSelector:function(a){this.uri.setCollectionPredicate(a);return this}});Ext.namespace("Sage.SData.Client");Sage.SData.Client.SDataSystemRequest=Ext.extend(Sage.SData.Client.SDataBaseRequest,{constructor:function(){Sage.SData.Client.SDataSystemRequest.superclass.constructor.apply(this,arguments);this.category=false},getCategory:function(){return this.category},setCategory:function(a){this.category=a;return this},buildUrl:function(a){Sage.SData.Client.SDataSystemRequest.superclass.buildUrl.apply(this,arguments);a.appendPath("$system");if(this.category){a.appendPath(this.category)}},read:function(a){return this.service.readFeed(this,a)}});Ext.namespace("Sage.SData.Client");Sage.SData.Client.SDataTemplateResourceRequest=Ext.extend(Sage.SData.Client.SDataApplicationRequest,{constructor:function(){Sage.SData.Client.SDataTemplateResourceRequest.superclass.constructor.apply(this,arguments);this.uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex,Sage.SData.Client.SDataUri.TemplateSegment)},read:function(a){return this.service.readEntry(this,a)}});Ext.namespace("Sage.SData.Client");Sage.SData.Client.SDataUri=Ext.extend(Ext.util.Observable,{constructor:function(a){Sage.SData.Client.SDataUri.superclass.constructor.call(this);this.scheme=Sage.SData.Client.SDataUri.Http;this.host="";this.server="";this.port=Sage.SData.Client.SDataUri.UnspecifiedPort;this.queryArgs={};this.pathSegments=[];this.startIndex=false;this.count=false;this.version={major:1,minor:0};Ext.apply(this,a)},getVersion:function(){return this.version},setVersion:function(a){this.version=Ext.apply({major:0,minor:0},a);return this},getScheme:function(){return this.scheme},setScheme:function(a){this.scheme=a;return this},getHost:function(){return this.host},setHost:function(a){this.host=a;return this},getPort:function(){return this.port},setPort:function(a){this.port=a;return this},getServer:function(){return this.server},setServer:function(a){this.server=a;return this},getQueryArgs:function(){return this.queryArgs},setQueryArgs:function(b,a){this.queryArgs=a!==true?Ext.apply(this.queryArgs,b):b;return this},getQueryArg:function(a){return this.queryArgs[a]},setQueryArg:function(a,b){this.queryArgs[a]=b;return this},getPathSegments:function(){return this.pathSegments},setPathSegments:function(a){this.pathSegments=a;return this},getPathSegment:function(a){return this.pathSegments.length>a?this.pathSegments[a]:false},setPathSegment:function(b,c,a){if(typeof c==="string"){var c={text:c};if(a){c.predicate=a}}this.pathSegments[b]=Ext.apply(this.pathSegments[b]||{},c);return this},getStartIndex:function(){return this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.StartIndex]?parseInt(this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.StartIndex]):false},setStartIndex:function(a){this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.StartIndex]=a;return this},getCount:function(){return this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.Count]?parseInt(this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.Count]):false},setCount:function(a){this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.Count]=a;return this},getIncludeContent:function(){if(this.version.major>=1){return this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.IncludeContent]=="true"}else{return this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.LegacyIncludeContent]=="true"}},setIncludeContent:function(a){if(this.version.major>=1){this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.IncludeContent]=a?"true":"false"}else{this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.LegacyIncludeContent]=a?"true":"false"}return this},appendPath:function(a){this.pathSegments.push(typeof a==="string"?{text:a}:a);return this},toString:function(){var a=[];a.push(this.getScheme());a.push(Sage.SData.Client.SDataUri.SchemeSuffix);a.push(Sage.SData.Client.SDataUri.PathSegmentPrefix);a.push(Sage.SData.Client.SDataUri.PathSegmentPrefix);a.push(this.getHost());if(this.getPort()!==Sage.SData.Client.SDataUri.UnspecifiedPort){a.push(Sage.SData.Client.SDataUri.PortPrefix);a.push(this.getPort())}a.push(Sage.SData.Client.SDataUri.PathSegmentPrefix);var e=this.getPathSegments();var j=[];var c=this.getServer();if(c&&c.length>0){j=j.concat(c.split("/"))}for(var d=0;d<e.length;d++){var f=e[d];if(typeof f==="undefined"){continue}if(f.predicate){j.push(encodeURIComponent(f.text+"("+f.predicate+")"))}else{j.push(encodeURIComponent(f.text))}}a.push(j.join(Sage.SData.Client.SDataUri.PathSegmentPrefix));var b=this.getQueryArgs();var g=[];for(var h in b){g.push(encodeURIComponent(h)+Sage.SData.Client.SDataUri.QueryArgValuePrefix+encodeURIComponent(b[h]))}if(g.length>0){a.push(Sage.SData.Client.SDataUri.QueryPrefix);a.push(g.join(Sage.SData.Client.SDataUri.QueryArgPrefix))}return a.join("")},getProduct:function(){return this.getPathSegment(Sage.SData.Client.SDataUri.ProductPathIndex)},setProduct:function(a){return this.setPathSegment(Sage.SData.Client.SDataUri.ProductPathIndex,a)},getContract:function(){return this.getPathSegment(Sage.SData.Client.SDataUri.ContractTypePathIndex)},setContract:function(a){return this.setPathSegment(Sage.SData.Client.SDataUri.ContractTypePathIndex,a)},getCompanyDataset:function(){return this.getPathSegment(Sage.SData.Client.SDataUri.CompanyDatasetPathIndex)},setCompanyDataset:function(a){return this.setPathSegment(Sage.SData.Client.SDataUri.CompanyDatasetPathIndex,a)},getCollectionType:function(){return this.getPathSegment(Sage.SData.Client.SDataUri.CollectionTypePathIndex)},setCollectionType:function(a){return this.setPathSegment(Sage.SData.Client.SDataUri.CollectionTypePathIndex,a)},getCollectionPredicate:function(){var a=this.getPathSegment(Sage.SData.Client.SDataUri.CollectionTypePathIndex);return a&&a.predicate?a.predicate:false},setCollectionPredicate:function(a){return this.setPathSegment(Sage.SData.Client.SDataUri.CollectionTypePathIndex,{predicate:a})}});Ext.apply(Sage.SData.Client.SDataUri,{Http:"http",Https:"https",PathSegmentPrefix:"/",PortPrefix:":",QueryArgPrefix:"&",QueryArgValuePrefix:"=",QueryPrefix:"?",SchemeSuffix:":",UnspecifiedPort:-1,UriName:"uri",QueryArgNames:{Count:"count",Exclude:"exclude",Format:"format",Include:"include",IncludeContent:"_includeContent",LegacyIncludeContent:"includeContent",IncludeSchema:"includeSchema",Language:"language",OrderBy:"orderby",Precedence:"precedence",ReturnDelta:"returnDelta",Search:"search",Select:"select",StartIndex:"startIndex",Thumbnail:"thumbnail",TrackingID:"trackingID",Where:"where"},ProductPathIndex:0,ContractTypePathIndex:1,CompanyDatasetPathIndex:2,CollectionTypePathIndex:3,ResourcePropertyIndex:4,ServiceMethodSegment:"$service",TemplateSegment:"$template"});Ext.namespace("Sage.SData.Client");Sage.SData.Client.SDataService=Ext.extend(Ext.util.Observable,{constructor:function(a){Sage.SData.Client.SDataService.superclass.constructor.apply(this,arguments);this.uri=new Sage.SData.Client.SDataUri();this.userAgent="Sage";this.username=false;this.password="";if(a){if(a.version){this.uri.setVersion(a.version)}if(a.serverName){this.uri.setHost(a.serverName)}if(a.virtualDirectory){this.uri.setServer(a.virtualDirectory)}if(a.applicationName){this.uri.setProduct(a.applicationName)}if(a.contractName){this.uri.setContract(a.contractName)}if(a.port){this.uri.setPort(a.port)}if(a.protocol){this.uri.setScheme(a.protocol)}if(typeof a.includeContent==="boolean"){this.uri.setIncludeContent(a.includeContent)}if(a.userName){this.username=a.userName}if(a.password){this.password=a.password}if(a.json){this.json=true}}this.addEvents("beforerequest","requestcomplete","requestexception")},isJsonEnabled:function(){return this.json},enableJson:function(){this.json=true;return this},disableJson:function(){this.json=false;return this},getVersion:function(){return this.uri.getVersion()},setVersion:function(a){this.uri.setVersion(a);return this},getUri:function(){return this.uri},getUserName:function(){return this.username},setUserName:function(a){this.username=a;return this},getPassword:function(){return this.password},setPassword:function(a){this.password=a;return this},getProtocol:function(){return this.uri.getScheme()},setProtocol:function(a){this.uri.setScheme(a);return this},getServerName:function(){return this.uri.getHost()},setServerName:function(a){this.uri.setHost(a);return this},getPort:function(){return this.uri.getPort()},setPort:function(a){this.uri.setPort(a);return this},getVirtualDirectory:function(){return this.uri.getServer()},setVirtualDirectory:function(a){this.uri.setServer(a);return this},getApplicationName:function(){return this.uri.getProduct()},setApplicationName:function(a){this.uri.setProduct(a);return this},getContractName:function(){return this.uri.getContract()},setContractName:function(a){this.uri.setContract(a);return this},getDataSet:function(){return this.uri.getCompanyDataset()},setDataSet:function(a){this.uri.setCompanyDataset(a);return this},getIncludeContent:function(){return this.uri.getIncludeContent()},setIncludeContent:function(a){this.uri.setIncludeContent(a);return this},getUserAgent:function(){return this.userAgent},setUserAgent:function(a){this.userAgent=a;return this},createBasicAuthToken:function(){return"Basic "+Base64.encode(this.username+":"+this.password)},createHeadersForRequest:function(a){var b={"X-Authorization-Mode":"no-challenge"};if(this.username!==false){b.Authorization=b["X-Authorization"]=this.createBasicAuthToken()}return b},executeRequest:function(b,a,c){var d=Ext.apply({headers:{},method:"GET"},{scope:this,success:function(e,f){var g=this.processFeed(e);this.fireEvent("requestcomplete",b,f,g);if(a.success){a.success.call(a.scope||this,g)}},failure:function(e,f){this.fireEvent("requestexception",b,f,e);if(a.failure){a.failure.call(a.scope||this,e,f)}}},c);Ext.apply(d.headers,this.createHeadersForRequest(b));if(this.json){b.setQueryArg("format","json")}d.url=b.toString();this.fireEvent("beforerequest",b,d);if(typeof d.result!=="undefined"){if(a.success){a.success.call(a.scope||this,d.result)}return}return Ext.Ajax.request(d)},abortRequest:function(a){Ext.Ajax.abort(a)},readFeed:function(b,a){return this.executeRequest(b,a,{headers:{Accept:this.json?"application/json":"application/atom+xml;type=feed,*/*"}})},readEntry:function(b,a){var c=Ext.apply({},{success:function(e){var d=e["$resources"][0]||false;if(a.success){a.success.call(a.scope||this,d)}}},a);return this.executeRequest(b,c,{headers:{Accept:this.json?"application/json":"application/atom+xml;type=entry,*/*"}})},createEntry:function(d,c,b){var f=Ext.apply({},{success:function(h){var g=h["$resources"][0]||false;if(b.success){b.success.call(b.scope||this,g)}},scope:this},b);var e=Ext.apply({},{method:"POST"});if(this.isJsonEnabled()){Ext.apply(e,{jsonData:c,headers:{"Content-Type":"application/json"}})}else{var a=new XML.ObjTree();a.attr_prefix="@";Ext.apply(e,{xmlData:a.writeXML(this.formatEntry(c)),headers:{"Content-Type":"application/atom+xml;type=entry",Accept:"application/atom+xml;type=entry,*/*"}})}return this.executeRequest(d,f,e)},updateEntry:function(d,c,b){var f=Ext.apply({},{success:function(h){var g=h["$resources"][0]||false;if(b.success){b.success.call(b.scope||this,g)}},scope:this},b);var e=Ext.apply({},{method:"PUT"});if(this.isJsonEnabled()){Ext.apply(e,{jsonData:c,headers:{"Content-Type":"application/json","If-Match":c["$etag"]}})}else{var a=new XML.ObjTree();a.attr_prefix="@";Ext.apply(e,{xmlData:a.writeXML(this.formatEntry(c)),headers:{"Content-Type":"application/atom+xml;type=entry",Accept:"application/atom+xml;type=entry,*/*","If-Match":c["$etag"]}})}return this.executeRequest(d,f,e)},parseFeedXml:function(b){var a=new XML.ObjTree();a.attr_prefix="@";return a.parseXML(b)},convertEntity:function(f,a,c,b){b=b||{};b["$name"]=a;b["$key"]=c["@sdata:key"];b["$url"]=c["@sdata:uri"];b["$uuid"]=c["@sdata:uuid"];var d=f+":";for(var i in c){if(i.indexOf(d)===0){var e=i.substring(d.length);var g=c[i];if(typeof g==="object"){if(g.hasOwnProperty("@xsi:nil")){var h=null}else{if(g.hasOwnProperty("@sdata:key")){var h=this.convertEntity(f,e,g)}}g=h}b[e]=g}}return b},formatEntity:function(c,b,e){e=e||{};if(b["$key"]){e["@sdata:key"]=b["$key"]}if(b["$url"]){e["@sdata:uri"]=b["$url"]}for(var a in b){if(/^\$/.test(a)){continue}var d=b[a];if(d==null){d={"@xsi:nil":"true"}}else{if(typeof d==="object"){d=this.formatEntity(c,d)}}e[a]=d}return e},convertEntry:function(f){var a={};a["$descriptor"]=f.title;a["$etag"]=f["http:etag"];a["$httpStatus"]=f["http:httpStatus"];var h=f["sdata:payload"];for(var d in h){if(h.hasOwnProperty(d)==false){continue}var g=d.split(":");if(g.length<2){continue}var e=g[0];var c=g[1];var b=h[d];this.convertEntity(e,c,b,a)}return a},formatEntry:function(b){var a={};a["@xmlns:sdata"]="http://schemas.sage.com/sdata/2008/1";a["@xmlns:xsi"]="http://www.w3.org/2001/XMLSchema-instance";a["@xmlns:http"]="http://schemas.sage.com/sdata/http/2008/1";a["@xmlns"]="http://www.w3.org/2005/Atom";if(b["$etag"]){a["http:etag"]=b["$etag"]}a["sdata:payload"]={};a["sdata:payload"][b["$name"]]={"@xmlns":"http://schemas.sage.com/dynamic/2007"};this.formatEntity(false,b,a["sdata:payload"][b["$name"]]);return{entry:a}},convertFeed:function(c){var a={};if(c["opensearch:totalResults"]){a["$totalResults"]=parseInt(c["opensearch:totalResults"])}if(c["opensearch:startIndex"]){a["$startIndex"]=parseInt(c["opensearch:startIndex"])}if(c["opensearch:itemsPerPage"]){a["$itemsPerPage"]=parseInt(c["opensearch:itemsPerPage"])}if(c.link){a["$link"]={};for(var b=0;b<c.link.length;b++){a["$link"][c.link[b]["@rel"]]=c.link[b]["@href"]}if(a["$link"]["self"]){a["$url"]=a["$link"]["self"]}}a["$resources"]=[];if(Ext.isArray(c.entry)){for(var b=0;b<c.entry.length;b++){a["$resources"].push(this.convertEntry(c.entry[b]))}}else{if(typeof c.entry==="object"){a["$resources"].push(this.convertEntry(c.entry))}}return a},processFeed:function(a){var c=a.getResponseHeader("Content-Type");if((c==="application/json")||(!c&&this.isJsonEnabled())){var b=Ext.util.JSON.decode(a.responseText);if(b.hasOwnProperty("$resources")){return b}else{return{"$resources":[b]}}}else{var b=this.parseFeedXml(a.responseText);if(b.hasOwnProperty("feed")){return this.convertFeed(b.feed)}else{if(b.hasOwnProperty("entry")){return{"$resources":[this.convertEntry(b.entry)]}}else{return false}}}}});