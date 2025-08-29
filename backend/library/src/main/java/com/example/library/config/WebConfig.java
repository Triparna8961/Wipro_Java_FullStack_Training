package com.example.library.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {


@Value("${app.cors.origins}")
private String corsOrigin;


@Override
public void addCorsMappings(CorsRegistry registry) {
registry.addMapping("/api/**")
.allowedOrigins(corsOrigin)
.allowedMethods("GET","POST","PUT","DELETE","PATCH")
.allowCredentials(true);
}
}