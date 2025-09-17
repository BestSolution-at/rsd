import { Component, Fragment, h, Prop, State, Watch } from '@stencil/core';
import { Code } from './rsd-code.types';

let counter = 0;

@Component({
  tag: 'rsd-code',
  styleUrl: 'rsd-viewer.css',
  styles: '',
  assetsDirs: ['assets'],
  shadow: true,
})
export class RsdCode {
  @State() selected?: Code;
  @Prop() code: Code[] = [];
  @Prop() theme: string = '';

  id = 'rsd-code-' + counter++;

  render() {
    if (this.code.length === 0) {
      return <div>Node code</div>;
    } else if (this.code.length > 1) {
      const activeTab = this.code.find(c => c === this.selected) ?? this.code[0];

      return (
        <div class={`not-prose ${this.theme ?? ''}`} style={{ flexGrow: '1', overflow: 'hidden' }}>
          <div class="bg-slate-800 dark:bg-zinc-800 rounded-2xl dark:ring-1 dark:ring-white/10 m-1">
            <div class="flex gap-x-4 border-b border-zinc-700 px-4 dark:border-zinc-800" role="tablist">
              {this.code.map((e, idx) => {
                if (e === activeTab) {
                  return (
                    <button
                      class="text-xs border-b py-3 transition data-selected:not-data-focus:outline-hidden border-emerald-500 text-emerald-400"
                      role="tab"
                      aria-controls={this.id + '-panel-' + idx}
                      aria-selected="true"
                      tabIndex={0}
                      onClick={() => (this.selected = e)}
                    >
                      {e.name}
                    </button>
                  );
                }
                return (
                  <button
                    class="text-xs border-b py-3 transition data-selected:not-data-focus:outline-hidden border-transparent text-zinc-400 hover:text-zinc-300"
                    role="tab"
                    aria-controls={this.id + '-panel-' + idx}
                    aria-selected="false"
                    tabIndex={-1}
                    onClick={() => (this.selected = e)}
                  >
                    {e.name}
                  </button>
                );
              })}
            </div>
            {this.code.map((e, idx) => (
              <div class="rounded-b-2xl" role="tabpanel" id={this.id + '-panel-' + idx} style={{ display: e === activeTab ? 'inherit' : 'none' }}>
                <pre class="p-4 text-xs text-white overflow-x-auto">
                  <code>{e.content}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div class={`not-prose ${this.theme ?? ''}`} style={{ flexGrow: '1' }}>
        <div class="bg-slate-800 dark:bg-zinc-800 rounded-2xl dark:ring-1 dark:ring-white/10 m-1">
          <div class="p-4 rounded-b-2xl">
            <pre class="text-xs text-white overflow-x-auto">
              <code>{this.code[0].content}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
