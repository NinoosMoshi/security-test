package com.ninos.controller;

import com.ninos.entity.Product;
import com.ninos.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;


    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/all")
    public List<Product> findAllProducts(){
        return productService.getAllProducts();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save")
    public Product saveProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }


}
