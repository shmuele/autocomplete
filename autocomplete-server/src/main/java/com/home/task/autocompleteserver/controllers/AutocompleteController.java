package com.home.task.autocompleteserver.controllers;


import com.home.task.autocompleteserver.services.CityService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AutocompleteController {

    private final CityService cityService;

    public AutocompleteController(CityService cityService) {
        this.cityService = cityService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/cities-list/{name}")
    public List<String> getCitiesList(@PathVariable String name) {
        return cityService.getCitiesList(name);
    }
}
