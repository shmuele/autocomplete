package com.home.task.autocompleteserver.repositories;

import com.home.task.autocompleteserver.entities.City;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

    @Query("SELECT DISTINCT c.name FROM City c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%',?1,'%'))")
    List<String> findAllCitiesByName(String name, Pageable pageable);

}
