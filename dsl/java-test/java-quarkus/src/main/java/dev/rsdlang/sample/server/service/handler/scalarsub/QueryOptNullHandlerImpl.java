package dev.rsdlang.sample.server.service.handler.scalarsub;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QueryOptNullHandlerImpl implements ScalarSubstition_ServiceServiceImpl.QueryOptNullHandler {

    @Override
    public NilResult queryOptNull(BuilderFactory _factory, Nillable<MyRange> range) {
        if (range.isNull()) {
            return NilResult.NULL;
        } else if (range.isUndefined()) {
            return NilResult.UNDEFINED;
        }
        return NilResult.DEFINED;
    }

}
