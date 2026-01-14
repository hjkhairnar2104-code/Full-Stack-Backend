package com.ecommerce.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileserviceImplementation implements FileService {

    @Override
    public String UploadImage(String path, MultipartFile file) throws IOException {
        String originalFilename=file.getOriginalFilename();

        String randomId= UUID.randomUUID().toString();

        String filename=randomId.concat(originalFilename.substring(originalFilename.lastIndexOf(".")));

        String filepath=path+ File.separator+filename;
       //File.separator=/
        File folder =new File(path);
        if(!folder.exists()){
            folder.mkdir();//open an new folder
        }
        Files.copy(file.getInputStream(), Paths.get(filepath));

        return filename;

    }




}
