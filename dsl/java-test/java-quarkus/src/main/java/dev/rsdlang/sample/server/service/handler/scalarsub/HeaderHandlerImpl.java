package dev.rsdlang.sample.server.service.handler.scalarsub;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HeaderHandlerImpl implements ScalarSubstition_ServiceServiceImpl.HeaderHandler {

    @Override
    public MyRange header(BuilderFactory _factory, MyRange range) {
        return range;
    }

}
