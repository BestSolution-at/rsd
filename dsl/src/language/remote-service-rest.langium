grammar RemoteServiceREST

import "remote-service-definition"

entry RSDRestModel:
    resources += RSDResource+
;

RSDResource:
'resource' service=[Service:ID] 'at' basePath=STRING '{'
    endpoints += EnpointPoint*
'}';

EnpointPoint:
    method=('GET'|'POST'|'DELETE'|'PUT'|'PATCH') operation=[Operation:ID] 
        'at' path=STRING
        specialParameters += SpecialParameter*
        ('=>' '{'
            (statusCode=INT (':' error=[ErrorCode:ID])?)+
        '}' )?
;

SpecialParameter:
    transportType=('header-param'|'query-param'|'cookie-param') parameter=[Parameter:ID] ('as' parameterName=STRING)?
;

Path:
    pathSegments += PathSegment ( '/' pathSegments += PathSegment )*
;

PathSegment:
    segment = ID | ('{' ID '}')
;