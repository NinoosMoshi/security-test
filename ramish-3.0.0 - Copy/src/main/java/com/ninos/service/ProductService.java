package com.ninos.service;

import com.ninos.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
    Product saveProduct(Product product);
}
