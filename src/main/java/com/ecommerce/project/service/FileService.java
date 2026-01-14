package com.ecommerce.project.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    String UploadImage(String path, MultipartFile file) throws IOException;
}
