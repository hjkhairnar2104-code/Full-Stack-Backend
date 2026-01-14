package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDto;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
   ProductService productService;
    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDto>createProduct(@Valid @PathVariable Long categoryId, @RequestBody ProductDto productDto){
        ProductDto productDto1=productService.createProduct(categoryId,productDto);
        return new ResponseEntity<>(productDto1, HttpStatus.CREATED);
    }

    @GetMapping("/public/products")
    public ResponseEntity<ProductResponse>getAllProducts(
            @RequestParam(name = "keyword", required = false) String

                    keyword,
            @RequestParam(name = "category",required = false) String category,
            @RequestParam(name = "pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false)Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false)Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = AppConstants.SORT_PRODUCT_BY,required = false)String sortBy,
            @RequestParam(name = "sortOrder",defaultValue = AppConstants.SORT_DIR,required = false)String sortOrder

    ){
        ProductResponse productResponse=productService.getAllProduct(pageNumber,pageSize,sortBy,sortOrder,keyword,category);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }
    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse>getAllProductsByCategory(@PathVariable Long categoryId,
                         @RequestParam(name = "pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false)Integer pageNumber,
                          @RequestParam(name = "pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false)Integer pageSize,
                           @RequestParam(name = "sortBy",defaultValue = AppConstants.SORT_PRODUCT_BY,required = false)String sortBy,
                            @RequestParam(name = "sortOrder",defaultValue = AppConstants.SORT_DIR,required = false)String sortOrder

    ){
        ProductResponse productResponse=productService.getProductById(categoryId,pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse>getAllProductsByKeyword(
            @PathVariable String keyword,
            @RequestParam(name = "pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false)Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false)Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = AppConstants.SORT_PRODUCT_BY,required = false)String sortBy,
            @RequestParam(name = "sortOrder",defaultValue = AppConstants.SORT_DIR,required = false)String sortOrder
             ){
        ProductResponse productResponse=productService.searchProductBykeyword(keyword,pageNumber,pageSize,sortBy,sortOrder);
        return new  ResponseEntity<>(productResponse, HttpStatus.FOUND);
    }

    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDto>updateProduct(@Valid @PathVariable Long productId,@RequestBody ProductDto productDto){
        ProductDto productDto1=productService.updateProduct(productId,productDto);
        return new ResponseEntity<>(productDto1, HttpStatus.OK);
    }

    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDto>deleteProduct(@PathVariable Long productId){
        ProductDto productDto=productService.deletebyId(productId);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @PutMapping("/products/{productId}/image")
    public ResponseEntity<ProductDto>updateProductImage(@PathVariable Long productId,@RequestParam("image") MultipartFile image) throws IOException {
        ProductDto upadteProductdto=productService.updateProductImage(productId,image);
        return new ResponseEntity<>(upadteProductdto, HttpStatus.OK);
    }

}
