package dev.rsdlang.sample.server.service.handler.scalarsub;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetHandlerImpl implements ScalarSubstition_ServiceServiceImpl.GetHandler {

    @Override
    public MyRange get(BuilderFactory _factory) {
        return new MyRange(0, 0);
    }

}
