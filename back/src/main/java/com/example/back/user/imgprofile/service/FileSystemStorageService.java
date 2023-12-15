package com.example.back.user.imgprofile.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileSystemStorageService implements StorageService {
    @Value("${media.location}")
    private String mediaLocation;

    private Path rootLocation;

    @Override
    @PostConstruct
    public void init() {
        rootLocation = Paths.get(mediaLocation);
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }
    }

    @Override
    public String store(MultipartFile file, String usuario) {
        if (file.isEmpty()) {
            throw new RuntimeException("Failed to store empty file");
        }
        String filename = file.getOriginalFilename();
        String nombre = filename.substring(0,filename.lastIndexOf("."));
        String extension = filename.substring(filename.lastIndexOf("."));

        if(!extension.equals(".jpg")){
            throw new RuntimeException("No se permite otro formato que no sea .jpg");
        }

        System.out.println(nombre + " " + extension);
        System.out.println();
        String fileNameToStore = usuario + extension;

        Path destinationFile = this.rootLocation.resolve(Paths.get(fileNameToStore))
                .normalize().toAbsolutePath();
        System.out.println("entra en este metodo");
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);

            return fileNameToStore;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }

    }

    @Override
    public Resource loadResource(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource((file.toUri()));

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file" + filename);
            }

        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}


