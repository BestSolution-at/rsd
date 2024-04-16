import { Component, Element, Fragment, Prop, State, Watch, getAssetPath, h } from '@stencil/core';
import { MOperation, MParameter, MRSDModel, MResolvedRSDModel, MResolvedUserType, MService, isMEnumType, isMMixinType, isMRSDModel, isMRecordType, isMScalarType, isMUnionType, resolve } from '../../utils/model';

function userTypeToAsset(type: MResolvedUserType) {
  if( isMUnionType(type) ) {
    return getAssetPath('./assets/block/block.svg')
  } else if( isMMixinType(type) ) {
    return getAssetPath('./assets/module/module.svg')
  } else if( isMRecordType(type) ) {
    return getAssetPath('./assets/record/record.svg')
  } else if( isMEnumType(type) ) {
    return getAssetPath('./assets/applicationExtension/applicationExtension.svg')
  } else if( isMScalarType(type) ) {
    return getAssetPath('./assets/gvariable/gvariable.svg')
  }
}

function userTypeToImg(type: MResolvedUserType) {
  const path = userTypeToAsset(type)
  return path ? <img src={path} /> : <div></div>
}

function typeValue(type: MResolvedUserType) {
  const typeName = type['@type'].replace('Type', '')
  const classes = { 'type': true };
  classes[`type-${typeName.toLowerCase()}`] = true;
  return <span class={classes}>{typeName.toLowerCase()}</span>
}

function serviceToImg() {
  const path = getAssetPath('./assets/remoteSwiftPackageDependency/remoteSwiftPackageDependency.svg')
  return path ? <img src={path} /> : <div></div>
}

function operationToImg() {
  const path = getAssetPath('./assets/method/method.svg')
  return path ? <img src={path} /> : <div></div>
}

function typeGroupImg() {
  const path = getAssetPath('./assets/package/package.svg')
  return path ? <img src={path} /> : <div></div>
}

function serviceMethods(service: MService) {
  return <ul>{ service.operations.map( o => <li><a href={`#/services/${service.name}/${o.name}`}>{operationToImg()}{o.name}</a></li>) }</ul>
}

function groupByType(types: readonly MResolvedUserType[]) {
  const map = new Map<string, MResolvedUserType[]>();
  types.forEach( t => {
    if( map.has(t['@type']) ) {
      map.get(t['@type']).push(t);
    } else {
      map.set(t['@type'], [ t ]);
    }
  } );
  return map;
}

function typeToInt(type: string) {
  switch(type) {
    case 'ScalarType': return 0;
    case 'EnumType': return 1;
    case 'MixinType': return 2;
    case 'RecordType': return 3;
    case 'UnionType': return 4;
    default: return 5;
  }
}

function sortTypes(v1: [string, MResolvedUserType[]], v2: [string, MResolvedUserType[]]) {
  const x1 = typeToInt(v1[0])
  const x2 = typeToInt(v2[0]);
  if( x1 == x2 ) {
    return 0;
  } else if( x1 > x2 ) {
    return 1;
  }
  return -1;
}

function typesList(types: readonly MResolvedUserType[]) {
  return <ul>
    { types.map( t => <li><a href={`#/types/${t.name}`}>{userTypeToImg(t)}{t.name}</a></li>) }
  </ul>
}

function serviceContent(service: MService) {
  return <div class={{'services': true}} id={`services_${service.name}`}>
    <h2>{serviceToImg()}{service.name}</h2>
    <div class={{'operations': true}}>
      { service.operations.map(operationContent) }
    </div>
  </div>
}

function operationContent(operation: MOperation) {
  return <div class={{'operation': true}}>
    <h3>{operationToImg()}{operation.name}</h3>
    <p class={{'operation-doc': true}}>{ operation.doc || 'No Documentation' }</p>
    <div class={{'operation-content': true}}>
      <div style={{'font-weight': 'bold', 'margin-bottom': '0.5rem'}}>Parameters</div>
      { operation.parameters.length === 0 && <span>'No Parameters'</span>}
      { operation.parameters.length > 0 && <div class={{'operation-parameters': true}}>{operation.parameters.map(parameterContent)}</div> }
    </div>
  </div>
}

function parameterContent(parameter: MParameter) {
  return <Fragment>
    <span>
      { parameter.optional && <span style={{ 'color': 'darkred', 'font-weight': '300' }}>optional </span> }
      { parameter.nullable && <span style={{ 'color': 'darkred', 'font-weight': '300' }}>nullable </span> }
      <span style={{'font-weight': 'bold'}}>{parameter.name}</span>
    </span>
    <span>
      <span style={{ 'color': 'darkorange', 'font-weight': '300' }}>{parameter.variant} </span>
      { parameter.variant === 'builtin' && <span style={{'font-weight': '300'}}>{parameter.type}</span> }
      { parameter.variant !== 'builtin' && <span style={{'font-weight': '300'}}><a href={`#types_${parameter.type}`}>{parameter.type}</a></span> }
    </span>
    <div style={{'grid-column': '1/3', 'margin-bottom': '1rem' }}>{parameter.doc}</div>
  </Fragment>
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
  projectname: string

  @Prop()
  model: string | MRSDModel

  @State()
  resolvedModel: MResolvedRSDModel = { "@type": "RSDModel", elements: [], services: [] };

  constructor() {

  }

  render() {
    return <Fragment>
      <nav>
        <h1 class={{'project-name': true}}>{this.projectname}</h1>
        <div class="services">
          <h2 class={{'header': true}}>Services</h2>
          <ul>
            { this.resolvedModel.services.map( e => <li><a href={`#services_${e.name}`}>{serviceToImg()}<span>{e.name}</span></a>{serviceMethods(e)}</li> ) }
          </ul>
        </div>
        <div class="types">
          <h2 class={{'header': true}}>Types</h2>
          <ul>
            { [...groupByType(this.resolvedModel.elements).entries()].sort(sortTypes).map( e => <li><a href={`#types_${e[0]}`}>{typeGroupImg()}{e[0].replace('Type','')}</a>{typesList(e[1])}</li> ) }
          </ul>
        </div>
      </nav>
      <main>
        <div>
          <h1>Services</h1>
          <div class={{'main-section': true}}>
            { this.resolvedModel.services.map( s => serviceContent(s)) }
          </div>
        </div>
        <div>
          <div>Types</div>
          <div class={{'main-section': true}}>

          </div>
        </div>
      </main>
    </Fragment>;
  }

  @Watch('model')
  watchModel() {
    if( this.model ) {
      if( typeof this.model === 'string' ) {
        if( this.model.startsWith('{') ) {
          const m = JSON.parse(this.model)
          if( isMRSDModel(m) ) {
            this.resolvedModel = resolve(m)
          }
        } else {
          fetch(this.model)
            .then( r => r.json())
            .then( j => {
              if( isMRSDModel(j) ) {
                this.resolvedModel = resolve(j);
              } else {
                console.error('Loaded model is not an RSD-Model', j);
              }
            } ).catch(e => {
              console.error(`Failed loading model from ${this.model}:`, e)
            })
        }
      } else {
        this.resolvedModel = resolve(this.model)
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
    if( location.hash.length > 1 ) {
      const el = this.el.shadowRoot.querySelector(`[id='${location.hash.substring(1)}']`)
      if( el ) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
