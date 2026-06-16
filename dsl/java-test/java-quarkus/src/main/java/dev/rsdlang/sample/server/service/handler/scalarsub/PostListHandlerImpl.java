package dev.rsdlang.sample.server.service.handler.scalarsub;

import java.util.List;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PostListHandlerImpl implements ScalarSubstition_ServiceServiceImpl.PostListHandler {

    @Override
    public List<MyRange> postList(BuilderFactory _factory, List<MyRange> range) {
        return range;
    }

}
