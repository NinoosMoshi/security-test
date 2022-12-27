package com.ninos.service.impl;

import com.ninos.entity.Product;
import com.ninos.repository.ProductRepository;
import com.ninos.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product saveProduct(Product product) {
        Product save = productRepository.save(product);
        return save;
    }
}
