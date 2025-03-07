package com.sg.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.sg.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200")
//Origin: protocol + hostname + port (uses CrossOrigin when are sending data to different origin.
public interface ProductRepository extends JpaRepository<Product, Long>{

}
