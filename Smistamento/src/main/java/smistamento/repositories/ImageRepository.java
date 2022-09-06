package smistamento.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import smistamento.entities.Image;


public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String name);
}