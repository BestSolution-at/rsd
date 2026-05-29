package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorUnionException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.UnionA;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetSimpleErrorUnionHandlerImpl implements SampleServiceServiceImpl.GetSimpleErrorUnionHandler {

    @Override
    public void getSimpleErrorUnion(BuilderFactory _factory) throws SampleErrorUnionException {
        var data = _factory.builder(UnionA.DataBuilder.class)
                .shared("shared")
                .valueA("value a")
                .build();
        throw new SampleErrorUnionException("This is a sample union error from the server", data);
    }

}
