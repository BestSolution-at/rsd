import { Component, Element, Fragment, Prop, State, Watch, getAssetPath, h } from '@stencil/core';
import {
  MBaseProperty,
  MKeyProperty,
  MOperation,
  MParameter,
  MProperty,
  MRSDModel,
  MResolvedEnumType,
  MResolvedMixinType,
  MResolvedRSDModel,
  MResolvedRecordType,
  MResolvedUserType,
  MService,
  isMEnumType,
  isMInlineEnumType,
  isMKeyProperty,
  isMMixinType,
  isMProperty,
  isMRSDModel,
  isMRecordType,
  isMScalarType,
  isMUnionType,
  resolve,
} from '../../utils/model';

function userTypeToAsset(type: MResolvedUserType) {
  if (isMUnionType(type)) {
    return getAssetPath('./assets/block/block.svg');
  } else if (isMMixinType(type)) {
    return getAssetPath('./assets/module/module.svg');
  } else if (isMRecordType(type)) {
    return getAssetPath('./assets/record/record.svg');
  } else if (isMEnumType(type)) {
    return getAssetPath('./assets/applicationExtension/applicationExtension.svg');
  } else if (isMScalarType(type)) {
    return getAssetPath('./assets/gvariable/gvariable.svg');
  }
}

function userTypeToImg(type: MResolvedUserType) {
  const path = userTypeToAsset(type);
  return path ? <img src={path} /> : <div></div>;
}

/*function typeValue(type: MResolvedUserType) {
  const typeName = type['@type'].replace('Type', '')
  const classes = { 'type': true };
  classes[`type-${typeName.toLowerCase()}`] = true;
  return <span class={classes}>{typeName.toLowerCase()}</span>
}*/

function serviceToImg() {
  const path = getAssetPath('./assets/remoteSwiftPackageDependency/remoteSwiftPackageDependency.svg');
  return path ? <img src={path} /> : <div></div>;
}

function operationToImg() {
  const path = getAssetPath('./assets/method/method.svg');
  return path ? <img src={path} /> : <div></div>;
}

function typeGroupImg() {
  const path = getAssetPath('./assets/package/package.svg');
  return path ? <img src={path} /> : <div></div>;
}

function serviceMethods(service: MService) {
  return (
    <ul>
      {service.operations.map(o => (
        <li>
          <a href={`#services_${service.name}_${o.name}`}>
            {operationToImg()}
            {o.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function groupByType(types: readonly MResolvedUserType[]) {
  const map = new Map<string, MResolvedUserType[]>();
  types.forEach(t => {
    if (map.has(t['@type'])) {
      map.get(t['@type']).push(t);
    } else {
      map.set(t['@type'], [t]);
    }
  });
  return map;
}

function typeToInt(type: string) {
  switch (type) {
    case 'ScalarType':
      return 0;
    case 'EnumType':
      return 1;
    case 'MixinType':
      return 2;
    case 'RecordType':
      return 3;
    case 'UnionType':
      return 4;
    default:
      return 5;
  }
}

function sortTypes(v1: [string, MResolvedUserType[]], v2: [string, MResolvedUserType[]]) {
  const x1 = typeToInt(v1[0]);
  const x2 = typeToInt(v2[0]);
  if (x1 == x2) {
    return 0;
  } else if (x1 > x2) {
    return 1;
  }
  return -1;
}

function typesList(types: readonly MResolvedUserType[]) {
  return (
    <ul>
      {types.map(t => (
        <li>
          <a href={`#types_${t.name}`}>
            {userTypeToImg(t)}
            {t.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function serviceContent(service: MService) {
  return (
    <div class={{ services: true }} id={`services_${service.name}`}>
      <h2>
        {serviceToImg()}
        {service.name}
      </h2>
      <div class={{ operations: true }}>{service.operations.map(o => operationContent(o, service))}</div>
    </div>
  );
}

function operationContent(operation: MOperation, service: MService) {
  return (
    <div id={`services_${service.name}_${operation.name}`} class="card operation">
      <h3>
        {operationToImg()}
        {operation.name}
      </h3>
      <p class={{ 'operation-doc': true }}>{operation.doc || 'No Documentation'}</p>
      <div class={{ 'operation-content': true }}>
        <div style={{ 'font-weight': 'bold', 'margin-bottom': '0.5rem' }}>Parameters</div>
        {operation.parameters.length === 0 && <span>'No Parameters'</span>}
        {operation.parameters.length > 0 && <div class={{ 'operation-parameters': true }}>{operation.parameters.map(parameterContent)}</div>}
      </div>
    </div>
  );
}

function parameterContent(parameter: MParameter) {
  return (
    <Fragment>
      <span>
        <span style={{ 'font-weight': 'bold' }}>{parameter.name}</span>
        {parameter.optional && <span class="optional-nullable"> optional</span>}
        {parameter.nullable && <span class="optional-nullable"> nullable</span>}
      </span>
      <span>
        {parameter.variant === 'builtin' && <span style={{ 'font-weight': '300' }}>{parameter.type} – </span>}
        {parameter.variant !== 'builtin' && (
          <span style={{ 'font-weight': '300' }}>
            <a href={`#types_${parameter.type}`}>{parameter.type}</a> –{' '}
          </span>
        )}
        <span class="builtin">{parameter.variant} </span>
      </span>
      <div class={{ doc: true }} style={{ 'grid-column': '1/3', 'margin-bottom': '1rem' }}>
        {parameter.doc}
      </div>
    </Fragment>
  );
}

function typeTypeContent(type: string, types: MResolvedUserType[]) {
  return (
    <div class={{ 'type-group': true }} id={'types_' + type}>
      <h2>
        {typeGroupImg()}
        {type.replace('Type', '')}
      </h2>
      <div class={{ types: true }}>{types.map(typeContent)}</div>
    </div>
  );
}

function typeContent(type: MResolvedUserType) {
  return (
    <div id={`types_${type.name}`} class="card type">
      <h3>
        {userTypeToImg(type)}
        {type.name}
      </h3>
      <p class={{ 'type-doc': true }}>{type.doc}</p>
      {isMEnumType(type) && enumTypeContent(type)}
      {isMMixinType(type) && mixinTypeContent(type)}
      {isMRecordType(type) && recordTypeContent(type)}
    </div>
  );
}

function enumTypeContent(type: MResolvedEnumType) {
  return (
    <div class={{ 'type-content': true }}>
      <div style={{ 'font-weight': 'bold', 'margin-bottom': '0.5rem' }}>Values</div>
      <ul>
        {type.entries.map(e => (
          <li>{e.name}</li>
        ))}
      </ul>
    </div>
  );
}

function mixinTypeContent(type: MResolvedMixinType) {
  return (
    <div class={{ 'type-content': true }}>
      <div style={{ 'font-weight': 'bold', 'margin-bottom': '0.5rem' }}>Properties</div>
      <div class={{ 'type-properties': true }}>{type.properties.map(basePropertyContent)}</div>
    </div>
  );
}

function recordTypeContent(type: MResolvedRecordType) {
  return (
    <div class={{ 'type-content': true }}>
      {type.resolved.mixins.length > 0 && (
        <Fragment>
          <div style={{ 'font-weight': 'bold', 'margin-bottom': '0.5rem' }}>Included Mixins</div>
          <div style={{ 'margin-bottom': '1rem', 'margin-left': '1rem' }}>
            {type.resolved.mixins.map(m => (
              <span>
                <a href={`#types_${m.name}`}>{m.name}</a>{' '}
              </span>
            ))}
          </div>
        </Fragment>
      )}

      <div style={{ 'font-weight': 'bold', 'margin-bottom': '0.5rem' }}>Properties</div>
      <div class={{ 'type-properties': true }}>
        {type.properties.map(basePropertyContent)}
        {type.resolved.mixins.flatMap(m => m.properties).map(basePropertyContent)}
      </div>
    </div>
  );
}

function basePropertyContent(property: MBaseProperty) {
  if (isMProperty(property)) {
    return propertyContent(property);
  } else if (isMKeyProperty(property)) {
    return keyPropertyContent(property);
  }
  return (
    <Fragment>
      <span>{property.name}</span>
      <span>NOT YET {property['@type']}</span>
    </Fragment>
  );
}

function keyPropertyContent(property: MKeyProperty) {
  return (
    <Fragment>
      <span>
        <span style={{ 'font-weight': 'bold' }}>{property.name}</span>
      </span>
      <span>
        <span style={{ 'font-weight': '300' }}>{property.type} – </span>
        <span class="key">key </span>
        <span class="builtin">builtin</span>
      </span>
      <div class={{ doc: true }} style={{ 'grid-column': '1/3', 'margin-bottom': '1rem' }}>
        {property.doc}
      </div>
    </Fragment>
  );
}

function propertyContent(property: MProperty) {
  return (
    <Fragment>
      <span>
        <span style={{ 'font-weight': 'bold' }}>{property.name}</span>
        {property.optional && <span class="optional-nullable"> optional</span>}
      </span>
      <span>
        {property.nullable && <span class="optional-nullable">nullable </span>}
        {property.variant === 'builtin' && <span style={{ 'font-weight': '300' }}>{property.type} – </span>}
        {property.variant !== 'builtin' && (
          <span style={{ 'font-weight': '300' }}>
            {isMInlineEnumType(property.type) && <span>{property.type.entries.map(e => e.name).join(' | ')} – </span>}
            {!isMInlineEnumType(property.type) && (
              <span>
                <a href={`#types_${property.type}`}>{property.type}</a> –{' '}
              </span>
            )}
          </span>
        )}
        <span style={{ 'color': 'darkorange', 'font-weight': '300' }}>{property.variant} </span>
      </span>
      <div class={{ doc: true }} style={{ 'grid-column': '1/3', 'margin-bottom': '1rem' }}>
        {property.doc}
      </div>
    </Fragment>
  );
}

@Component({
  tag: 'rsd-preview',
  styleUrl: 'rsd-preview.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class RSDPreview {
  @Element() el: HTMLElement;

  @Prop()
  projectname: string;

  @Prop()
  model: string | MRSDModel;

  @State()
  resolvedModel: MResolvedRSDModel = { '@type': 'RSDModel', 'elements': [], 'services': [], 'errors': [] };

  constructor() {}

  render() {
    return (
      <Fragment>
        <nav>
          <h1 class={{ 'project-name': true }}>{this.projectname}</h1>
          <div class="services">
            <h2 class={{ header: true }}>Services</h2>
            <ul>
              {this.resolvedModel.services.map(e => (
                <li>
                  <a href={`#services_${e.name}`}>
                    {serviceToImg()}
                    <span>{e.name}</span>
                  </a>
                  {serviceMethods(e)}
                </li>
              ))}
            </ul>
          </div>
          <div class="types">
            <h2 class={{ header: true }}>Types</h2>
            <ul>
              {[...groupByType(this.resolvedModel.elements).entries()].sort(sortTypes).map(e => (
                <li>
                  <a href={`#types_${e[0]}`}>
                    {typeGroupImg()}
                    {e[0].replace('Type', '')}
                  </a>
                  {typesList(e[1])}
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <main>
          <div>
            <div class={{ 'main-section': true }}>{this.resolvedModel.services.map(s => serviceContent(s))}</div>
          </div>
          <div>
            <div class={{ 'main-section': true }}>{[...groupByType(this.resolvedModel.elements).entries()].sort(sortTypes).map(e => typeTypeContent(e[0], e[1]))}</div>
          </div>
        </main>
      </Fragment>
    );
  }

  @Watch('model')
  watchModel() {
    if (this.model) {
      if (typeof this.model === 'string') {
        if (this.model.startsWith('{')) {
          const m = JSON.parse(this.model);
          if (isMRSDModel(m)) {
            this.resolvedModel = resolve(m);
          }
        } else {
          fetch(this.model)
            .then(r => r.json())
            .then(j => {
              if (isMRSDModel(j)) {
                this.resolvedModel = resolve(j);
              } else {
                console.error('Loaded model is not an RSD-Model', j);
              }
            })
            .catch(e => {
              console.error(`Failed loading model from ${this.model}:`, e);
            });
        }
      } else {
        this.resolvedModel = resolve(this.model);
      }
    }
  }

  connectedCallback() {
    this.watchModel();
    window.addEventListener('hashchange', this.handleHashchanged);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.handleHashchanged);
  }

  private handleHashchanged = () => {
    if (location.hash.length > 1) {
      const el = this.el.shadowRoot.querySelector(`[id='${location.hash.substring(1)}']`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
}
