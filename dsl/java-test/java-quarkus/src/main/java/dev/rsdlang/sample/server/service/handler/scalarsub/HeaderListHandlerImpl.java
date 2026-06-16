package dev.rsdlang.sample.server.service.handler.scalarsub;

import java.util.List;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HeaderListHandlerImpl implements ScalarSubstition_ServiceServiceImpl.HeaderListHandler {

    @Override
    public List<MyRange> headerList(BuilderFactory _factory, List<MyRange> range) {
        return range;
    }

}
