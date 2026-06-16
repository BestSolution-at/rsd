package dev.rsdlang.sample.server.service.handler.scalarsub;

import java.util.List;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListHandlerImpl implements ScalarSubstition_ServiceServiceImpl.ListHandler {

    @Override
    public List<MyRange> list(BuilderFactory _factory) {
        return List.of(new MyRange(0, 0));
    }

}
