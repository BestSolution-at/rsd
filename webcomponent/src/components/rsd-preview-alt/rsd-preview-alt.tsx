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
          <div class="bg-zinc-900 rounded-2xl dark:ring-1 dark:ring-white/10 m-1">
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
          <div class="bg-zinc-900 rounded-2xl dark:ring-1 dark:ring-white/10 m-1">
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
          <code class="bg-zinc-700/5 dark:bg-zinc-700/15 border-zinc-300 dark:border-zinc-700 dark:text-white text-xs p-1 rounded-lg border">{p.name}</code>
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

  @State()
  theme: string;

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

    const handleClick = () => {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.style.colorScheme = this.theme;
    };

    return (
      <Fragment>
        <div class={`bg-white dark:bg-zinc-900 flex flex-grow lg:ml-72 xl:ml-80 ${this.theme ?? ''}`}>
          <header class="contents lg:fixed lg:inset-0 lg:flex lg:pointer-events-none">
            <div class="bg-gray-50 dark:bg-zinc-800 border-zinc-900/10 lg:dark:border-white/10 contents lg:block lg:w-72 xl:w-80 lg:border-r lg:overflow-y-auto lg:pointer-events-auto lg:px-6 lg:pt-4 lg:pb-8">
              <div class="hidden lg:block">
                <a class="text-xl font-bold" href="#home">
                  {this.projectname}
                </a>
              </div>
              <div class="bg-white/60 dark:bg-zinc-900/60 border-zinc-900/10 dark:border-white/10 items-center gap-12 justify-between px-4 sm:px-6 lg:px-8 fixed inset-0 h-14 lg:left-72 xl:left-80 backdrop-blur-xs border-b flex">
                <div class="lg:hidden">
                  <a class="text-xl font-bold" href="#home">
                    {this.projectname}
                  </a>
                </div>
                <div class="hidden lg:block lg:max-w-md lg:flex-auto">
                  <button class="hidden h-8 w-full items-center gap-2 rounded-full bg-white pr-3 pl-2 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 lg:flex dark:bg-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:ring-inset dark:hover:ring-white/20">
                    <svg class="h-3 w-3 text-zinc-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                    Search...
                    <kbd class="ml-auto text-2xs text-zinc-400">
                      <kbd>⌘</kbd>
                      <kbd>K</kbd>
                    </kbd>
                  </button>
                </div>
                {
                  <div class="flex items-center gap-5">
                    <button onClick={handleClick}>
                      <svg class="h-3 w-3 fill-zinc-400 dark:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                      </svg>
                      <svg class="hidden h-3 w-3 fill-white dark:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0l-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
                      </svg>
                    </button>
                  </div>
                }
              </div>
              <nav class="prose dark:prose-invert hidden lg:block">
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
          <main class="flex prose dark:prose-invert">
            <div class="w-full">{content}</div>
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
