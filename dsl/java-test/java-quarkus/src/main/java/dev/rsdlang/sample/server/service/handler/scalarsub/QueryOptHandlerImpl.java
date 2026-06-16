package dev.rsdlang.sample.server.service.handler.scalarsub;

import java.util.Optional;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QueryOptHandlerImpl implements ScalarSubstition_ServiceServiceImpl.QueryOptHandler {

    @Override
    public NilResult queryOpt(BuilderFactory _factory, Optional<MyRange> range) {
        if (range.isPresent()) {
            return NilResult.DEFINED;
        }
        return NilResult.UNDEFINED;
    }

}
