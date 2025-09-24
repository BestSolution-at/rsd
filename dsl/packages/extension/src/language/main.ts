import { startLanguageServer } from 'langium/lsp';
import { NodeFileSystem } from 'langium/node';
import {
  createConnection,
  ProposedFeatures,
} from 'vscode-languageserver/node.js';
import { createRemoteServiceDescriptionServices } from 'remote-service-description-language';

// Create a connection to the client
const connection = createConnection(ProposedFeatures.all);

// Inject the shared services and language-specific services
const { shared } = createRemoteServiceDescriptionServices({
  connection,
  ...NodeFileSystem,
});

// Start the language server with the shared services
startLanguageServer(shared);
