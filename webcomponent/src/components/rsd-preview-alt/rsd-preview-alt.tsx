import { Component, Fragment, h, Prop, State, Watch } from '@stencil/core';
import { isMInlineEnumType, isMRSDModel, MOperation, MParameter, MResolvedRSDModel, MRSDModel, MService, resolve } from '../../utils/model';

function serviceContent(model: MService) {
  return (
    <div>
      <h1>{model.name}</h1>
      <p>{model.doc}</p>
      <div class="service-operations">{model.operations.map(o => serviceMethod(model, o))}</div>
    </div>
  );
}

function serviceMethod(service: MService, model: MOperation) {
  const reqParameters = model.parameters.filter(p => !p.optional);
  const optParameters = model.parameters.filter(p => p.optional);

  return (
    <Fragment>
      <h2>{model.name}</h2>
      <div class="service-operation-content">
        <div>
          <p>{model.doc}</p>
          {reqParameters.length > 0 && parameters('Required Parameters', reqParameters)}
          {optParameters.length > 0 && parameters('Optional Parameters', optParameters)}
        </div>
        <div class="code-column">
          <div class="code-area">
            <div class="code-header-area">
              <h3>Definition</h3>
              {/*<div>
                <button>rsd</button>
                <button>REST</button>
              </div>*/}
            </div>
            <div class="code-wrapper">
              <pre>
                <code>
                  <span>
                    <span class="keyword">service</span> <span class="type">{service.name}</span> <span>{'{'}</span>
                  </span>
                  {'\n'}
                  <span>
                    <span>{'\t...'}</span>
                  </span>
                  {'\n'}
                  <span>
                    {'\t'}
                    <span class="keyword">operation</span> <span class="method">{model.name}</span>
                    <span>(</span>
                    {model.parameters.map((p, idx, arr) => (
                      <Fragment>
                        <span>{p.name}</span>
                        <span>: </span>
                        {isMInlineEnumType(p.type) ? <span>p.type.entries.join('| ')</span> : <span class="type-ref">{p.type}</span>}
                        {idx + 1 < arr.length && ', '}
                      </Fragment>
                    ))}
                    <span>)</span>
                    {model.resultType && (
                      <Fragment>
                        <span>:</span>{' '}
                        <span class="type-ref">
                          {isMInlineEnumType(model.resultType.type) ? model.resultType.type.entries.map(e => e.name).join(' | ') : model.resultType.type}
                        </span>
                      </Fragment>
                    )}
                    {model.errors.length > 0 ? (
                      <Fragment>
                        <span class="keyword">{'\n\t\tthrows '}</span>
                        <span>{model.errors.join(' ')}</span>
                      </Fragment>
                    ) : (
                      ''
                    )}
                    <span>;</span>
                  </span>
                  {'\n'}
                  <span>
                    <span>{'\t...'}</span>
                  </span>
                  {'\n'}
                  <span>
                    <span>{'}'}</span>
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </Fragment>
  );
}

function parameters(title: string, parameters: MParameter[]) {
  return (
    <Fragment>
      <h3 class="parameters-header">{title}</h3>
      <div>
        <ul class="parameters">{parameters.map(parameter)}</ul>
      </div>
    </Fragment>
  );
}

function parameter(p: MParameter) {
  return (
    <li>
      <dl class="parameter">
        <dd>
          <code class="identifier">{p.name}</code>
        </dd>
        <dd class="type">{p.type}</dd>
        <dd class="doc">{p.doc}</dd>
      </dl>
    </li>
  );
}

@Component({
  tag: 'rsd-preview-alt',
  styleUrl: 'rsd-preview-alt.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class RSDPreviewAlt {
  @Prop()
  projectname: string;

  @Prop()
  model: string | MRSDModel;

  @State()
  resolvedModel: MResolvedRSDModel = { '@type': 'RSDModel', 'elements': [], 'services': [], 'errors': [] };

  @State()
  activeContext: string;

  render() {
    let content = 'Nothing';
    if (this.activeContext) {
      if (this.activeContext.startsWith('service')) {
        const serviceName = this.activeContext.substring('service_'.length + 1);
        const service = this.resolvedModel.services.find(s => s.name === serviceName);
        if (service) {
          content = serviceContent(service);
        }
      }
    }
    return (
      <Fragment>
        <nav>
          <ul>
            <li>
              <h2>Services</h2>
              <ul>
                {this.resolvedModel.services.map(e => (
                  <li>
                    <a href={`#services_${e.name}`}>
                      <span>{e.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <h2>Types</h2>
            </li>
          </ul>
        </nav>
        <main>{content}</main>
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
    this.handleHashchanged();
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.handleHashchanged);
  }

  private handleHashchanged = () => {
    if (location.hash.length > 1) {
      this.activeContext = location.hash.substring(1);
    }
  };
}
