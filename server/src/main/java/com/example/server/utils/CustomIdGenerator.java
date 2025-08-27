package com.example.server.utils;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.id.Configurable;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;

import java.io.Serializable;
import java.util.Properties;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CustomIdGenerator implements IdentifierGenerator, Configurable {

    private static final AtomicLong counter = new AtomicLong(0);
    private String prefix = "entity";

    public CustomIdGenerator() {}

    @Override
    public void configure(Type type, Properties params, ServiceRegistry serviceRegistry) {
        String paramPrefix = params.getProperty("prefix");
        if (paramPrefix != null && !paramPrefix.isBlank()) {
            this.prefix = paramPrefix;
        }
    }

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        long id = counter.incrementAndGet();
        return prefix + "-" + UUID.randomUUID();
    }
}