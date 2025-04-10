import { Component, Fragment, h, Prop, State, Watch } from '@stencil/core';
import {
  isMEnumType,
  isMInlineEnumType,
  isMMixinType,
  isMRecordType,
  isMRSDModel,
  isMScalarType,
  isMUnionType,
  MInlineEnumType,
  MOperation,
  MParameter,
  MResolvedRSDModel,
  MReturnType,
  MRSDModel,
  MService,
  resolve,
} from '../../utils/model';

function serviceContent(model: MService) {
  return (
    <div class="main-content">
      <h1 class="text-2xl inner-content">{model.name}</h1>
      <div class="mb-14 inner-content">
        <p>{model.doc}</p>
        <div class="not-prose">
          <div class="bg-zinc-900 rounded-2xl">
            <div class="p-4 rounded-t-2xl border-b border-zinc-700 bg-zinc-800">
              <h3 class="text-xs text-white font-semibold">Definition</h3>
              {/*<div>
                <button>rsd</button>
                <button>REST</button>
              </div>*/}
            </div>
            <div class="p-4">
              <pre class="text-xs text-white overflow-x-auto">
                <code>
                  <span>
                    <span class="keyword">service</span> <span class="type">{model.name}</span> <span>{'{'}</span>
                  </span>
                  {'\n\n'}
                  {model.operations.map(o => (
                    <Fragment>
                      {operation(o, '\t', 100)}
                      {'\n\n'}
                    </Fragment>
                  ))}
                  <span>
                    <span>{'}'}</span>
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div class="service-operations">{model.operations.map(serviceMethod)}</div>
    </div>
  );
}

function serviceMethod(model: MOperation) {
  const reqParameters = model.parameters.filter(p => !p.optional);
  const optParameters = model.parameters.filter(p => p.optional);

  return (
    <Fragment>
      <h2 class="text-lg inner-content mt-2 mb-2">{model.name}</h2>
      <div class="service-operation-content inner-content">
        <div class="text-sm">
          <p>{model.doc}</p>
          {reqParameters.length > 0 && parameters('Required Parameters', reqParameters)}
          {optParameters.length > 0 && parameters('Optional Parameters', optParameters)}
          {model.resultType !== undefined && result(model.resultType)}
        </div>
        <div class="code-column not-prose">
          <div class="bg-zinc-900 rounded-2xl">
            <div class="p-4 rounded-t-2xl border-b border-zinc-700 bg-zinc-800">
              <h3 class="text-xs text-white font-semibold">Definition</h3>
              {/*<div>
                <button>rsd</button>
                <button>REST</button>
              </div>*/}
            </div>
            <div class="p-4 text-xs text-white">
              <pre class="overflow-x-auto">
                <code>{operation(model, '')}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </Fragment>
  );
}

function operation(model: MOperation, ident = '\t', maxLength = 50) {
  const isMulti = isMultiLineOperation(model, maxLength);
  return (
    <span>
      {ident}
      <span class="keyword">operation</span> <span class="method">{model.name}</span>
      <span>(</span>
      {isMulti ? '\n' : ''}
      {model.parameters.map((p, idx, arr) => (
        <Fragment>
          {isMulti ? `${ident}\t` : ''}
          <span>
            {p.name}
            {p.optional ? '?' : ''}
          </span>
          <span>: </span>
          {isMInlineEnumType(p.type) ? (
            <span>p.type.entries.join('| ')</span>
          ) : (
            <span class="type-ref">
              {p.type}
              {p.nullable ? '?' : ''}
            </span>
          )}
          {idx + 1 < arr.length && ', '}
          {isMulti ? '\n' : ''}
        </Fragment>
      ))}
      {isMulti ? ident : ''}
      <span>)</span>
      {model.resultType && (
        <Fragment>
          <span>:</span>{' '}
          <span class="type-ref">
            {model.resultType.array ? 'Array<' : ''}
            {isMInlineEnumType(model.resultType.type) ? model.resultType.type.entries.map(e => e.name).join(' | ') : model.resultType.type}
            {model.resultType.array ? '>' : ''}
          </span>
        </Fragment>
      )}
      {model.errors.length > 0 ? (
        <Fragment>
          <span class="keyword">{`\n${ident}\tthrows `}</span>
          <span>{model.errors.join(' ')}</span>
        </Fragment>
      ) : (
        ''
      )}
      <span>;</span>
    </span>
  );
}

function isMultiLineOperation(model: MOperation, maxLength = 50) {
  let line = `  operation ${model.name}(${model.parameters.map(parameterString).join(', ')})`;
  if (model.resultType) {
    line += `: ${typeString(model.resultType.type)}`;
  }
  console.log(line);
  return line.length > maxLength;
}

function parameterString(model: MParameter) {
  return model.name + (model.optional ? '?' : '') + ': ' + typeString(model.type) + (model.nullable ? '?' : '');
}

function typeString(type: string | MInlineEnumType) {
  if (isMInlineEnumType(type)) {
    return type.entries.join(' | ');
  }
  return type;
}

function parameters(title: string, parameters: MParameter[]) {
  return (
    <Fragment>
      <h3 class="text-sm">{title}</h3>
      <div>
        <ul class="list-none m-0 p-0 divide-y divide-zinc-900/5">{parameters.map(parameter)}</ul>
      </div>
    </Fragment>
  );
}

function result(resultType: MReturnType) {
  return (
    <Fragment>
      <h3 class="text-sm">Result</h3>
      <dl class="return-value">
        <dd class="type">
          {resultType.array ? 'Array<' : ''}
          {resultType.type}
          {resultType.array ? '>' : ''}
        </dd>
        <dd>{resultType.doc}</dd>
      </dl>
    </Fragment>
  );
}

function parameter(p: MParameter) {
  return (
    <li class="not-prose py-4 first:pt-0 last:pb-0">
      <dl class="parameter">
        <dd>
          <code class="bg-zinc-700/5 text-xs p-1 rounded-lg border border-zinc-300">{p.name}</code>
        </dd>
        <dd class="font-mono text-xs text-zinc-400">
          {p.array ? 'Array<' : ''}
          {p.type}
          {p.array ? '>' : ''}
        </dd>
        <dd class="doc">{p.doc}</dd>
      </dl>
    </li>
  );
}

function scalars(resolvedModel: MResolvedRSDModel) {
  const scalars = resolvedModel.elements.filter(isMScalarType);
  if (scalars.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li>
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline" href="#types_scalars">
        Scalars
      </a>
      <ul class="list-none p-0">
        {scalars.map(s => (
          <li>
            <a class="gap-2 py-1 pr-3 text-sm transition pl-8 text-zinc-600 dark:text-white no-underline" href={`#model_${s.name}`}>
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

function enums(resolvedModel: MResolvedRSDModel) {
  const enums = resolvedModel.elements.filter(isMEnumType);
  if (enums.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li>
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline" href="#types_enums">
        Enums
      </a>
      <ul class="list-none p-0">
        {enums.map(e => (
          <li>
            <a class="gap-2 py-1 pr-3 text-sm transition pl-8 text-zinc-600 dark:text-white no-underline" href={`#model_${e.name}`}>
              {e.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

function mixins(resolvedModel: MResolvedRSDModel) {
  const mixins = resolvedModel.elements.filter(isMMixinType);
  if (mixins.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li>
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline" href="#types_mixins">
        Mixins
      </a>
      <ul class="list-none pl-0">
        {mixins.map(m => (
          <li>
            <a class="gap-2 py-1 pr-3 text-sm transition pl-8 text-zinc-600 dark:text-white no-underline" href={`#model_${m.name}`}>
              {m.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

function records(resolvedModel: MResolvedRSDModel) {
  const records = resolvedModel.elements.filter(isMRecordType);
  if (records.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li>
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline" href="#types_records">
        Records
      </a>
      <ul class="list-none pl-0">
        {records.map(r => (
          <li>
            <a class="gap-2 py-1 pr-3 text-sm transition pl-8 text-zinc-600 dark:text-white no-underline" href={`#model_${r.name}`}>
              {r.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

function unions(resolvedModel: MResolvedRSDModel) {
  const unions = resolvedModel.elements.filter(isMUnionType);
  if (unions.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li>
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline" href="#types_unions">
        Unions
      </a>
      <ul class="list-none pl-0">
        {unions.map(u => (
          <li>
            <a class="gap-2 py-1 pr-3 text-sm transition pl-8 text-zinc-600 dark:text-white no-underline" href={`#model_${u.name}`}>
              {u.name}
            </a>
          </li>
        ))}
      </ul>
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
        <div class="flex flex-grow lg:ml-72 xl:ml-80">
          <header class="contents lg:fixed lg:inset-0 lg:flex lg:pointer-events-none">
            <div class="contents lg:block lg:w-72 xl:w-80 border-zinc-900/10 lg:border-r lg:overflow-y-auto bg-gray-50 lg:pointer-events-auto lg:px-6 lg:pt-4 lg:pb-8">
              <nav class="prose hidden lg:block">
                <ul class="list-none p-0">
                  <li>
                    <h2 class="text-sm font-semibold text-zinc-900 dark:text-white">Services</h2>
                    <ul class="list-none border-l border-transparent mt-3 ml-2 border-zinc-900/10 dark:border-white/5 p-0">
                      {this.resolvedModel.services.map(e => (
                        <li>
                          <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline" href={`#services_${e.name}`}>
                            <span>{e.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li class="mt-6">
                    <h2 class="text-sm font-semibold text-zinc-900 dark:text-white">Types</h2>
                    <ul class="list-none border-l border-transparent mt-3 ml-2 border-zinc-900/10 dark:border-white/5 p-0">
                      {scalars(this.resolvedModel)}
                      {enums(this.resolvedModel)}
                      {mixins(this.resolvedModel)}
                      {records(this.resolvedModel)}
                      {unions(this.resolvedModel)}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          {/* contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-white/10 */}
          {/**/}
          <main class="flex prose">
            <div>{content}</div>
          </main>
        </div>
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
