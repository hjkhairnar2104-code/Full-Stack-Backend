package com.ecommerce.project.service;

import com.ecommerce.project.payload.ProductDto;
import com.ecommerce.project.payload.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    ProductDto createProduct(Long categoryId, ProductDto productDto);

    ProductResponse getAllProduct(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder,String keyword,String category);

    ProductResponse getProductById(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse searchProductBykeyword(String keyword,Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);


    ProductDto updateProduct(Long productId, ProductDto productDto);

    ProductDto deletebyId(Long productId);

    ProductDto updateProductImage(Long productId, MultipartFile image) throws IOException;
}
