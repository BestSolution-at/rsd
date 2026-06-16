package dev.rsdlang.sample.server.service.handler.scalarsub;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HeaderListOptHandlerImpl implements ScalarSubstition_ServiceServiceImpl.HeaderListOptHandler {

    @Override
    public NilResult headerListOpt(BuilderFactory _factory, Optional<List<MyRange>> range) {
        if (range.isPresent()) {
            return NilResult.DEFINED;
        }
        return NilResult.UNDEFINED;
    }

}
