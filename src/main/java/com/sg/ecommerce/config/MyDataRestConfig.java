package com.sg.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.sg.ecommerce.entity.Product;
import com.sg.ecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] theUnsupportedActions = { HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE };
		
//	disable HTTP Methods for product: PUT, POST, DELETE
		config.getExposureConfiguration().forDomainType(Product.class)
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
		
//	disable HTTP Methods for productCategory: PUT, POST, DELETE
			config.getExposureConfiguration().forDomainType(ProductCategory.class)
					.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
					.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}
}
