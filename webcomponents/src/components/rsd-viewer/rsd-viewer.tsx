import { Component, Fragment, h, Prop, State, Watch } from '@stencil/core';
import {
  isMEnumType,
  isMInlineEnumType,
  isMKeyProperty,
  isMMixinType,
  isMRecordType,
  isMRevisionProperty,
  isMRSDModel,
  isMScalarType,
  isMUnionType,
  MBaseProperty,
  MEnumType,
  MInlineEnumType,
  MMixinType,
  MOperation,
  MOperationError,
  MParameter,
  MProperty,
  MResolvedRecordType,
  MResolvedRSDModel,
  MResolvedService,
  MResolvedUnionType,
  MResolvedUserType,
  MReturnType,
  MRSDModel,
  MScalarType,
  MService,
  resolve,
} from '../../utils/model';

function serviceContent(model: MService) {
  return (
    <div class="main-content">
      <h1 class="text-2xl inner-content">{model.name}</h1>
      <div class="mb-14 inner-content">
        <p>{model.doc}</p>
        {code(
          <Fragment>
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
          </Fragment>,
        )}
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
          {result(model.resultType, model.operationErrors)}
        </div>
        <div class="code-column">{code(operation(model, ''))}</div>
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

function result(resultType: MReturnType | undefined, errors: MOperationError[]) {
  const result = resultType ? (isMInlineEnumType(resultType.type) ? resultType.type.entries.join(' | ') : resultType.type) : 'void';
  return (
    <Fragment>
      <h3 class="text-sm">Result</h3>
      <ul class="list-none m-0 p-0 divide-y divide-zinc-900/5">
        {resultType && <li class="not-prose py-4 first:pt-0 last:pb-0">{dlResult('Success', resultType.array ? `Array<${result}>` : result, resultType.doc)}</li>}
        {resultType === undefined && <li class="not-prose py-4 first:pt-0 last:pb-0">{dlResult('Success', 'void', '')}</li>}
        {errors.map(e => (
          <li class="not-prose py-4 first:pt-0 last:pb-0">{dlError('Error', e.error, e.doc)}</li>
        ))}
      </ul>
    </Fragment>
  );
}

function dlResult(code: string, typeString: string, doc: string) {
  return (
    <dl class="parameter">
      <dd>
        <code class="text-cyan-500 dark:text-cyan-400 text-xs p-1">{code}</code>
      </dd>
      <dd class="font-mono text-xs text-zinc-400">{typeString}</dd>
      <dd class="doc">{doc}</dd>
    </dl>
  );
}

function dlError(code: string, typeString: string, doc: string) {
  return (
    <dl class="parameter">
      <dd>
        <code class="text-orange-500 dark:text-orange-400 text-xs p-1">{code}</code>
      </dd>
      <dd class="font-mono text-xs text-zinc-400">{typeString}</dd>
      <dd class="doc">{doc}</dd>
    </dl>
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
  const scalars = resolvedModel.elements.filter(isMScalarType).sort((a, b) => a.name.localeCompare(b.name));
  if (scalars.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li class="py-[2px]">
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline">Scalars</a>
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
  const enums = resolvedModel.elements.filter(isMEnumType).sort((a, b) => a.name.localeCompare(b.name));
  if (enums.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li class="py-[2px]">
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline">Enums</a>
      <ul class="list-none p-0">
        {enums.map(e => (
          <li class="py-[2px]">
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
  const mixins = resolvedModel.elements.filter(isMMixinType).sort((a, b) => a.name.localeCompare(b.name));
  if (mixins.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li class="py-[2px]">
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline">Mixins</a>
      <ul class="list-none pl-0">
        {mixins.map(m => (
          <li class="py-[2px]">
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
  const records = resolvedModel.elements.filter(isMRecordType).sort((a, b) => a.name.localeCompare(b.name));
  if (records.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li class="py-[2px]">
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline">Records</a>
      <ul class="list-none pl-0">
        {records.map(r => (
          <li class="py-[2px]">
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
  const unions = resolvedModel.elements.filter(isMUnionType).sort((a, b) => a.name.localeCompare(b.name));
  if (unions.length === 0) {
    return <Fragment></Fragment>;
  }
  return (
    <li class="py-[2px]">
      <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline">Unions</a>
      <ul class="list-none pl-0">
        {unions.map(u => (
          <li class="py-[2px]">
            <a class="gap-2 py-1 pr-3 text-sm transition pl-8 text-zinc-600 dark:text-white no-underline" href={`#model_${u.name}`}>
              {u.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

function modelContent(element: MResolvedUserType) {
  if (isMScalarType(element)) {
    return scalarContent(element);
  } else if (isMEnumType(element)) {
    return enumContent(element);
  } else if (isMMixinType(element)) {
    return mixinContent(element);
  } else if (isMRecordType(element)) {
    return recordContent(element);
  } else {
    return unionContent(element);
  }
}

function code(code: any) {
  return (
    <div class="not-prose">
      <div class="bg-slate-800 dark:bg-zinc-800 rounded-2xl dark:ring-1 dark:ring-white/10 m-1">
        <div class="p-4 rounded-b-2xl">
          <pre class="text-xs text-white overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function scalarContent(element: MScalarType) {
  return (
    <div class="main-content">
      <h1 class="text-2xl inner-content">{element.name}</h1>
      <div class="mb-14 inner-content">
        <p>{element.doc}</p>
        {code(
          <Fragment>
            <span class="keyword">scalar</span>
            <span> </span>
            <span>{element.name}</span>
            <span>;</span>
          </Fragment>,
        )}
      </div>
    </div>
  );
}

function enumContent(element: MEnumType) {
  return (
    <div class="main-content">
      <h1 class="text-2xl inner-content">{element.name}</h1>
      <div class="mb-14 inner-content">
        <p>{element.doc}</p>
        {code(
          <Fragment>
            <span class="keyword">enum</span>
            <span> </span>
            <span>{element.name}</span>
            <span> = </span>
            {'\n'}
            {element.entries.map((e, idx) => {
              return (
                <Fragment>
                  <span>{idx > 0 ? '\t| ' : '\t  '}</span>
                  <span>{e.name}</span>
                  {'\n'}
                </Fragment>
              );
            })}
            <span>;</span>
          </Fragment>,
        )}
      </div>
    </div>
  );
}

function unionContent(element: MResolvedUnionType) {
  return (
    <div class="main-content">
      <h1 class="text-2xl inner-content">{element.name}</h1>
      <div class="mb-14 inner-content">
        <p>{element.doc}</p>
        {code(
          <Fragment>
            <span class="keyword">union</span>
            <span> </span>
            <span>{element.name} = </span>
            {'\n'}
            {element.types.map((t, idx) => (
              <Fragment>
                {'\t'}
                <span>
                  {idx > 0 ? '| ' : ''}
                  {t}(<span class="string">"{element.descriminatorAliases[t] ?? t}"</span>)
                </span>
                {'\n'}
              </Fragment>
            ))}
          </Fragment>,
        )}
      </div>
    </div>
  );
}

function recordContent(element: MResolvedRecordType) {
  return (
    <div class="main-content">
      <h1 class="text-2xl inner-content">{element.name}</h1>
      <div class="mb-14 inner-content">
        <p>{element.doc}</p>
        {code(
          <Fragment>
            <span class="keyword">record</span>
            <span> </span>
            <span>{element.name}</span>
            <span> {'{'}</span>
            {'\n'}
            {element.properties.map(p => (
              <Fragment>
                {propCode(p)}
                {'\n'}
              </Fragment>
            ))}
            {element.properties.length > 0 && element.mixins.length > 0 ? '\n' : ''}
            {element.mixins.map(m => (
              <Fragment>
                {'\t'}
                <span class="keyword">include</span>
                <span> {m}</span>
                {'\n'}
              </Fragment>
            ))}
            <span>{'}'}</span>
          </Fragment>,
        )}
        {element.properties.length > 0 || element.mixins.length > 0 ? (
          <Fragment>
            <h2 class="text-lg">Properties</h2>
            <div>
              <ul class="list-none m-0 p-0 divide-y divide-zinc-900/5">
                {element.properties.map(property)}
                {element.resolved.mixins.flatMap(m => m.properties).map(property)}
              </ul>
            </div>
          </Fragment>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

function mixinContent(element: MMixinType) {
  return (
    <div class="main-content">
      <h1 class="text-2xl inner-content">{element.name}</h1>
      <div class="mb-14 inner-content">
        <p>{element.doc}</p>
        {code(
          <Fragment>
            <span class="keyword">mixin</span>
            <span> </span>
            <span>{element.name}</span>
            <span> {'{'}</span>
            {'\n'}
            {element.properties.map(p => (
              <Fragment>
                {propCode(p)}
                {'\n'}
              </Fragment>
            ))}
            <span>{'}'}</span>
          </Fragment>,
        )}
        <h2 class="text-lg">Properties</h2>
        <div>
          <ul class="list-none m-0 p-0 divide-y divide-zinc-900/5">{element.properties.map(property)}</ul>
        </div>
      </div>
    </div>
  );
}

function property(p: MProperty) {
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

function propCode(prop: MBaseProperty) {
  if (isMKeyProperty(prop)) {
    return (
      <Fragment>
        <span>{'\t'}</span>
        <span class="keyword">@id</span>
        <span> {prop.name}</span>
        <span>: </span>
        <span class="type-ref">{prop.type}</span>
      </Fragment>
    );
  } else if (isMRevisionProperty(prop)) {
    return (
      <Fragment>
        <span>{'\t'}</span>
        <span class="revision">@rev</span>
        <span> {prop.name}</span>
        <span>: </span>
        <span class="type-ref">{prop.type}</span>
      </Fragment>
    );
  } else if (isMInlineEnumType(prop.type)) {
    return (
      <Fragment>
        <span>{'\t'}</span>
        <span>{prop.name}</span>
        <span>: </span>
        <span>{prop.type.entries.map(e => e.name).join(' | ')}</span>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <span>{'\t'}</span>
        <span>{prop.name}</span>
        <span>: </span>
        <span class="type-ref">{prop.array ? `Array<${prop.type}>` : prop.type}</span>
      </Fragment>
    );
  }
}

function home(model: MResolvedRSDModel) {
  return (
    <div class="main-content">
      <div class="inner-content">
        <h1 class="text-2xl">API Definition</h1>
        <h2 class="text-lg">Services</h2>
        <ul class="list-none m-0 p-0 divide-y divide-zinc-900/5">{model.services.map(serviceTOC)}</ul>
        <h2 class="text-lg">Types</h2>
        <ul class="list-none m-0 p-0 divide-y divide-zinc-900/5">
          {model.elements
            .filter(isMScalarType)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(typeTOC)}
          {model.elements
            .filter(isMEnumType)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(typeTOC)}
          {model.elements
            .filter(isMMixinType)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(typeTOC)}
          {model.elements
            .filter(isMRecordType)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(typeTOC)}
          {model.elements
            .filter(isMUnionType)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(typeTOC)}
        </ul>
      </div>
    </div>
  );
}

function serviceTOC(service: MResolvedService) {
  return <li class="not-prose py-4 first:pt-0 last:pb-0">{dl(service.name, 'Service', service.doc)}</li>;
}

function typeTOC(type: MResolvedUserType) {
  let typeName = '';
  if (isMEnumType(type)) {
    typeName = 'Enum';
  } else if (isMScalarType(type)) {
    typeName = 'Scalar';
  } else if (isMMixinType(type)) {
    typeName = 'Mixin';
  } else if (isMRecordType(type)) {
    typeName = 'Record';
  } else {
    typeName = 'Union';
  }
  return <li class="not-prose py-4 first:pt-0 last:pb-0">{dl(type.name, typeName, type.doc)}</li>;
}

function dl(code: string, typeString: string, doc: string) {
  return (
    <dl class="parameter">
      <dd>
        <code class="bg-zinc-700/5 dark:bg-zinc-700/15 border-zinc-300 dark:border-zinc-700 dark:text-white text-xs p-1 rounded-lg border">{code}</code>
      </dd>
      <dd class="font-mono text-xs text-zinc-400">{typeString}</dd>
      <dd class="doc">{doc}</dd>
    </dl>
  );
}

function sideNav(resolvedModel: MResolvedRSDModel) {
  return (
    <ul class="list-none p-0">
      <li>
        <h2 class="text-sm font-semibold text-zinc-900 dark:text-white">Services</h2>
        <ul class="list-none border-l border-transparent mt-3 ml-2 border-zinc-900/10 dark:border-white/20 p-0">
          {resolvedModel.services.map(e => (
            <li class="py-[2px]">
              <a class="gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 dark:text-white no-underline" href={`#services_${e.name}`}>
                <span>{e.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </li>
      <li class="mt-6">
        <h2 class="text-sm font-semibold text-zinc-900 dark:text-white">Types</h2>
        <ul class="list-none border-l border-transparent mt-3 ml-2 border-zinc-900/10 dark:border-white/20 p-0">
          {scalars(resolvedModel)}
          {enums(resolvedModel)}
          {mixins(resolvedModel)}
          {records(resolvedModel)}
          {unions(resolvedModel)}
        </ul>
      </li>
    </ul>
  );
}

@Component({
  tag: 'rsd-viewer',
  styleUrl: 'rsd-viewer.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class RsdViewer {
  @Prop()
  projectname: string;

  @Prop()
  model: string | MRSDModel;

  @State()
  resolvedModel: MResolvedRSDModel = { '@type': 'RSDModel', 'elements': [], 'services': [], 'errors': [] };

  @State()
  activeContext: string;

  @State()
  theme: string = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  @State()
  navigationOpen = false;

  render() {
    let content = 'Nothing';
    if (this.activeContext && this.activeContext !== 'home') {
      if (this.activeContext.startsWith('services')) {
        const serviceName = this.activeContext.substring('services_'.length);
        console.log(serviceName);
        const service = this.resolvedModel.services.find(s => s.name === serviceName);
        if (service) {
          content = serviceContent(service);
        }
      } else if (this.activeContext.startsWith('model')) {
        const elementName = this.activeContext.substring('model_'.length);
        const element = this.resolvedModel.elements.find(e => e.name === elementName);
        if (element) {
          content = modelContent(element);
        }
      }
    } else {
      content = home(this.resolvedModel);
    }

    const handleClick = () => {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.style.colorScheme = this.theme;
    };

    const flipNavigationOverlay = () => {
      this.navigationOpen = !this.navigationOpen;
    };

    return (
      <Fragment>
        <div class={`bg-white dark:bg-zinc-900 flex flex-grow lg:ml-72 xl:ml-80 ${this.theme ?? ''}`}>
          <header class="contents lg:fixed lg:inset-0 lg:flex lg:pointer-events-none">
            <div class="bg-gray-50 dark:bg-neutral-900 border-zinc-900/10 lg:dark:border-white/10 contents lg:block lg:w-72 xl:w-80 lg:border-r lg:overflow-y-auto lg:pointer-events-auto lg:px-6 lg:pt-4 lg:pb-8">
              <div class="hidden lg:block">
                <a class="text-xl font-bold" href="#home">
                  {this.projectname}
                </a>
              </div>
              <div class="bg-white/60 dark:bg-zinc-900/60 border-zinc-900/10 dark:border-white/10 items-center gap-12 justify-between px-4 sm:px-6 lg:px-8 fixed inset-0 h-14 lg:left-72 xl:left-80 backdrop-blur-xs border-b flex">
                <div class="lg:hidden pt-1 flex gap-5 items-center">
                  <button onClick={flipNavigationOverlay}>
                    {!this.navigationOpen && (
                      <svg class="h-3 w-3 text-zinc-400 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        {/*<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->*/}
                        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                      </svg>
                    )}
                    {this.navigationOpen && (
                      <svg class="h-3 w-3 text-zinc-400 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        {/*<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->*/}
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    )}
                  </button>
                  <a class="text-xl font-bold" href="#home">
                    {this.projectname}
                  </a>
                </div>
                <div class="hidden lg:block lg:max-w-md lg:flex-auto">
                  {/*<button class="hidden h-8 w-full items-center gap-2 rounded-full bg-white pr-3 pl-2 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 lg:flex dark:bg-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:ring-inset dark:hover:ring-white/20">
                    <svg class="h-3 w-3 text-zinc-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                    Search...
                    <kbd class="ml-auto text-2xs text-zinc-400">
                      <kbd>⌘</kbd>
                      <kbd>K</kbd>
                    </kbd>
                  </button>*/}
                </div>
                {
                  <div class="flex items-center gap-5">
                    <button
                      onClick={handleClick}
                      class="flex h-6 w-6 items-center justify-center rounded-lg shadow-md ring-1 shadow-black/5 ring-black/5 dark:bg-slate-700 dark:ring-white/5 dark:ring-inset"
                    >
                      <svg class="h-3 w-3 fill-sky-400 dark:hidden margin-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        {/*<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->*/}
                        <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
                      </svg>
                      <svg class="hidden h-3 w-3 fill-sky-400 dark:block margin-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0l-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
                      </svg>
                    </button>
                  </div>
                }
              </div>
              <nav class="hidden lg:block mt-10">{sideNav(this.resolvedModel)}</nav>
            </div>
          </header>
          {/* contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-white/10 */}
          {/**/}
          <main class="flex prose dark:prose-invert">
            <div class="w-full">{content}</div>
          </main>
          {this.navigationOpen && (
            <div class="lg:hidden fixed shadow-lg ring-1 shadow-zinc-900/10 ring-zinc-900/7.5 top-14 bottom-0 left-0 w-full overflow-y-auto min-[416px]:max-w-sm bg-gray-50 pt-7 px-6 pb-8 transition-opacity duration-500 ease-in-out">
              <nav>{sideNav(this.resolvedModel)}</nav>
            </div>
          )}
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
      this.navigationOpen = false;
    }
  };
}
