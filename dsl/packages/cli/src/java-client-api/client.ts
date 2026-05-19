import { CompositeGeneratorNode, toString } from 'langium/generate';

import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	generateCompilationUnit,
	toPath,
} from '../java-gen-utils.js';
import { hasFileStream, hasStream, ident, toCamelCaseIdentifier, toFirstUpper, toNodeTree } from '../util.js';
import { MResolvedRSDModel } from '../model.js';

export function generateClient(
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: JavaClientAPIGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact {
	const packageName = artifactConfig.rootPackageName;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const uriType = fqn('java.net.URI');
	const slType = fqn('java.util.ServiceLoader');
	const clFactoryType = fqn(
		`${artifactConfig.rootPackageName}.spi.${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}ClientFactory`,
	);
	const baseDTOType = fqn(`${artifactConfig.rootPackageName}.model._Base`);
	const OptionalType = fqn('java.util.Optional');

	let blobContent: CompositeGeneratorNode | undefined;
	let fileContent: CompositeGeneratorNode | undefined;
	if (hasStream(model)) {
		const BlobType = fqn(`${artifactConfig.rootPackageName}.model.RSDBlob`);
		const PathType = fqn('java.nio.file.Path');
		blobContent = toNodeTree(`
/**
 * Creates a blob from the specified file and MIME type.
 * 
 * A blob is a binary large object that can be used to store and transfer
 * binary data, such as images, videos, or other files.
 * 
 * @param file     the path to the file to be converted into a blob
 * @param mimeType the MIME type of the file
 * @return a new instance of RSDBlob representing the file
 */
public ${BlobType} createBlob(${PathType} file, String mimeType);`);
		if (hasFileStream(model)) {
			const FileType = fqn(`${artifactConfig.rootPackageName}.model.RSDFile`);
			fileContent = toNodeTree(`
/**
 * Creates a file from the specified file, MIME type, and filename.
 * 
 * A file is a representation of a file that can be used to store and transfer
 * files with additional metadata, such as the filename and MIME type.
 * 
 * @param file     the path to the file to be converted into a file object
 * @param mimeType the MIME type of the file
 * @param filename the name of the file
 * @return a new instance of RSDFile representing the file
 */
public ${FileType} createFile(${PathType} file, String mimeType, String filename);`);
		}
	}

	const Type = `${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}Client`;

	const node = toNodeTree(`
/**
 * <p>
 * Client interface for the SpecSamples API. It provides methods to create
 * service instances, builders, and to create blobs and files.
 * </p>
 * <p>
 * It also defines a <code>LifecycleHook</code> interface to intercept the
 * lifecycle of a request, allowing to modify the request, handle successful
 * responses, handle errors, and perform actions after the request is completed.
 * </p>
 */
public interface ${Type} {
	/**
	 * Creates a new instance of the SpecSamplesClient using the provided base URL.
	 * 
	 * <p>
	 * The service loader is used to load the implementation of the
	 * SpecSamplesClientFactory, which is responsible for creating instances of the
	 * SpecSamplesClient.
	 * </p>
	 *
	 * @param baseURL the base URL of the API
	 * @return a new instance of SpecSamplesClient
	 */
	public static ${Type} create(${uriType} baseURL) {
		return ${slType}.load(${clFactoryType}.class).iterator().next().create(baseURL);
	}
	
	/**
	 * <p>
	 * Returns a builder instance for the specified class.
	 * </p>
	 * <p>
	 * The builder can be used to create instances of data classes that are used as
	 * request bodies or response bodies in the API.
	 * </p>
	 * 
	 * @param <T>   the type of the builder
	 * @param clazz the class of the builder
	 * @return an instance of the specified builder class
	 */
	public <T extends ${baseDTOType}.BaseDataBuilder<?>> T builder(Class<T> clazz);

	/**
	 * <p>
	 * Returns a service instance for the specified class.
	 * </p>
	 * <p>
	 * The service can be used to call the API methods defined in the service
	 * interface.
	 * </p>
	 * 
	 * @param <T>   the type of the service
	 * @param clazz the class of the service
	 * @return an instance of the specified service class
	 */
	public <T extends BaseService> T service(Class<T> clazz);

	/**
	 * <p>
	 * Returns a service instance for the specified class with a lifecycle hook.
	 * </p>
	 * <p>
	 * The service can be used to call the API methods defined in the service
	 * interface.
	 * </p>
	 * 
	 * @param <T>           the type of the service
	 * @param clazz         the class of the service
	 * @param lifecycleHook the lifecycle hook to intercept the request lifecycle
	 * @return an instance of the specified service class
	 */
	public <T extends BaseService> T service(Class<T> clazz, LifecycleHook lifecycleHook);
#${blobContent ? toString(ident(blobContent, 1), '\t') : ''}
#${fileContent ? toString(ident(fileContent, 1), '\t') : ''}
	
	/**
	 * Allows to adapt implementation specific implementations, e.g. to modify the
	 * request builder in the lifecycle hook, e.g. to add headers.
	 */
	public interface Adaptable {
		/**
		 * Allows to adapt the given implementation specific
		 * 
		 * @param <T>   the type of the class to adapt to
		 * @param clazz the class to adapt to
		 * @return an optional containing the adapted instance if available, or empty if not
		 */
		public <T> ${OptionalType}<T> adapt(Class<T> clazz);
	}

	/**
	 * Hook to intercept the lifecycle of a request. The methods are called in the
	 * following order:
	 * <ol>
	 * <li>{@link #preRequest(String, Adapter)} is called
	 * before the request is sent. It allows to modify the request builder, e.g. to
	 * add headers.</li>
	 * <li>{@link #onSuccess(String, Object, Adaptable)} is called if the request
	 * was
	 * successful. The value parameter contains the deserialized response body.</li>
	 * <li>{@link #onError(String, RSDException, Adaptable)} if the request failed
	 * with a
	 * documented error response
	 * The error parameter contains the deserialized error response body.</li>
	 * <li>{@link #onCatch(String, Throwable, Optional<Adaptable>)} is called if an
	 * exception was thrown
	 * during the request. The error parameter contains the exception.</li>
	 * <li>{@link #onFinally(String)} is called after the request was completed,
	 * regardless of the outcome. It can be used to clean up resources or log the
	 * request.</li>
	 * </ol>
	 * 
	 * The method parameter contains the name of the service method that was called
	 * (e.g. "getUser", "createUser", etc.).
	 * 
	 * @see #service(Class, LifecycleHook) to use the lifecycle hook when creating a
	 *      service instance
	 */
	public interface LifecycleHook {
		/**
		 * Called before the request is sent. It allows to modify the request builder,
		 * e.g. to
		 * add headers.
		 *
		 * @param method         the method name of the service method that was
		 *                       called
		 *                       (e.g. "getUser", "createUser", etc.)
		 * @param requestAdapter allows to adapt the request specific to
		 *                       the implementation used eg. HttpRequest.Builder
		 *                       for JDK HttpClient, Request.Builder for OkHttp,
		 *                       etc. so that it can be modified, e.g. to add
		 *                       headers.
		 */
		void preRequest(String method, Adaptable requestAdapter);

		/**
		 * Called if the request was successful. The value parameter contains the
		 * deserialized response body.
		 * 
		 * @param method          the method name of the service method that was called
		 *                        (e.g. "getUser", "createUser", etc.)
		 * @param value           the deserialized response body
		 * @param responseAdapter allows to adapt the response specific to the
		 *                        implementation used eg. HttpResponse for JDK
		 *                        HttpClient, Response for OkHttp, etc. so that it can
		 *                        be accessed for additional information, e.g. to read
		 *                        headers, status code, etc.
		 */
		void onSuccess(String method, Object value, Adaptable responseAdapter);

		/**
		 * Called if the request was technically successful but returned an error or unknown
		 * response.
		 * 
		 * @param method          the method name of the service method that was called
		 *                        (e.g. "getUser", "createUser", etc.)
		 * @param error           exception containing the deserialized error response
		 *                        body
		 * @param responseAdapter allows to adapt the response specific to the
		 *                        implementation used
		 *                        eg. HttpResponse for JDK HttpClient, Response for
		 *                        OkHttp, etc.
		 */
		void onError(String method, RSDException error, Adaptable responseAdapter);

		/**
		 * Called if an exception was thrown during the request (e.g. network error)
		 * 
		 * @param method          the method name of the service method that was called
		 *                        (e.g. "getUser", "createUser", etc.)
		 * @param error           the exception that was thrown during the request
		 * @param responseAdapter allows to adapt the response specific to the
		 *                        implementation used
		 *                        eg. HttpResponse for JDK HttpClient, Response for
		 *                        OkHttp, etc.
		 */
		void onCatch(String method, RSDException error);

		/**
		 * Called after the request was completed, regardless of the outcome. It can be
		 * used to clean up resources or log the request.
		 * 
		 * @param method the method name of the service method that was called
		 *               (e.g. "getUser", "createUser", etc.)
		 */
		void onFinally(String method);
	}
}
`);

	return {
		name: `${Type}.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
