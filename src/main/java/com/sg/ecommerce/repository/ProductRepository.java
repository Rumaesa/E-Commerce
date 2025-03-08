package com.sg.ecommerce.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.sg.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200")
//Origin: protocol + hostname + port (uses CrossOrigin when are sending data to different origin.
public interface ProductRepository extends JpaRepository<Product, Long>{
//	For this Repositor as we have given entity type named as Product, the url will be /products (it adds 's' at the end of the entity class name)

	
	Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
//	findByCategoryId: Query Method, Match by category Id, use parameter value "id".
//	Behind the scene Query will be created by spring will be similar as: SELECT * from product where category_id=?
//	Spring Data REST automatically exposes endpoint: http://localhost:8080/api/products/search/findByCategoryId?=2 
	
//	all the methods starts with findBy,readBy, and queryBy are called as Query Methods and they are exposed as /search/<<queryMethodName>>
//	e.g: findByCategoryId() -> http://localhost:8080/api/products/search/findByCategoryId
	
}
