package com.example.back.user.imgprofile.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    void init();
    String store(MultipartFile file, String usuario);
    Resource loadResource(String filename);
}
