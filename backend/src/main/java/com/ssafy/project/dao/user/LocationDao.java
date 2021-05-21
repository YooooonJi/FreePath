package com.ssafy.project.dao.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.project.model.user.Location;
import com.ssafy.project.model.user.LocationId;

@Repository
public interface LocationDao extends JpaRepository<Location, LocationId> {

	List<Location> findAllLocationsByLocationidUid(String uid);

	Location findLocationByLocationid(LocationId locationId);

	Optional<Location> findOptionalByLocationid(LocationId locationId);
}
