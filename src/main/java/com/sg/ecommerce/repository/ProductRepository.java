package com.sg.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sg.ecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
