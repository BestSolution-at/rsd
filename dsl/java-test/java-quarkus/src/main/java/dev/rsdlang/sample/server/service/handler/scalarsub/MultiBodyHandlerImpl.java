package dev.rsdlang.sample.server.service.handler.scalarsub;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.service.BuilderFactory;

import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyHandlerImpl implements ScalarSubstition_ServiceServiceImpl.MultiBodyHandler {

    @Override
    public String multiBody(BuilderFactory _factory, MyRange valueA, ZoneId valueB) {
        return MyRange.toString(valueA) + " " + valueB.value();
    }

}
