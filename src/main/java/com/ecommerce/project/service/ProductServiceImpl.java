package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDto;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Value("${image.base.url}")
    private String imageBaseUrl;

    @Value("${project.image}")
    private String path;
    @Autowired
    private FileService fileService;

    @Override
    public ProductDto createProduct(Long categoryId, ProductDto productDto) {
        Category category=categoryRepository.findById(categoryId).
                          orElseThrow(()-> new ResourceNotFoundException("Category","categoryId",categoryId));

        boolean isproductexist=false;
        List<Product>products=category.getProductList();
        for(Product product:products){
            if(product.getProductName().equals(productDto.getProductName())){
                isproductexist=true;
                break;
            }
        }
        if(isproductexist==false) {
            Product product = modelMapper.map(productDto, Product.class);
            product.setCategory(category);
            double specialprice = product.getPrice() * (1.0 - (product.getDiscount() / 100.0));
            product.setSpecialPrice(specialprice);
            Product savedproduct = productRepository.save(product);
            return modelMapper.map(savedproduct, ProductDto.class);
        }else {
            throw new  APIException("Product is already exist ");
        }
    }

    @Override
    public ProductResponse getAllProduct(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder,String keyword,String category) {

        Sort sortOrderBy=sortOrder.equalsIgnoreCase("asc")
                           ?Sort.by(sortBy).ascending()
                           :Sort.by(sortBy).descending();
        Pageable pageable= PageRequest.of(pageNumber,pageSize,sortOrderBy);

        Specification<Product> spec = Specification.where(null);
        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + keyword.toLowerCase() + "%"));
        }

        if (category != null && !category.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("category").get("categoryName"), category));
        }
        Page<Product>productlist=productRepository.findAll(spec,pageable);

       List<Product> products=productlist.getContent();
       List<ProductDto> productDtos= products.stream().
                                     map(product ->
                                     {
                                         ProductDto productDto=modelMapper.map(product, ProductDto.class);
                                         productDto.setImage(constructImageUrl(product.getImage()));
                                         return productDto;
                                     })
                                    .toList();
       if(products.size()==0) {
           throw new APIException("Product list is empty");
       }

       ProductResponse productResponse=new ProductResponse();
       productResponse.setProductList(productDtos);
       productResponse.setPageNumber(productlist.getNumber());
       productResponse.setPageSize(productlist.getSize());
       productResponse.setTotalElements(productlist.getTotalElements());
       productResponse.setTotalpages(productlist.getTotalPages());
       productResponse.setLastPage(productlist.isLast());
       return productResponse;
    }

    private  String constructImageUrl(String imageUrl) {
         return imageBaseUrl.endsWith("/") ? imageBaseUrl + imageUrl : imageBaseUrl + "/" + imageUrl;
    }

    @Override
    public ProductResponse getProductById(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {


        Category category=categoryRepository.findById(categoryId).
                orElseThrow(()-> new ResourceNotFoundException("Category","categoryId",categoryId));

        Sort sortOrderBy=sortOrder.equalsIgnoreCase("asc")
                ?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();
        Pageable pageable= PageRequest.of(pageNumber,pageSize,sortOrderBy);
        Page<Product>productlist=  productRepository.findByCategoryOrderByPrice(category,pageable);


        List<Product>products=productlist.getContent();
        List<ProductDto>productDtos=products.stream().
                                      map(product -> modelMapper.map(product, ProductDto.class))
                                    .toList();
        ProductResponse productResponse=new ProductResponse();
        productResponse.setProductList(productDtos);
        productResponse.setPageNumber(productlist.getNumber());
        productResponse.setPageSize(productlist.getSize());
        productResponse.setTotalElements(productlist.getTotalElements());
        productResponse.setTotalpages(productlist.getTotalPages());
        productResponse.setLastPage(productlist.isLast());
        return productResponse;


    }

    @Override
    public ProductResponse searchProductBykeyword(String keyword,Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> pageProducts = productRepository.findByProductNameLikeIgnoreCase('%' + keyword + '%', pageDetails);

        List<Product> products = pageProducts.getContent();
        List<ProductDto> productDTOS = products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .toList();

        if(products.isEmpty()){
            throw new APIException("Products not found with keyword: " + keyword);
        }

        ProductResponse productResponse = new ProductResponse();

        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalpages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;

    }

    @Override
    public ProductDto updateProduct(Long productId, ProductDto productDto) {
       Product product1= productRepository.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Product","productId",productId));
       Product product=modelMapper.map(productDto,Product.class);
       product1.setProductId(productId);
       product1.setProductName(product.getProductName());
       product1.setDescription(product.getDescription());
       product1.setPrice(product.getPrice());
       product1.setDiscount(product.getDiscount());
       product1.setSpecialPrice(product.getSpecialPrice());
       product1.setImage(product.getImage());
       product1.setQuantity(product.getQuantity());
       Product product2=productRepository.save(product1);
       return modelMapper.map(product2,ProductDto.class);
    }

    @Override
    public ProductDto deletebyId(Long productId) {
        Product product=productRepository.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Product","productId",productId));
        productRepository.delete(product);
        return modelMapper.map(product,ProductDto.class);
    }

    @Override
    public ProductDto updateProductImage(Long productId, MultipartFile image) throws IOException {
      Product product=productRepository.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Product","productId",productId));

      String filename=fileService.UploadImage(path,image);

      product.setImage(filename);

      Product finalimage= productRepository.save(product);

      return modelMapper.map(finalimage,ProductDto.class);

    }



}
