package dev.rsdlang.sample.server.service.handler.enumsub;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PostListOptHandlerImpl implements EnumSubstition_ServiceServiceImpl.PostListOptHandler {

    @Override
    public NilResult postListOpt(BuilderFactory _factory, Optional<List<DayOfWeek>> dayOfWeek) {
        if (dayOfWeek.isPresent()) {
            return NilResult.DEFINED;
        }
        return NilResult.UNDEFINED;
    }

}
