package com.home.task.autocompleteserver.services;

import com.home.task.autocompleteserver.repositories.CityRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<String> getCitiesList(String name) {
        Pageable topTen = PageRequest.of(0, 10);
        return cityRepository.findAllCitiesByName(name, topTen);
    }
}
