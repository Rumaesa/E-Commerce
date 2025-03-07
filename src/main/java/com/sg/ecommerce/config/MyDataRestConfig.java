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
		
//		config is an instance of RepositoryRestConfiguration, which allows customization of Spring Data REST settings.
//		getExposureConfiguration() retrieves the current configuration for how Spring Data REST exposes entity repositories.
//		.forDomainType(ProductCategory.class) This targets the ProductCategory entity. Any customizations applied after this will only affect the ProductCategory entity.
//		withItemExposure(...) → Customizes the HTTP methods for single resource endpoints (i.e., /product-category/{id}).
//		(metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions) 
//		metadata: Provides metadata about the ProductCategory entity.
//			httpMethods.disable(theUnsupportedActions):
//			Disables POST, PUT, and DELETE for single ProductCategory items.
//		withCollectionExposure(...) → Customizes HTTP methods for the collection resource (i.e., /product-category).
//		(metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions): This works the same way as withItemExposure, but it applies to the entire collection instead of individual items.
	}
}
